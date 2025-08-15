// CheckTwoArgumentsValidator.h
//
// Created by Lital on 07/12/2024.
//

#ifndef CHECK_TWO_ARGUMENTS_VALIDATOR_H
#define CHECK_TWO_ARGUMENTS_VALIDATOR_H

#include "IValidator.h"
#include "state.h"
#include "ICommand.h"

class CheckTwoArgumentsValidator : public IValidator {
public:
    // Constructor receiving State reference
    explicit CheckTwoArgumentsValidator(State& state);

    // Implementation of the validate function
    ValidationResult validate(ICommand& command) const override;
};

#endif // CHECK_TWO_ARGUMENTS_VALIDATOR_H
