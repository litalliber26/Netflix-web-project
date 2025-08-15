const Category = require('../models/category'); // Import the Movie model

// Update a category
const updateCategory = async (id, data) => {
    try {
        const category = await getCategoryById(id);
        if (!category) {
            return null; // category not found
        }

        // Update fields
        if (data.name) category.name = data.name;
        if (data.promoted !== undefined && data.promoted !== null) category.promoted = data.promoted;
       

        // Save the updated category
        return await category.save();
    } catch (error) {
        console.error(`Error updating category: ${id}`, error);
        throw error; // Rethrow the error to be handled in the controller
    }
};

const deleteCategory = async (id) => {
    try {
        const category = await Category.findById(id);
        if (!category) {
            return null; // Return null if category not found
        }
        await category.deleteOne(); // Delete the category
        return category;
    } catch (error) {
        console.error(`Error deleting category: ${id}`, error);
        throw error; // Rethrow error for the controller
    }
};


// Create a new category
const createCategory = async ({ name, promoted}) => {
    try {
        // Create a new category instance
        const category = new Category({ name, promoted });

        // Save the category to the database
        return await category.save();
    } catch (error) {
        console.error('Error creating category:', error);
        throw error; // Rethrow the error to be handled by the controller
    }
};

const getCategoryById = async (id) => {
    try {
        return await Category.findById(id); // Use Mongoose to find the category by ID
    } catch (error) {
        console.error(`Error fetching category with ID: ${id}`, error);
        return null; // Return null if ID is invalid or not found
    }
};

const getAllCategories = async () => {
try {
    return await Category.find();// Use Mongoose to find all categories
} catch (error) {
    console.error("Error in printing all categories", error);
    return null; 
}
};

const getCategoryByName = async (name) => {
    try {
        return await Category.findOne({ name });
    } catch (error) {
        console.error(`Error fetching category by name: ${name}`, error.message);
        return null;
    }
};

module.exports = { getCategoryById, createCategory, deleteCategory, updateCategory, getAllCategories, getCategoryByName };