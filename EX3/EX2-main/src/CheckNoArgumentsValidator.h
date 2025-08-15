//
// Created by Lital on 07/12/2024.
//

#ifndef CHECK_NO_ARGUMENTS_VALIDATOR_H
#define CHECK_NO_ARGUMENTS_VALIDATOR_H

#include "IValidator.h"
#include "state.h"
#include "ICommand.h"

class CheckNoArgumentsValidator : public IValidator {
public:
    // Constructor receiving State reference
    explicit CheckNoArgumentsValidator(State& state);

    // Implementation of the validate function
    ValidationResult validate(ICommand& command) const override;
};

#endif // CHECK_NO_ARGUMENTS_VALIDATOR_H
