//
// Created by Gili on 14/12/2024.
//

#ifndef AP_EX1_CHECKIFTHEMOVIEEXISTSINUSERMOVIESVALIDATOR_H
#define AP_EX1_CHECKIFTHEMOVIEEXISTSINUSERMOVIESVALIDATOR_H

#include "IValidator.h"
#include "state.h"
#include "ICommand.h"

class CheckIfTheMovieExistsInUserMoviesValidator : public IValidator {
public:
    // Constructor receiving State reference
    explicit CheckIfTheMovieExistsInUserMoviesValidator(State& state);

    // Implementation of the validate function
    ValidationResult validate(ICommand& command) const override;
};
#endif //AP_EX1_CHECKIFTHEMOVIEEXISTSINUSERMOVIESVALIDATOR_H
