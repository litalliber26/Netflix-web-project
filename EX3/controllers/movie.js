const { getNextIntId } = require('../services/counter');
const { getCategoryByName, createCategory } = require('../services/category');
const Movie = require('../models/movie'); 
// Import the mongoose library
const mongoose = require('mongoose');
// Import the movie service module
const movieService = require('../services/movie');
const path = require('path');
const fs = require('fs');
const movie = require('../models/movie');

// Define an asynchronous function to update a movie
const updateMovie = async (req, res) => {
    try {
        // Extract the movie ID from the request parameters
        const movieId = req.params.id;

        // Destructure the name and category from the request body
        const { name, category } = req.body; 

        // Validate the format of the movie ID
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({error: 'Invalid movie ID'});
        }

        // Fetch the movie by its ID using the movieService
        const movie = await movieService.getMovieById(movieId);

        // Check if the movie exists, return a 404 status if not found
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        // Check if both name and category are missing, return a 400 status if true
        if (!name && !category) {
            return res.status(400).json({ error: "Name and Category required" });
        }

        // Check if the name is missing, return a 400 status if true
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        // Check if the category is missing, return a 400 status if true
        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        }

        // Initialize a variable to store the category to be updated
        let categoryToUpdate = null;

        // Check if the category exists
        if (category) {
            // Attempt to fetch the category by its name
            categoryToUpdate = await getCategoryByName(category);

            // If the category doesn't exist, create a new category
            if (!categoryToUpdate) {
                categoryToUpdate = await createCategory({ name: category });
            }
        }

        // Create an object to store the update data
        const updateData = {};

        // If a name is provided, add it to the update data
        if (name) updateData.name = name;

        // If a category is provided, add its name to the update data
        if (categoryToUpdate) updateData.category = categoryToUpdate.name;

        // Update the movie with the new data using the movieService
        const response = await movieService.updateMovie(movieId, updateData);

        // return the updated movie
        res.status(200).json(response);
    } catch (error) {
        // Log any errors to the console for debugging
        console.error(error);

        // Return a 500 Internal Server Error response if an error occurs
        res.status(500).json({ error: "Internal server error" });
    }
};

// Define an asynchronous function to delete a movie
const deleteMovie = async (req, res) => {
    try {
        // Extract the movie ID from the request parameters
        const movieId = req.params.id;

        // Validate the format of the movie ID
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({error: 'Invalid movie ID'});
        }

        // Fetch the movie by its ID using the movieService
        const movie = await movieService.getMovieById(movieId);

        // Check if the movie exists, return a 404 status if not found
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        // Delete the movie by its ID using the movieService
        await movieService.deleteMovie(movieId);

        // Send a 204 No Content response to indicate successful deletion
        res.status(204).send();
    } catch (error) {
        // Log any errors to the console for debugging
        console.error(error);

        // Return a 500 Internal Server Error response if an error occurs
        res.status(500).json({ error: "Internal server error" });
    }
};

// Define an asynchronous function to search for movies
const searchMovies = async (req, res) => {
    try {
        // Extract the query string from the request parameters
        const query = req.params.query;

        // Check if the query string is missing, return a 400 status if true
        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }

        // Use the movieService to search for movies matching the query
        const movies = await movieService.searchMovies(query);

        // Check if no movies are found, return a 404 status if true
        if (!movies || movies.length === 0) {
            return res.status(404).json({ error: "Query not found" });
        }

        // Return the found movies with a 200 status as a JSON response        
        res.status(200).json(movies.map(movie => getMovieForClient(req.protocol, req.get('Host'), movie)));
    } catch (error) {
        // Log any errors to the console with a descriptive message
        console.error("Error in searchMovies:", error.message);

        // Return a 500 Internal Server Error response if an error occurs
        res.status(500).json({ error: "Internal server error" });
    }
};

// Define an asynchronous function to create a new movie
const createMovie = async (req, res) => {
    try {
        // Destructure the name and category from the request body
        const { name, category } = req.body;

        // Check if both name and category are missing, return a 400 status if true
        if (!name && !category) {
            return res.status(400).json({ error: "Name and Category are required" });
        }

        // Check if the name is missing, return a 400 status if true
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        // Check if the category is missing, return a 400 status if true
        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        }

        // Check if a movie with the same name and category already exists
        const existingMovie = await Movie.findOne({ name, category });
        if (existingMovie) {
            // If a duplicate is found, return a 409 Conflict status
            return res.status(409).json({ error: "Movie with the same name and category already exists" });
        }

        // Attempt to fetch the category by its name
        let existingCategory = await getCategoryByName(category);

        // If the category doesn't exist, create a new category
        if (!existingCategory) {
            existingCategory = await createCategory({ name: category });
        }

        // Generate a new integer ID for the movie
        const intId = await getNextIntId("movieIntId", 100);

        // Create a new movie with the provided name, category, and generated ID
        const movie = await movieService.createMovie({ name, 
            category: existingCategory.name, 
            intId, 
            previewPhotoFileName: req.files['uploaded_picture']?.length 
                                    ? req.files['uploaded_picture'][0].filename 
                                    : undefined,
            videoFileName: req.files['uploaded_movie'][0].filename,
            videoMimeType: req.files['uploaded_movie'][0].mimetype });

        // Return the created movie with a 201 Created status as a JSON response
        res.status(201).json(getMovieForClient(req.protocol, req.get('Host'), movie.toObject()));
    } catch (error) {
        // Log any errors to the console for debugging
        console.error(error);

        // Return a 500 Internal Server Error response if an error occurs
        res.status(500).json({ error: "Internal server error" });
    }
};

// Define an asynchronous function to get a movie by its ID
const getMovieById = async (req, res) => {
    try {
        // Extract the ID from the request parameters
        const { id } = req.params;

        // Check if the ID is missing, return a 400 status if true
        if (!id) {
            return res.status(400).json({ error: "Id is required" });
        }

        // Validate the format of the movie ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'Invalid movie ID'});
        }

        // Fetch the movie by its ID using the movieService
        const movie = await movieService.getMovieById(id);

        // Check if the movie exists, return a 404 status if not found
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        // Return the movie details as a JSON response with a 200 status
        res.status(200).json(getMovieForClient(req.protocol, req.get('Host'), movie.toObject()));
    } catch (error) {
        // Log any errors to the console for debugging
        console.error("Error fetching movie by ID:", error);

        // Return a 500 Internal Server Error response if an error occurs
        res.status(500).json({ error: "Internal server error" });
    }
};

// Define an asynchronous function to get a movie by its ID
const getMovies = async (req, res) => {
    try {
        // Fetch the movie by its ID using the movieService
        const movies = await movie.find();

        if (!movies || movies.length === 0) {
            return res.status(404).json({ error: "No movies found" });
        }

        // Return the movie details as a JSON response with a 200 status
        res.status(200).json(movies.map(movie => getMovieForClient(req.protocol, req.get('Host'), movie.toObject())));
    } catch (error) {
        // Log any errors to the console for debugging
        console.error("Error fetching movie by ID:", error);

        // Return a 500 Internal Server Error response if an error occurs
        res.status(500).json({ error: "Internal server error" });
    }
};

// Define an asynchronous function to get movie recommendations
const getRecommendations = async (req, res) => {
    // Extract the movie ID from the request parameters
    const movieId = req.params.id;

    // Validate the format of the movie ID
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({error: 'Invalid movie ID'});
    }

    try {
        // Fetch recommendations using the movieService
        const response = await movieService.getRecommendations(req.user.id, movieId);

        // Return the recommendations as a JSON response
        res.json(response.map(movie => getMovieForClient(req.protocol, req.get('Host'), movie)));
    } catch (err) {
        // Return an error response with the appropriate status code
        res.status(err.status || 500).json({ error: err.message });
    }
};

// Define an asynchronous function to add a movie to the watched list
const addWatchedMovie = async (req, res) => {
    // Extract the movie ID from the request parameters
    const movieId = req.params.id;

    // Validate the format of the movie ID
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({error: 'Invalid movie ID'});
    }

    try {
        // Add the movie to the watched list using the movieService
        const response = await movieService.addWatchedMovie(req.user.id, movieId);

        // Return the response with the appropriate status code
        res.status(response.status).json(response.body);
    } catch (err) {
        // Return an error response with the appropriate status code
        res.status(err.status || 500).json({ error: err.message });
    }
};

// Define an asynchronous function to fetch movies by category
const getMoviesByCategory = async (req, res) => {
    const fetchAll = req.query.all === 'true';

    // Log the user ID for debugging purposes
    console.log(`Fetching movies for user ID: ${req.user.id}`);

    try {
        // Fetch movies by category using the movieService
        const movies = await movieService.fetchMoviesByCategory(req.user, fetchAll);
        Object.keys(movies)
        .forEach(moviesCategory => movies[moviesCategory] = movies[moviesCategory].map(movie => getMovieForClient(req.protocol, req.get('Host'), movie)));
        // Return the movies as a JSON response with a 200 status
        res.status(200).json(movies);
    } catch (error) {
        // Log any errors to the console with a descriptive message
        console.error('Error fetching movies by category:', error.message);

        // Determine the status code based on the error message
        const statusCode = error.message.includes('found') ? 404 : 500;

        // Return an error response with the determined status code
        res.status(statusCode).json({ error: error.message });
    }
};

const getVideo = async (req, res) => {
    const movieId = req.params.id;

    // Validate the format of the movie ID
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({ error: 'Invalid movie ID' });
    }

    const movie = await movieService.getMovieById(movieId);
    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    // Get the video’s actual location and size
    const videoPath = path.join(__basedir, 'public', 'movies', movie.videoFileName);

    if (!fs.existsSync(videoPath)) {
        return res.status(404).json({ error: 'Video file not found' });
    }

    const leSize = fs.statSync(videoPath).size;

    // Extract the range requested by the browser
    const range = req.headers.range;

    if (range) {
        // Client requested a specific byte range
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + 10 ** 6 - 1, leSize - 1);

        if (start >= leSize || end >= leSize || start > end) {
            // Invalid range
            return res.status(416).json({ error: 'Requested range not satisfiable' });
        }

        const chunkSize = end - start + 1;
        const le = fs.createReadStream(videoPath, { start, end });

        const head = {
            'Content-Range': `bytes ${start}-${end}/${leSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': movie.videoMimeType,
        };

        res.writeHead(206, head);
        le.pipe(res);
    } else {
        // No range header, stream the entire video
        const head = {
            'Content-Length': leSize,
            'Content-Type': movie.videoMimeType,
        };

        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
};


function getMovieForClient(protocol, host, movie) {
    const videoUrl = `${protocol}://${host}/api/movies/video/${movie._id}`;
    const pictureUrl = `${protocol}://${host}/movies/${movie.previewPhotoFileName}`;
    const { videoFileName, videoMimeType, previewPhotoFileName, ...updatedMovie } = movie;
    return { ...updatedMovie, videoUrl, pictureUrl };
}

module.exports = { 
    getMovies,
    updateMovie, 
    deleteMovie, 
    searchMovies, 
    createMovie, 
    getMovieById, 
    getRecommendations, 
    addWatchedMovie, 
    getMoviesByCategory,
    getVideo
};


