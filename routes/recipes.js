const express = require('express');
const axios = require('axios');
const router = express.Router();

// home page
router.get('/', (req, res) => {
  res.render('index');
});

// search route
router.get('/search', async (req, res) => {
  const query = req.query.q;

  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
    );

    const data = response.data;
    const recipes = data.meals || [];

    res.render('search', { query, recipes });
  } catch (err) {
    console.error(err);
    res.render('search', { query, recipes: [] });
  }
});

module.exports = router;
