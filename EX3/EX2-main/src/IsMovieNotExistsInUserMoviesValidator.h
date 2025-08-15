//
// Created by Gili on 14/12/2024.
//

#include "IValidator.h"
#include "state.h"
#include "ICommand.h"

// IsMovieNotExistsInUserMoviesValidator class definition
class IsMovieNotExistsInUserMoviesValidator : public IValidator {
public:
    // Constructor receiving State reference
    explicit IsMovieNotExistsInUserMoviesValidator(State& state);

    // Implementation of the validate function
    ValidationResult validate(ICommand& command) const override;
};


