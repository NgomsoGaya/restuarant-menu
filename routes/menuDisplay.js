const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to fetch menu data from JSON API and render HTML using Handlebars
router.get('/', async (req, res) => {
  try {
    const restaurant = req.query.restaurant;
    if (!restaurant) {
      return res.status(400).send('Restaurant name is required');
    }

    // Make a GET request to the JSON API (/api/menu) for the specified restaurant
    const apiResponse = await axios.get(`http://localhost:3000/api/menu?restaurant=${restaurant}`);
    const menuData = apiResponse.data;

    // Render the 'menu' view (handlebars template) with the fetched menu data
    res.render('menu', { restaurant: menuData.restaurant, menu: menuData.menu });
  } catch (error) {
    console.error('Error fetching menu data:', error);
    res.status(500).send('Error fetching menu data');
  }
});

module.exports = router;
