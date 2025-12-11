const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  mealId: String,
  name: String,
  category: String,
  area: String,
  thumbnail: String,
  instructions: String,
  notes: String,
  dateSaved: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
