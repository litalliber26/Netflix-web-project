const express = require('express');
const router = express.Router();
const userController = require('../controllers/user'); // Import the User controller

// Route for user authentication (login)
router.route('/')
    .post(userController.authenticateUser); // Handle POST requests for user authentication

module.exports = router;