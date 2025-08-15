const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie'); // Import the movie controller
const verifyToken = require('../middlewares/authMiddleware');
const multer = require('multer');
const movie = require('../models/movie');
const videoMimeTypes = ['video/webm', 'video/mpeg', 'video/mp4', 'video/x-msvideo' ];
const pictureMimeTypes = ['image/bmp', 'image/gif', 'image/jpeg', 'image/png', 'image/tiff', 'image/webp' ];
const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/movies/',
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `${uniqueSuffix}${file.originalname.split('.')?.length > 1 ? '.' + file.originalname.split('.')[1] : ''}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        if(file.fieldname === 'uploaded_movie' && videoMimeTypes.includes(file.mimetype)){
            cb(null, true);
            return;
        }

        if(file.fieldname === 'uploaded_picture' && pictureMimeTypes.includes(file.mimetype)){
            cb(null, true);
            return;
        }

        cb(null, false);
    }
});

// Define route for searching movies by query
router.route('/search/:query?')
    .get((req, res) => {
        const query = req.params.query;

        // If query is missing, return an error
        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }

        // Otherwise, pass to the controller
        movieController.searchMovies(req, res);
    });

router.get('/all', verifyToken, movieController.getMovies);

// Define routes for movies by ID
router.route('/:id')
    .get(movieController.getMovieById) // Handle GET requests for a specific movie
    .put(verifyToken, movieController.updateMovie) // Handle PUT requests for updating a movie
    .delete(verifyToken, movieController.deleteMovie); // Handle DELETE requests for a specific movie

// Define routes for general movie operations
router.route('/')
    .get(verifyToken, movieController.getMoviesByCategory)
    .post(verifyToken, upload.fields([{name: 'uploaded_movie', maxCount: 1}, {name: 'uploaded_picture', maxCount: 1}]), movieController.createMovie) // Handle POST requests to create a movie
    .delete((req, res) => {
        res.status(400).json({ error: "Id is required" }); // Handle DELETE without ID
    });

router.route('/:id/recommend')
    .get(verifyToken, movieController.getRecommendations)
    .post(verifyToken, movieController.addWatchedMovie);

router.get('/video/:id', movieController.getVideo);


module.exports = router;
