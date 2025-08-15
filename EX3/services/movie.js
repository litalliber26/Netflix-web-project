const Movie = require('../models/movie'); // Import the Movie model
const Counter = require('../models/counter');
const userService = require('./user');
const net = require('net');
const User = require('../models/user');
const fs = require('fs');

const RECOMMENDER_SERVER_HOST = process.env.RECOMMENDER_SERVER_HOST || '127.0.0.1';
const RECOMMENDER_SERVER_PORT = +process.env.RECOMMENDER_SERVER_PORT || 8080;
const userSockets = new Map();

// Define an asynchronous function to update a movie
const updateMovie = async (id, data) => {
    try {
        // Fetch the movie by its ID
        const movie = await getMovieById(id);

        // Check if the movie exists, return null if not found
        if (!movie) {
            return null; // Movie not found
        }

        // Update the movie's name if provided in the data
        if (data.name) movie.name = data.name;

        // Update the movie's category if provided in the data
        if (data.category) movie.category = data.category;

        // Save the updated movie and return the result
        return await movie.save();
    } catch (error) {
        // Log any errors to the console with a descriptive message
        console.error(`Error updating movie: ${id}`, error);

        // Rethrow the error to be handled by the calling controller
        throw error;
    }
};

const deleteMovie = async (id) => {
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return null; // Return null if movie not found
        }
        await movie.deleteOne(); // Delete the movie
        fs.rmSync(`public/movies/${movie.videoFileName}`);
        return movie;
    } catch (error) {
        console.error(`Error deleting movie: ${id}`, error);
        throw error; // Rethrow error for the controller
    }
};

const mongoose = require('mongoose');

const searchMovies = async (query) => {
    try {
        // Use aggregation pipeline for partial search on _id
        const movies = await Movie.aggregate([
            {
                $addFields: {
                    idAsString: { $toString: "$_id" } // Convert _id to string
                }
            },
            {
                $match: {
                    $or: [
                       // { idAsString: { $regex: query, $options: 'i' } }, // Partial match on _id as string
                        { name: { $regex: query, $options: 'i' } }, // Match on name
                        { category: { $regex: query, $options: 'i' } } // Match on category
                    ]
                }
            },
            {
                $project: { idAsString: 0 } // Exclude idAsString from results
            }
        ]);

        return movies;
    } catch (error) {
        // Log the error to the console with a descriptive message, including the query
        console.error(`Error searching for movies with query: ${query}`, error);
    
        // Rethrow the error to propagate it to the caller
        throw error;
    }    
};

// Define an asynchronous function to fetch a movie by its integer ID
const getMovieByIntId = async (intId) => {
    try {
        // Search the database for a movie with the specified integer ID
        return await Movie.findOne({ intId });
    } catch (error) {
        // Log the error to the console with a descriptive message
        console.error(`Error fetching movie by intId: ${intId}`, error);

        // Rethrow the error to propagate it to the caller
        throw error;
    }
};

// Define an asynchronous function to create a new movie
const createMovie = async ({ name, category, intId, videoFileName, videoMimeType, previewPhotoFileName }) => {
    try {
        // Create a new movie instance with the provided name, category, and integer ID
        const movie = new Movie({ name, category, intId, videoFileName, videoMimeType, previewPhotoFileName });

        // Save the new movie to the database and return the saved document
        return await movie.save();
    } catch (error) {
        // Log the error to the console with a descriptive message
        console.error('Error creating movie:', error.message);

        // Rethrow the error to propagate it to the caller
        throw error;
    }
};

const getMovieById = async (id) => {
    try {
        return await Movie.findById(id); // Use Mongoose to find the movie by ID
    } catch (error) {
        console.error(`Error fetching movie with ID: ${id}`, error);
        return null; // Return null if ID is invalid or not found
    }
};

// Define an asynchronous function to get movie recommendations
const getRecommendations = async (userId, movieId) => {
    // Get the socket client for the given user ID
    const client = getUserSocket(userId);

    // Fetch the movie from the database using the movie ID
    const mongoMovie = await getMovieById(movieId);

    // Check if the movie exists, throw a 404 error if not found
    if (!mongoMovie) {
        throw { status: 404, message: 'Movie Not Found!' };
    }

    // Fetch the user from the database using the user ID
    const mongoUser = await userService.getUserById(userId);

    // Check if the user exists, throw a 404 error if not found
    if (!mongoUser) {
        throw { status: 404, message: 'User Not Found!' };
    }

    // Construct a command to send to the server using the user's and movie's integer IDs
    const command = `GET ${mongoUser.intId} ${mongoMovie.intId}`;

    // Write the command to the socket client
    client.write(Buffer.from(command, 'utf-8'));

    try {
        // Wait for a response from the server
        const response = await recvMessage(client);

        // Handle different server responses
        if (response.startsWith('400 Bad Request') || response.startsWith('404 Not Found')) {
            // If the response indicates a bad request, throw a 400 error
            return [];
        }
        if (response.startsWith('200 OK')) {
            // If the response indicates success, parse the recommended movies
            const recommendedMoviesResponse = response
                .split('\n') // Split the response into lines
                .map(line => line.trim()) // Remove whitespace from each line
                .filter(line => line.length > 0 && line !== '200 OK'); // Filter out empty lines and the '200 OK' line

            const recommendedMoviesIntIds = recommendedMoviesResponse[0]?.split(' ');
            if(recommendedMoviesIntIds?.length) {
                const recommendedMovies = [];
                const recommendedMoviesResults = await Promise.allSettled(recommendedMoviesIntIds.map(intId => getMovieByIntId(intId)));
                recommendedMoviesResults.forEach((recommendedMoviesResult, index) => {
                    if(recommendedMoviesResult.status === 'fulfilled') {
                        recommendedMovies.push(recommendedMoviesResult.value.toObject());
                        return;
                    }
                    console.log(`cannot fetch recommended movie with intID: ${recommendedMoviesIntIds[index]}`);
                });
                            // Return the parsed recommended movies
                return recommendedMovies;
            }
            throw { status: 500, message: 'Unexpected response from server' };
        } else {
            // If the response is unexpected, throw a 500 error
            throw { status: 500, message: 'Unexpected response from server' };
        }
    } catch (err) {
        // Rethrow any caught errors to be handled by the caller
        throw err;
    }
};

// Define an asynchronous function to add a watched movie for a user
const addWatchedMovie = async (userId, movieId) => {
    // Get the socket client for the given user ID
    const client = getUserSocket(userId);

    try {
        // Fetch the movie from the database using the movie ID
        const mongoMovie = await getMovieById(movieId);

        // Check if the movie exists, throw a 404 error if not found
        if (!mongoMovie) {
            throw { status: 404, message: 'Movie Not Found!' };
        }

        // Fetch the user from the database using the user ID
        const mongoUser = await userService.getUserById(userId);

        // Check if the user exists, throw a 404 error if not found
        if (!mongoUser) {
            throw { status: 404, message: 'User Not Found!' };
        }

        // Construct a PATCH command to send to the server
        const patchCommand = `PATCH ${mongoUser.intId} ${mongoMovie.intId}`;

        // Write the PATCH command to the socket client
        client.write(Buffer.from(patchCommand, 'utf-8'));

        // Wait for a response from the server after the PATCH command
        const patchResponse = await recvMessage(client);

        // Handle different server responses for the PATCH command
        if (patchResponse.startsWith('204 No Content')) {
            // If the server responds with '204 No Content', update the user's watched movies
            const patchUserResponse = await userService.addWatchedMovie(mongoUser.id, mongoMovie.intId);

            // Return a success status and message
            return { status: 200, body: patchUserResponse };
        } else if (patchResponse.startsWith('404 Not Found')) {
            // If the server responds with '404 Not Found', construct a POST command
            const postCommand = `POST ${mongoUser.intId} ${mongoMovie.intId}`;

            // Write the POST command to the socket client
            client.write(Buffer.from(postCommand, 'utf-8'));

            // Wait for a response from the server after the POST command
            const postResponse = await recvMessage(client);

            // Handle different server responses for the POST command
            if (postResponse.startsWith('201 Created')) {
                // If the server responds with '201 Created', update the user's watched movies
                const postUserResponse = await userService.addWatchedMovie(mongoUser.id, mongoMovie.intId);

                // Return a created status and message
                return { status: 201, body: postUserResponse };
            } else {
                // If the server response is unexpected, throw a 500 error
                throw { status: 500, message: 'Unexpected response from server during POST' };
            }
        } else {
            // If the server response is unexpected, throw a 500 error
            throw { status: 500, message: 'Unexpected response from server during PATCH' };
        }
    } catch (err) {
        // Rethrow any caught errors to be handled by the caller
        throw err;
    }
};

function getUserSocket(userId) {
    if (!userSockets.has(userId)) {
        const socket = new net.Socket();
        socket.connect(RECOMMENDER_SERVER_PORT, RECOMMENDER_SERVER_HOST);

        socket.on('error', (err) => {
            console.error(`Socket error for user ${userId}:`, err);
            userSockets.delete(userId);
        });

        socket.on('close', () => {
            console.log(`Socket closed for user ${userId}`);
            userSockets.delete(userId);
        });

        userSockets.set(userId, socket);
    }
    return userSockets.get(userId);
}

function recvMessage(socket) {
    return new Promise((resolve, reject) => {
        let buffer = Buffer.alloc(0);

        socket.on('data', (data) => {
            buffer = Buffer.concat([buffer, data]);
            if (buffer.length >= 4) {
                const messageSize = buffer.readUInt32BE(0);
                if (buffer.length >= 4 + messageSize) {
                    const message = buffer.slice(4, 4 + messageSize).toString('utf-8');
                    resolve(message);
                }
            }
        });

        socket.on('error', reject);
        socket.on('close', () => {
            if (buffer.length < 4) {
                reject(new Error('Connection closed while reading message size'));
            }
        });
    });
}

// Define an asynchronous function to fetch movies by category
const getMoviesByCategory = async (category, limit) => {
    try {
        // Query the database to find movies in the specified category, excluding specific movies
        const movies = await Movie.aggregate([
            { $match: { category } }, // Match movies in the category and not in the excluded list
            { $sample: { size: limit } } // Randomly sample a specified number of movies
        ]);

        // Log a warning if no movies are found
        if (!movies || movies.length === 0) {
            console.warn(`No movies found for category: ${category}`);
        }

        // Return the found movies
        return movies;
    } catch (error) {
        // Log any errors to the console with a descriptive message
        console.error(`Error fetching movies by category "${category}":`, error.message);

        // Rethrow the error to propagate it to the caller
        throw error;
    }
};

// Define an asynchronous function to fetch movies by their IDs
const getMoviesByIds = async (ids, limit) => {
    try {
        // Query the database to find movies with specific IDs
        const movies = await Movie.aggregate([
            { $match: { intId: { $in: ids } } }, // Match movies with IDs in the provided list
            { $sample: { size: limit } } // Randomly sample a specified number of movies
        ]);

        // Return the found movies
        return movies;
    } catch (error) {
        // Log any errors to the console with a descriptive message
        console.error('Error fetching movies by IDs:', error.message);

        // Rethrow the error to propagate it to the caller
        throw error;
    }
};

// Define an asynchronous function to fetch the list of watched movies for a user
const getWatchedMovies = async (userId) => {
    try {
        // Fetch the user from the database using their ID
        const user = await User.findById(userId);

        // Check if the user exists, log a warning and return null if not found
        if (!user) {
            console.warn(`User with ID ${userId} not found`);
            return null;
        }

        // Log the fetched watched movies for the user
        console.log(`Fetched watched movies for user ${userId}:`, user.watchedMovies);

        // Return the list of watched movies or an empty array if none exist
        return user.watchedMovies || [];
    } catch (error) {
        // Log any errors to the console with a descriptive message
        console.error(`Error fetching watched movies for user ID ${userId}:`, error.message);

        // Rethrow the error to propagate it to the caller
        throw error;
    }
};

const {getAllCategories} = require('./category')

// Define an asynchronous function to fetch movies by category for a user
const fetchMoviesByCategory = async (user, getAll) => {
    // Fetch all categories from the database
    const categories = await getAllCategories();

    // Check if any categories exist, throw an error if none are found
    if (!categories || categories.length === 0) {
        throw new Error('No categories found');
    }

    // Initialize an empty response object to store movies by category
    const response = {};

    // Iterate through each category
    for (const category of categories) {
        // Check if the category is promoted
        if (category.promoted || getAll) {
            // Fetch movies in the category, excluding those already watched by the user
            const movies = await getMoviesByCategory(category.name, 20);

            // If movies are found, add them to the response under the category name
            if (movies.length > 0) {
                response[category.name] = movies;
            }
        }
    }

    // Check if the user has watched movies
    if (user.watchedMovies && user.watchedMovies.length > 0) {
        // Fetch the user's watched movies, limiting the number of results
        const watchedMovies = await getMoviesByIds(user.watchedMovies, 20);

        // If watched movies are found, add them to the response under "Watched Movies"
        if (watchedMovies.length > 0) {
            response['Watched Movies'] = watchedMovies;
        }
    }

    // Return the response object containing movies grouped by category
    return response;
};

module.exports = { getMovieByIntId, getMovieById, createMovie, updateMovie, deleteMovie,
     searchMovies, getRecommendations, addWatchedMovie, getMoviesByCategory,getMoviesByIds,
     getWatchedMovies, fetchMoviesByCategory };