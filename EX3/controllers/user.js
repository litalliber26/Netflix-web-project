const userService = require('../services/user');
const { authenticate } = require('../services/auth');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Create a new user
const createUser = async (req, res) => {
    try {
        const userRequest = {...req.body, photo: req.file 
            ? req.file.filename 
            : undefined}
        const newUser = await userService.createUser(userRequest);
        const {password, ...newUserNoPassword} = newUser.toObject();

        res.status(201).json({ message: 'User created successfully', user: getUserForClient(req.protocol, req.get('Host'), newUserNoPassword) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        // Validate the format of the movie ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'Invalid user ID'});
        }
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const {password, ...userNoPassword} = user.toObject();
        
        // Return user details without sensitive information
        res.status(200).json(getUserForClient(req.protocol, req.get('Host'), userNoPassword));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Update user by ID
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        // Validate the format of the movie ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'Invalid user ID'});
        }
        const authenticationResult = await authenticate(req);
        if(!authenticationResult.result) {
            return res.status(authenticationResult.statusCode).json({error: authenticationResult.error});
        }
        const updatedUser = await userService.updateUser(id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        const {password, photoFileName, ...updatedUserNoPassword} = updatedUser.toObject();
        res.status(200).json(getUserForClient(req.protocol, req.get('Host'), updatedUserNoPassword));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        // Validate the format of the movie ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'Invalid user ID'});
        }
        const authenticationResult = await authenticate(req);
        if(!authenticationResult.result) {
            return res.status(authenticationResult.statusCode).json({error: authenticationResult.error});
        }
        const deletedUser = await userService.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const authenticateUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await userService.authenticateUser(username, password);
        res.status(200).json({ access_token: token, user_id: jwt.decode(token).userId });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

function getUserForClient(protocol, host, user) {
    const photo = `${protocol}://${host}/profiles/${user.photoFileName}`;
    const { photoFileName, ...updatedUser } = user;
    return { ...updatedUser, photo, id: user._id };
}

module.exports = { createUser, getUserById, updateUser, deleteUser, authenticateUser };

