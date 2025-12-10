const express = require('express');
const path = require('path');
const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static files (CSS)
app.use(express.static('public'));

// to read form data
app.use(express.urlencoded({ extended: true }));

// routes
const recipesRouter = require('./routes/recipes');
app.use('/', recipesRouter);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
