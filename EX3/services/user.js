const User = require('../models/user'); // Import the User model
const counterService = require('./counter');
const jwt = require('jsonwebtoken');

// Create a new user
const createUser = async (data) => {
    try {
        const { username, password, name, phone, photo, role } = data;
        const intId = await counterService.getNextIntId('userIntId', 1);

        // Check if email or intId already exist
        const existingUser = await User.findOne({ username });
        if (existingUser) throw new Error('Username already exists');

        // Create and save the new user
        const newUser = new User({ username, password, name, phone, photoFileName: photo, intId, role: role ?? 'User', watchedMovies: []});
        return await newUser.save();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


// Get user by ID
const getUserById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        console.error(`Error fetching user with ID: ${id}`, error);
        throw error; // Rethrow the error for the controller to handle
    }
};

// Get user by intId
const getUserByIntId = async (intId) => {
    try {
        const user = await User.findOne({ intId });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error(`Error fetching user by intId: ${intId}`, error);
        throw error;
    }
};

// Update a user
const updateUser = async (id, data) => {
    try {
        const user = await getUserById(id);
        if (!user) {
            return null; // User not found
        }

        // Update fields
        if (data.username) user.username = data.username;
        if (data.password) user.password = data.password;
        if (data.photo) user.photo = data.photo;
        if (data.role) user.role = data.role;

        // Save the updated user
        return await user.save();
    } catch (error) {
        console.error(`Error updating user with ID: ${id}`, error);
        throw error; // Rethrow the error for the controller to handle
    }
};

// Delete a user
const deleteUser = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return null; // User not found
        }
        await user.deleteOne(); // Delete the user
        return user;
    } catch (error) {
        console.error(`Error deleting user with ID: ${id}`, error);
        throw error; // Rethrow the error for the controller to handle
    }
};

// Authenticate a user
// Validates user credentials (username and password) for login
const authenticateUser = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('Seems that there is no user with the entered username');
        }
        if (user.password !== password) {
            throw new Error('Password is incorrect');
        }
        const jwtData = {userId: user._id, role: user.role};
        const token = jwt.sign(jwtData, process.env.jwtSecret)
        return token;
    } catch (error) {
        console.error(`Error authenticating user: ${username}`, error);
        throw error;
    }
};


// Adds a movie (identified by its intId) to the user's watchedMovies array
const addWatchedMovie = async (userId, intId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

       // Adding the movie to the array if it doesn't already exist
        if (!user.watchedMovies.includes(intId)) {
            user.watchedMovies.push(intId);
            return await user.save();
        }

        return user; 
    } catch (error) {
        console.error(`Error adding watched movie for user ID: ${userId}`, error.message);
        throw error;
    }
};

const addWatchedMovieById = async (userId, movieId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const movie = await movieService.getMovieById(movieId);
        if (!movie) {
            throw new Error('Movie not found');
        }

        if (!user.watchedMovies.includes(movie.intId)) {
            user.watchedMovies.push(movie.intId);
            return await user.save();
        }

        return user; // No changes if the movie already exists
    } catch (error) {
        console.error(`Error adding watched movie for user ID: ${userId}`, error.message);
        throw error;
    }
};

module.exports = { 
    createUser, 
    getUserById, 
    getUserByIntId, 
    updateUser, 
    deleteUser, 
    authenticateUser, 
    addWatchedMovie, 
    addWatchedMovieById
};
