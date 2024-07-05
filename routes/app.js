// app.js
const express = require('express');
const menuRoute = require('./routes/menu');

const app = express();
const port = 3000;

app.use('/api/menu', menuRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
