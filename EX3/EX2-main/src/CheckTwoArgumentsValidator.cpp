//
// Created by Lital on 07/12/2024.
//

#include "CheckTwoArgumentsValidator.h"

CheckTwoArgumentsValidator::CheckTwoArgumentsValidator(State& state) : IValidator(state) {}

ValidationResult CheckTwoArgumentsValidator::validate(ICommand& command) const {
    // Check if the command has exactly 2 arguments
    if (command.arguments.size() == 2) {
        // If there are exactly 2 arguments, return ValidationResult indicating success
        return ValidationResult{true, "200 Ok\n"};
    }
    // If there are not 2 arguments, return ValidationResult with an error
    return ValidationResult{false, "400 Bad Request"};
}
