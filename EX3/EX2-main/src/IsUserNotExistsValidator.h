//
// Created by Gili on 14/12/2024.
//

#ifndef AP_EX1_ISUSERNOTEXISTSVALIDATOR_H
#define AP_EX1_ISUSERNOTEXISTSVALIDATOR_H
#include "IValidator.h"
#include "state.h"
#include "ICommand.h"

// CheckIfTheUserExistsValidator class definition
class IsUserNotExistsValidator : public IValidator {
public:
    // Constructor receiving State reference
    explicit IsUserNotExistsValidator(State& state);

    // Implementation of the validate function
    ValidationResult validate(ICommand& command) const override;
};

#endif //AP_EX1_ISUSERNOTEXISTSVALIDATOR_H
