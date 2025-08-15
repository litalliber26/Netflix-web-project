const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Remove extra spaces
    },
    password: {
        type: String,
        required: true // Store plain text password for now
    },
    name: { // New field for user's name
        type: String,
        required: true, // Name is required
        trim: true
    },
    phone: { // New field for user's phone
        type: String,
        required: false, // Phone is optional
        match: [/^[0-9]{10}$/, 'Please provide a valid phone number'] // Validate phone format
    },
    photoFileName: { // New field for user's photo
        type: String,
        required: false
    },
    intId: {
        type: Number,
        unique: true, // Ensure intId is unique
        required: true,
        immutable: true // Prevent updates to intId
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        required: true,
        default: 'User'
    },
    watchedMovies: {
        type: [Number],
        default: [] // Start with an empty array
    }    
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
