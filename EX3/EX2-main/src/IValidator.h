//
// Created by Gili on 07/12/2024.
//

#ifndef AP_EX1_IVALIDATOR_H
#define AP_EX1_IVALIDATOR_H
#include <string>
#include "state.h"

// Forward declaration of ICommand
class ICommand;

struct ValidationResult {
    bool isValid;
    /* Would be populated to distinguish between possible outputs of failed
     validation (404 Not Found or 400 Bad Request) */
    std::string validationResultOutput;
};

class IValidator {
public:
    IValidator(State& state): state(state) {}

    virtual ~IValidator() = default;

    virtual ValidationResult validate(ICommand& command) const = 0;

protected:
    // Reference to the State object
    State& state;
};
#endif //AP_EX1_IVALIDATOR_H
