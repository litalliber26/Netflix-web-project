const categoryService = require('../services/category');
const mongoose = require('mongoose');

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        if (!categories || categories.length === 0) {
            return res.status(404).json({ error: "No categories found" });
        }
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a category by ID
const getCategoryById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Id is required" });
    }

    // Validate the format of the movie ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Invalid category ID'});
    }

    try {
        const category = await categoryService.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(`Error fetching category with ID: ${id}`, error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    const { name, promoted } = req.body;
   
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    try {
        const existingCategory = await categoryService.getCategoryByName(name);
        if(existingCategory) {
            return res.status(409).json({error: 'There is an existing category with the same name!'})
        }
        
        const category = await categoryService.createCategory({ name, promoted });
        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a category by ID
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, promoted } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Id is required" });
    }

    // Validate the format of the movie ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Invalid category ID'});
    }

    try {
        const updatedCategory = await categoryService.updateCategory(id, { name, promoted });
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(updatedCategory); // Successful update, no content to return
    } catch (error) {
        console.error(`Error updating category with ID: ${id}`, error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Id is required" });
    }

    // Validate the format of the movie ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Invalid category ID'});
    }

    try {
        const deletedCategory = await categoryService.deleteCategory(id);
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(204).send(); // Successful deletion, no content to return
    } catch (error) {
        console.error(`Error deleting category with ID: ${id}`, error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
