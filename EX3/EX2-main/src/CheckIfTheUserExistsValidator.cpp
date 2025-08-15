//
// Created by Lital on 07/12/2024.
//

#include <iostream>
#include <algorithm>
#include "CheckIfTheUserExistsValidator.h"

    // Constructor receiving State reference
    CheckIfTheUserExistsValidator::CheckIfTheUserExistsValidator(State& state) : IValidator(state) {}

    // Implementation of the validate function
    ValidationResult CheckIfTheUserExistsValidator::validate(ICommand& command) const {
        // Extract the user ID from the second argument
        int userId;
        try {
            userId = std::stoi(command.arguments[0]); // Convert string to integer
        } catch (...) {
            return ValidationResult{false, "400 Bad Request"}; // Invalid ID format
        }

        // Check if the user exists in the state
        auto userExists = std::any_of(state.users.begin(), state.users.end(),
                                      [userId](const User& user) {
                                          return user.id == userId;
                                      });

        if (userExists) {
            // If the user exists, return a success response "200 Ok".
            return ValidationResult{true, "200 Ok\n"};
        } else {
            // If the user is not found in users list, return a "404 Not Found" response.
            return ValidationResult{false, "404 Not Found"};
        }
    }

