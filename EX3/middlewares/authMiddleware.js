const jwt = require('jsonwebtoken');
const { getUserById } = require('../services/user');

async function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).json({ error: 'Access denied' });
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    // Fetch the user from the database using their ID
    const user = await getUserById(decoded.userId);
    if(!user) {
        return res.status(401).json({error: 'User not exists'})
    }
    req.user = user;
    return next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
 };

module.exports = verifyToken;