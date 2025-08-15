const express = require('express');
const router = express.Router();
const userController = require('../controllers/user'); // Import the User controller
const multer = require('multer');
const pictureMimeTypes = [ 'image/jpeg', 'image/png' ];
const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/profiles/',
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `${uniqueSuffix}${file.originalname.split('.')?.length > 1 ? '.' + file.originalname.split('.')[1] : ''}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        if(pictureMimeTypes.includes(file.mimetype)){
            cb(null, true);
            return;
        }

        cb(null, false);
    }
});

// Route to create a new user
router.route('/')
    .post(upload.single('uploaded_picture'), userController.createUser) // Handle POST requests to create a new user
    .get((req, res) => {
        res.status(400).json({ error: "Id is required" }); // Handle GET requests without an ID
    });

// Route for user operations by ID
router.route('/:id')
    .get(userController.getUserById);
    
//Put in a comment and not deleted to show that the GET command works in the README with a screenshot. 
// After the README I will delete definitively.
//router.post('/:id/watched-movies', userController.addWatchedMovieController);
    
module.exports = router;