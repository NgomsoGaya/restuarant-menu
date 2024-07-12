const express = require('express'); // Import the Express framework
const path = require('path'); // Import the path module for handling file paths
const { engine } = require('express-handlebars'); // Import the engine function from express-handlebars
const menuRoute = require('./routes/menu'); // Import the menu route handler
const menuDisplayRoute = require('./routes/menuDisplay'); // Import the menu display route
const markdownMenuRoute = require('./routes/markdownMenu'); // Import the markdown menu route handler

const app = express(); // Create an instance of Express
const port = 3000; // Define the port number for the server

// Middleware setup: Use Handlebars as the view engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes setup
app.use('/', menuDisplayRoute); // Use the menu display route for the root path

// Use the '/api/menu' route for handling restaurant menu data from YAML files
app.use('/api/menu', menuRoute);

// Use the '/menu' route for serving restaurant menu data as HTML from Markdown files
app.use('/menu', markdownMenuRoute);

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log a message when the server starts successfully
});
