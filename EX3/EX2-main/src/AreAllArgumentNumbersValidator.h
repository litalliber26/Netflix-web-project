//
// Created by Gili on 14/12/2024.
//

#ifndef AP_EX1_AREALLARGUMENTNUMBERSVALIDATOR_H
#define AP_EX1_AREALLARGUMENTNUMBERSVALIDATOR_H


#include "IValidator.h"
#include "state.h"
#include "ICommand.h"

class AreAllArgumentNumbersValidator : public IValidator {
public:
    // Constructor receiving State reference
    explicit AreAllArgumentNumbersValidator(State& state);

    // Implementation of the validate function
    ValidationResult validate(ICommand& command) const override;
};


#endif //AP_EX1_AREALLARGUMENTNUMBERSVALIDATOR_H
