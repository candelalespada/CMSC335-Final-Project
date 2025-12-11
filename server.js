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

const recipeRoutes = require("./routes/recipes");
app.use("/", recipeRoutes);

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Web server started and running at http://localhost:${PORT}`);
  console.log("\nType stop to shutdown the server: ");
});
