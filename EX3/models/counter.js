// Import the mongoose library for interacting with MongoDB
const mongoose = require('mongoose');

// Define a schema for the Counter model
const CounterSchema = new mongoose.Schema({
    // Define the "name" field as a required unique string
    name: { type: String, required: true, unique: true },

    // Define the "value" field as a required number
    value: { type: Number, required: true },
});

// Export the Counter model based on the defined schema
module.exports = mongoose.model('Counter', CounterSchema);

