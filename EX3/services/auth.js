const { getUserById } = require('./user');
const mongoose = require('mongoose');

const authenticate = async (req) => {
    const userId = req.headers['userid'];
    if (!userId) {
        return {result: false, user: null, statusCode: 401, error: 'userid header is required'};
    }

    // Validate the format of the user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return {result: false, user: null, statusCode: 400, error: 'Invalid user ID'};
    }

    // Fetch the user from the database using their ID
    const user = await getUserById(userId);

    // Check if the user exists
    if (!user) {
        return {result: false, user: null, statusCode: 400, error: 'User not found'};
    }
    return {result: true, user};
}

module.exports = { authenticate };