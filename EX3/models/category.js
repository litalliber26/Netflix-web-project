const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the category schema
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true, // Name is required
        trim: true, // Remove extra spaces
    },

    promoted: {
        type: Boolean,
        required: false // promoted is not required
    }
});

// Export the category model
module.exports = mongoose.model('Category', CategorySchema);
