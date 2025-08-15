const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category'); // Import the category controller
const verifyToken = require('../middlewares/authMiddleware');

// Define routes for movies by ID
router.route('/:id')
    .get(categoryController.getCategoryById) // Handle GET requests for a specific category
    .patch(verifyToken, categoryController.updateCategory) // Handle PATCH requests for updating a category
    .delete(verifyToken, categoryController.deleteCategory); // Handle DELETE requests for a specific category

// Define routes for general movie operations
router.route('/')
    .post(verifyToken, categoryController.createCategory) // Handle POST requests to create a category
    .get(categoryController.getAllCategories)
    .delete((req, res) => {
        res.status(400).json({ error: "Id is required" }); // Handle DELETE without ID
    });

module.exports = router;
