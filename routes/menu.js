const express = require('express');
const router = express.Router();
const YAML = require('yamljs'); // Import YAML parser
const fs = require('fs');
const path = require('path');

// Define a route handler for GET requests to '/api/menu'
router.get('/', (req, res) => {
  const restaurant = req.query.restaurant; // Get restaurant name from query parameters
  if (!restaurant) {
    // If restaurant name is not provided in query parameters
    return res.status(400).send({ error: 'Restaurant name is required' }); // Return 400 error response
  }

  const filePath = path.join(__dirname, `../${restaurant}.yaml`); // Construct file path for the restaurant's YAML file

  if (!fs.existsSync(filePath)) {
    // Check if the file exists at the constructed file path
    return res.status(404).send({ error: 'File not found' }); // Return 404 error response if file does not exist
  }

  try {
    const yamlContent = YAML.load(filePath); // Load and parse the YAML content from the file
    res.status(200).json(yamlContent); // Send 200 response with JSON content of the parsed YAML
  } catch (err) {
    // If there's an error during file reading or parsing
    res.status(500).send({ error: 'Error reading YAML file' }); // Return 500 error response
  }
});

module.exports = router; // Export the router module for use in the Express application
