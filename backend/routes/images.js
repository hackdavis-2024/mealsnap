const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();

const app = express();

const fs = require('fs');
const multer = require('multer');
const { Router } = require('react-router-dom');

// Configure multer
const storage = multer.memoryStorage(); // Stores files in memory
const upload = multer({ storage: storage });


dotenv.config();

// Set the name of the bucket
const bucketName = process.env.BUCKET;

// Define a function to upload an image to GCS
async function uploadImage(imageFile) {
  try {
    // Upload the image file to the bucket
    const [file] = await storage.bucket(bucketName).upload(imageFile, {
      // Set the metadata for the image file
      metadata: {
        contentType: 'image/jpeg', // Adjust content type as needed
      },
    });

    // Return the public URL of the uploaded file
    return file.publicUrl();
  } catch (error) {
    console.error('Error uploading image to Google Cloud Storage:', error);
    throw error;
  }
}

// // Route for uploading an image
// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     console.log("/upload: \n");
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     // Access the uploaded file through req.file
//     console.log("Uploaded file:", req.file);

//     // You can also read the file using fs.readFile if you need to process the binary data
//     fs.readFile(req.file.path, (err, data) => {
//       if (err) {
//         console.error('Error reading uploaded file:', err);
//         return res.status(500).json({ message: 'Error reading uploaded file' });
//       }
//       // Process the binary data as needed
//       console.log('File content:', data);
//       // You may want to delete the temporary file after processing
//       fs.unlink(req.file.path, (err) => {
//         if (err) {
//           console.error('Error deleting uploaded file:', err);
//         }
//       });
//     });

//     // Respond with success
//     res.json({ message: 'File uploaded successfully' });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({ message: 'Error uploading file' });
//   }
// });

app.post('/upload', upload.single('file'), (req, res) => {
    console.log("/upload: \n");
    if (req.file) {
        console.log('Received file with size:', req.file.size);
        res.status(200).send('File uploaded successfully');
    } else {
        res.status(400).send('No file uploaded');
    }
});


// Define a function to delete an image from GCS
async function deleteImage(filename) {
    try {
      // Delete the file from the bucket
      await storage.bucket(bucketName).file(filename).delete();
  
      return true;
    } catch (error) {
      console.error('Error deleting image from Google Cloud Storage:', error);
      throw error;
    }
  }
  
// Route for deleting an image
app.delete('/images/:filename', async (req, res) => {
try {
    const { filename } = req.params;

    // Delete the image from GCS
    await deleteImage(filename);

    res.json({ message: 'Image deleted successfully' });
} catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image' });
}
});

module.exports = router;