const express = require('express'); // Import the Express framework
const path = require('path'); // Import the path module for handling file paths
const menuRoute = require('./routes/menu'); // Import the menu route handler
const markdownMenuRoute = require('./routes/markdownMenu'); // Import the markdown menu route handler

const app = express(); // Create an instance of Express
const port = 3000; // Define the port number for the server

// Middleware setup: Define routes for different parts of the application

// Use the '/api/menu' route for handling restaurant menu data from YAML files
app.use('/api/menu', menuRoute);

// Use the '/menu' route for serving restaurant menu data as HTML from Markdown files
app.use('/menu', markdownMenuRoute);

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log a message when the server starts successfully
});
