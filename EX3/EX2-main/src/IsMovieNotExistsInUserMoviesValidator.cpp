//
// Created by Gili on 08/12/2024.
//
#include "IValidator.h"
#include "CheckIfTheMovieExistsInUserMoviesValidator.h"
#include "IsMovieNotExistsInUserMoviesValidator.h"
#include <algorithm>

    // Constructor receiving State reference
    IsMovieNotExistsInUserMoviesValidator::IsMovieNotExistsInUserMoviesValidator(State& state) :
    IValidator(state) {}

    // Method to validate if a movie does not exist in a user's movie list.
    ValidationResult IsMovieNotExistsInUserMoviesValidator::validate(ICommand& command)
    const {
         // Create an instance of CheckIfTheMovieExistsInUserMoviesValidator to check if the movie exists.
        auto isExistsValidator = CheckIfTheMovieExistsInUserMoviesValidator(state);
        // Validate if the movie exists using the provided command.
        auto isUserExists = isExistsValidator.validate(command);
        // Check if the movie exists in the user's movie list.
        if (isUserExists.isValid) {
            // If the movie exists, return "404 Bad Request" and an invalid validation result.
            return ValidationResult{!isUserExists.isValid, "400 Bad Request"};
        }
        // If the movie does not exist, return a valid result with no error message.
        return ValidationResult{!isUserExists.isValid, ""};
    }