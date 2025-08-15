require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movie'); // Import movie routes
const categoryRoutes = require('./routes/category'); // Import category routes
const userRoutes = require('./routes/user'); // Import user routes
const tokenRoutes = require('./routes/token'); // Import token routes

global.__basedir = __dirname;
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));
// Middleware to parse JSON bodies
app.use(express.json());

// Retrieve CONNECTION_STRING from environment variables
const dbUri = process.env.CONNECTION_STRING;

// Check if CONNECTION_STRING is defined
if (!dbUri) {
  console.error('Error: CONNECTION_STRING is not defined in .env file');
  process.exit(1); // Exit the application if the variable is missing
}

// Connect to MongoDB
mongoose.connect(dbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Register movie routes
app.use('/api/movies', movieRoutes);
// Register category routes
app.use('/api/categories', categoryRoutes);
// Register user routes
app.use('/api/users', userRoutes);
// Register token routes
app.use('/api/tokens', tokenRoutes);

// Retrieve PORT from environment variables or use default
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});