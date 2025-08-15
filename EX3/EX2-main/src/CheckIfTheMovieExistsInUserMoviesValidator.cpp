//
// Created by Lital on 07/12/2024.
//

#include "CheckIfTheMovieExistsInUserMoviesValidator.h"
#include <iostream>
#include <algorithm>

    // Constructor receiving State reference.
    CheckIfTheMovieExistsInUserMoviesValidator
    ::CheckIfTheMovieExistsInUserMoviesValidator(State& state) : IValidator
    (state) {}

    // Implementation of the validate function.
    ValidationResult CheckIfTheMovieExistsInUserMoviesValidator::validate
    (ICommand& command) const {
        int userId, movieId;
        try {
            // Convert the second argument to user ID.
            userId = std::stoi(command.arguments[0]);
            // Convert the third argument to movie ID.
            movieId = std::stoi(command.arguments[1]);
        } catch (...) {
            return ValidationResult{false, "400 Bad Request"}; // Invalid ID format.
        }

        // Find the user in the state.
        auto userIt = std::find_if(state.users.begin(), state.users.end(),
                                   [userId](const User& user) {
                                       return user.id == userId;
                                   });

        // If the user is not found, return an error.
        if (userIt == state.users.end()) {
            return ValidationResult{false, "404 Not Found"};
        }

        // Check if the movie exists in the user's movie list.
        auto movieExists = std::find(userIt->movies.begin(), userIt->movies.end(), movieId) != userIt->movies.end();

        if (movieExists) {
            // If the movie exists, return a success response "200 Ok".
             return ValidationResult{true, "200 Ok\n"};
        } 
           // If the movie is not found in any user's list, return a "404 Not Found" response.
           return ValidationResult{false, "404 Not Found"};
    }
