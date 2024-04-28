const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();

// Create a new instance of Storage
const storage = new Storage();

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

// Route for uploading an image
router.post('/upload', async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = await uploadImage(req.file.path);

    res.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image' });
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
router.delete('/images/:filename', async (req, res) => {
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