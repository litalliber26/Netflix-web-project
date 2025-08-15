//
// Created by Lital on 08/12/2024.
//

#include "CheckIfTheMovieExistsInMoviesValidator.h"

// Constructor for the CheckIfTheMovieExistsInMoviesValidator class, initializes it by passing the State reference to the base IValidator class.
CheckIfTheMovieExistsInMoviesValidator::CheckIfTheMovieExistsInMoviesValidator(State& state) : IValidator(state) {}

// Method to validate if a movie exists in the movies list of other users.
ValidationResult CheckIfTheMovieExistsInMoviesValidator::validate(ICommand& command) const {

    int userId, movieId;
    try {
        // Convert the second argument to user ID.
        userId = std::stoi(command.arguments[0]);
        // Convert the third argument to movie ID.
        movieId = std::stoi(command.arguments[1]);
    } catch (...) {
        return ValidationResult{false, "400 Bad Request"}; // Invalid ID format.
    }

    // Iterate through all users except the current user.
    for (const auto& user : state.users) {
        // Skip the current user.
        if (user.id == userId) {
            continue;
        }

        // Check if the movie exists in this user's movie list.
        if (std::find(user.movies.begin(), user.movies.end(), movieId) != user.movies.end()) {
            // If the movie exists, return a success response "200 Ok".
             return ValidationResult{true, "200 Ok\n"};
        }
    }
    // If the movie is not found in any user's list, return a "404 Bad Request" response.
    return ValidationResult{false, "400 Bad Request"};
}
