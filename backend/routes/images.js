const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');
const {VertexAI} = require('@google-cloud/vertexai');
const express = require('express');
const router = express.Router();
const Meal = require('../schemas/meal.js');
const multer = require('multer');

// Configure multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 5mb
  },
});

dotenv.config();

// Set the name of the bucket
const bucketName = process.env.BUCKET;
const storage = new Storage(); 
const bucket = storage.bucket(bucketName);

// Define a function to upload an image to GCS
async function uploadImage(imageFile, fileName) {
  try {
    // generate random name
    const file = bucket.file(fileName+".jpg");
    await file.save(imageFile, {
      metadata: { contentType: 'image/jpeg' },
      validation: 'md5'
    });
    // Make the file public
    await file.makePublic();

    // Return the public URL of the uploaded file
    const publicUrl = `gs://${bucket.name}/${fileName}.jpg`;
    // Return the public URL of the uploaded file
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image to Google Cloud Storage:', error);
    throw error;
  }
}

async function createNonStreamingMultipartContent(
  projectId = 'iotcam-421623',
  location = 'us-central1',
  model = 'gemini-1.0-pro-vision',
  image = 'gs://generativeai-downloads/images/scones.jpg',
  mimeType = 'image/jpeg'
) {
  // Initialize Vertex with your Cloud project and location
  const vertexAI = new VertexAI({project: projectId, location: location});

  // Instantiate the model
  const generativeVisionModel = vertexAI.getGenerativeModel({
    model: model,
  });

  // For images, the SDK supports both Google Cloud Storage URI and base64 strings
  const filePart = {
    fileData: {
      fileUri: image,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: 'Generate a JSON with the following keys for this meal, "name", "calories", "fat", "protein", "carbohydrates", "sugar", "fiber", "sodium", "cholesterol". Use \
    the image to determine the values for these keys. Use Imperial units in terms of grams for the values.',
  };

  const request = {
    contents: [{role: 'user', parts: [filePart, textPart]}],
  };

  console.log('Prompt Text:');
  console.log(request.contents[0].parts[1].text);

  console.log('Non-Streaming Response Text:');
  // Create the response stream
  const responseStream =
    await generativeVisionModel.generateContentStream(request);

  // Wait for the response stream to complete
  const aggregatedResponse = await responseStream.response;

  // Select the text from the response
  const fullTextResponse =
    aggregatedResponse.candidates[0].content.parts[0].text;
  
  return fullTextResponse;
}

router.post('/upload', upload.single('image'), async (req, res) => {
    console.log("/upload: \n");
    if (req.file) {
        console.log('Received file with size:', req.file.size);
        const fileName = Math.random().toString(36).substring(7)+".jpg";
        try {
            console.log('Uploading file to Google Cloud Storage');
            const url = await uploadImage(req.file.buffer, fileName);
            if (url) {
              console.log('URL:', url);
              const mealJSON = {};
              try {
                let imageJSON = await createNonStreamingMultipartContent('iotcam-421623', 'us-central1', 'gemini-1.0-pro-vision', url, 'image/jpeg');
                // Log the string before parsing to ensure it's valid JSON
                console.log('Received JSON string:', imageJSON);

                // Find the indices of the first and last triple backticks
                // const startIndex = imageJSON.indexOf('```json') + '```json'.length;
                // /const endIndex = imageJSON.lastIndexOf('```');

                const startIndex = imageJSON.search(/^```json|^```JSON/i) + '```json'.length;
                const endIndex = imageJSON.lastIndexOf('```');

                // Extract the substring between the first and last triple backticks
                const trimString = imageJSON.substring(startIndex, endIndex).trim();

                console.log("trimString: ", trimString);
                // Parse the JSON string

                const catchString = trimString.replace(/^[^{]*{/, '{');

                // Regular expression to remove "g" and "mg" units
                const cleanedString = catchString.replace(/(\d+(?:,\d{3})*(?:\.\d+)?)[gm]g?/g, '$1');

                let parsedJSON = JSON.parse(cleanedString);
                console.log('Image JSON:', parsedJSON);
                mealJSON.name = parsedJSON.name;
                // remove the name key from the imageJSON      
                delete parsedJSON.name;
                mealJSON.nutrients = parsedJSON;

              } catch (error) {
                console.error('Error parsing JSON:', error);
              }
              // Create a new JSON object with the image URL and description
              mealJSON.description = req.body.caption;
              mealJSON.date = new Date();
              mealJSON.image = `https://storage.googleapis.com/${bucket.name}/${fileName}.jpg`  
              const meal = new Meal(mealJSON);
              await meal.save();
            }
            res.status(200).send({ message: 'File uploaded successfully', url });
        } catch (error) {
            console.error('Failed to upload image:', error);
            res.status(500).send('Failed to upload image');
        }
    } else {
        res.status(400).send('No file uploaded');
    }
});

module.exports = router;
