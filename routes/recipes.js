const express = require("express");
const axios = require("axios");
const Recipe = require("../models/Recipe");

const router = express.Router();

// Home page
router.get("/", (req, res) => {
  res.render("index");
});

// Search route
router.get("/search", async (req, res) => {
  const query = req.query.q;

  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        query
      )}`
    );

    const data = response.data;
    const recipes = data.meals || [];

    res.render("search", { query, recipes });
  } catch (err) {
    console.error(err);
    res.render("search", { query, recipes: [] });
  }
});

// Save a recipe
router.post("/save", async (req, res) => {
  try {
    const {
      mealId,
      name,
      category,
      area,
      thumbnail,
      instructions,
      query, 
    } = req.body;

    await Recipe.create({
      mealId,
      name,
      category,
      area,
      thumbnail,
      instructions,
    });

    
    if (query) {
      res.redirect(`/search?q=${encodeURIComponent(query)}`);
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

// Delete a saved recipe
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

