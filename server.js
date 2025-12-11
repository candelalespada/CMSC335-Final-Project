// const express = require('express');
// const path = require('path');
// const app = express();

// require('dotenv').config();

// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.error(err));

// // view engine setup
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // static files (CSS)
// app.use(express.static('public'));

// // to read form data
// app.use(express.urlencoded({ extended: true }));

// // routes
// const recipesRouter = require('./routes/recipes');
// app.use('/', recipesRouter);

// // start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({
  path: path.resolve(__dirname, "credentialsDontPost/.env"),
});

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB (Mongoose)"))
  .catch((err) => console.error(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(__dirname));

// ROUTES
const recipeRoutes = require(".routes/recipes");
app.use("/", recipeRoutes);

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Web server started and running at http://localhost:${PORT}`);
  console.log("\nType stop to shutdown the server: ");
});
