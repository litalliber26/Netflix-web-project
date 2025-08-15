const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Movie schema
const MovieSchema = new Schema({
    name: {
        type: String,
        required: true, // Name is required
        trim: true, // Remove extra spaces
    },
    category: {
        type: String,
        required: true, // Category is required
        trim: true, // Remove extra spaces
    },
    videoFileName: {
        type: String,
        required: true
    },
    videoMimeType: {
        type: String,
        required: true
    },
    previewPhotoFileName: {
        type: String,
        required: false
    },
    intId: {
        type: Number,
        required: true // intId is required
    }
});

// Export the Movie model
module.exports = mongoose.model('Movie', MovieSchema);
