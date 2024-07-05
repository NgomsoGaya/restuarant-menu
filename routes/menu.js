// routes/menu.js
const express = require('express');
const router = express.Router();
const YAML = require('yamljs');
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const restaurant = req.query.restaurant;
  if (!restaurant) {
    return res.status(400).send({ error: 'Restaurant name is required' });
  }

  const filePath = path.join(__dirname, `../${restaurant}.yaml`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send({ error: 'File not found' });
  }

  try {
    const yamlContent = YAML.load(filePath);
    res.json(yamlContent);
  } catch (err) {
    res.status(500).send({ error: 'Error reading YAML file' });
  }
});

module.exports = router;
