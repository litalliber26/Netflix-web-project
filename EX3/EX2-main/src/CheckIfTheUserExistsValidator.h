//
// Created by Gili on 08/12/2024.
//

#ifndef CHECKIFTHEUSEREXISTSVALIDATOR_H
#define CHECKIFTHEUSEREXISTSVALIDATOR_H

#include "IValidator.h"
#include "state.h"
#include "ICommand.h"

// CheckIfTheUserExistsValidator class definition
class CheckIfTheUserExistsValidator : public IValidator {
public:
    // Constructor receiving State reference
    explicit CheckIfTheUserExistsValidator(State& state);

    // Implementation of the validate function
    ValidationResult validate(ICommand& command) const override;
};

#endif // CHECKIFTHEUSEREXISTSVALIDATOR_H