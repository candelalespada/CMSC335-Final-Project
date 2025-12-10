const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  mealId: String,
  name: String,
  category: String,
  area: String,
  thumbnail: String,
  instructions: String,
  notes: String,  // optional: user notes later
  dateSaved: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
