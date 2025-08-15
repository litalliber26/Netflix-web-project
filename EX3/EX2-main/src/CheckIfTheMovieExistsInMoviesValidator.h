// CheckIfTheMovieExistsInMoviesValidator.h
//
// Created by Lital on 08/12/2024.
//

#ifndef CHECK_IF_THE_MOVIE_EXISTS_IN_MOVIES_VALIDATOR_H
#define CHECK_IF_THE_MOVIE_EXISTS_IN_MOVIES_VALIDATOR_H

#include "IValidator.h"
#include "state.h"
#include "ICommand.h"

class CheckIfTheMovieExistsInMoviesValidator : public IValidator {
public:
    // Constructor receiving State reference.
    explicit CheckIfTheMovieExistsInMoviesValidator(State& state);

    // Implementation of the validate function.
    ValidationResult validate(ICommand& command) const override;
};

#endif // CHECK_IF_THE_MOVIE_EXISTS_IN_MOVIES_VALIDATOR_H
