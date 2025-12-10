const Recipe = require("../models/Recipe");

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

// Save a recipe to MongoDB
router.post("/save", async (req, res) => {
    try {
      const { mealId, name, category, area, thumbnail, instructions } = req.body;
  
      await Recipe.create({
        mealId,
        name,
        category,
        area,
        thumbnail,
        instructions,
      });
  
      res.redirect("/saved");
    } catch (err) {
      console.error(err);
      res.redirect("/");
    }
  });
  

module.exports = router;
