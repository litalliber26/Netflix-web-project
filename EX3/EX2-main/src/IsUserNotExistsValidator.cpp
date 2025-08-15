//
// Created by Gili on 08/12/2024.
//
#include "IValidator.h"
#include "CheckIfTheUserExistsValidator.h"
#include "IsUserNotExistsValidator.h"
#include <algorithm>

    // Constructor receiving State reference
    IsUserNotExistsValidator::IsUserNotExistsValidator(State& state) :
    IValidator(state) {}

    // Implementation of the validate function
    ValidationResult IsUserNotExistsValidator::validate(ICommand& command)
    const {
        auto isExistsValidator = CheckIfTheUserExistsValidator(state);
        auto isUserExists = isExistsValidator.validate(command);
        if (isUserExists.isValid) {
            return ValidationResult{!isUserExists.isValid, "404 Not Found"};
        }
        return ValidationResult{!isUserExists.isValid, ""};
    }