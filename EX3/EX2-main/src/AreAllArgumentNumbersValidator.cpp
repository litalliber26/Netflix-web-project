//
// Created by Gili on 14/12/2024.
//

#include "AreAllArgumentNumbersValidator.h"

// Constructor receiving State reference
AreAllArgumentNumbersValidator::AreAllArgumentNumbersValidator(State& state) : IValidator(state) {}

// Helper function to validate if a string contains only digits
bool isValidInput(const std::string& input) {
    for (char c : input) {
        if (!std::isdigit(c)) {
            return false; // Invalid character found
        }
    }
    return true;
}

// Implementation of the validate function
ValidationResult AreAllArgumentNumbersValidator::validate(ICommand& command) const {
    // Validate the entire input
    for (const std::string& arg : command.arguments) {
        if (!isValidInput(arg)) {
            return ValidationResult{false, "400 Bad Request"};
        }
    }
    return ValidationResult{true, ""};
}
