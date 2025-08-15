// Import the Counter model to interact with the "counter" collection in the database
const Counter = require('../models/counter');

// Define an asynchronous function to get the next integer ID for a given counter
const getNextIntId = async (counterName, initialValue) => {
    // Attempt to find a counter document with the specified name
    let counter = await Counter.findOne({ name: counterName });
    
    // If the counter doesn't exist, create a new counter with the given initial value
    if (!counter) {
        counter = new Counter({ name: counterName, value: initialValue });
    }
    
    // Increment the counter's value by 1
    counter.value += 1;

    // Save the updated counter document to the database
    await counter.save();

    // Return the updated counter value
    return counter.value;
};

// Export the getNextIntId function for use in other parts of the application
module.exports = { getNextIntId };
