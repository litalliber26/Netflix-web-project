//
// Created by Lital on 07/12/2024.
//

#include "CheckNoArgumentsValidator.h"

CheckNoArgumentsValidator::CheckNoArgumentsValidator(State& state) : IValidator(state) {}

ValidationResult CheckNoArgumentsValidator::validate(ICommand& command) const {
    // Check if there are arguments in the command
    if (!command.arguments.empty()) {
        // If there are arguments, return ValidationResult with an error
        return ValidationResult{false, "400 Bad Request"};
    }
    // If no arguments, return ValidationResult indicating success
    return ValidationResult{true, "200 Ok\n"}; // Empty string for no output
}
