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

// ⭐ change this route so you stay on the search page
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

    // ⬇️ instead of going to /saved, go BACK to the page you were on
    res.redirect("back");
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect("/saved");
  } catch (err) {
    console.error(err);
    res.redirect("/saved");
  }
});

// Show all saved recipes
router.get("/saved", async (req, res) => {
  try {
    const savedRecipes = await Recipe.find().sort({ dateSaved: -1 });
    res.render("saved", { savedRecipes });
  } catch (err) {
    console.error(err);
    res.render("saved", { savedRecipes: [] });
  }
});

module.exports = router;
