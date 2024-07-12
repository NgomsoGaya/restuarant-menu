const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
import { marked } from 'marked';
const marked = require('marked'); // Import the 'marked' library for parsing Markdown

// Define a route handler for GET requests to '/api/menu'
router.get('/', (req, res) => {
  const restaurant = req.query.restaurant; // Get restaurant name from query parameters
  if (!restaurant) {
    // If restaurant name is not provided in query parameters
    return res.status(400).send({ error: 'Restaurant name is required' }); // Return 400 error response
  }

  const mdFilePath = path.join(__dirname, `../menu/${restaurant}.md`); // Construct file path for the restaurant's Markdown file
  console.log(`Looking for file at: ${mdFilePath}`); // Log the file path being searched

  if (!fs.existsSync(mdFilePath)) {
    // Check if the Markdown file exists at the constructed file path
    console.log('File not found'); // Log that the file was not found
    return res.status(404).send({ error: 'File not found' }); // Return 404 error response if file does not exist
  }

  try {
    const mdContent = fs.readFileSync(mdFilePath, 'utf8'); // Read the Markdown file content
    console.log('File read successfully'); // Log that the file was read successfully
    const htmlContent = marked.parse(mdContent); // Convert Markdown content to HTML using 'marked' library
    res.send(htmlContent); // Send HTML content as response
  } catch (err) {
    console.error('Error reading Markdown file:', err); // Log any errors that occur during file reading
    res.status(500).send({ error: 'Error reading Markdown file' }); // Return 500 error response for internal server error
  }
});

module.exports = router; // Export the router module for use in the Express application
