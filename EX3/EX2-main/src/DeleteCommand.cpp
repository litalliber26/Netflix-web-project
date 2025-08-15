//
// Created by Gili on 12/12/2024.
//
#include <algorithm>
#include "DeleteCommand.h"


DeleteCommand::DeleteCommand(std::shared_ptr<ISaver> saver, std::shared_ptr<IOutput> output, State& state, std::vector<std::shared_ptr<IValidator>> validators)
        : ICommand(std::move(saver), std::move(output), state, std::move(validators)) {}

void DeleteCommand::handle() {
    // Validate the command using the provided validators
    for (const auto& validator : validators) {
        ValidationResult validationResult = validator->validate(*this);
        if (!validationResult.isValid) {
            output->displayOutput(validationResult.validationResultOutput);
            return;
        }
    }

    // Convert userId to an integer
    int userId = std::stoi(arguments[0]);

    // Find the user in the state
    auto userIt = std::find_if(state.users.begin(), state.users.end(), [userId](const User& user) { return user.id == userId; });


    // Delete movies for the user
    User& user = *userIt;
    for (size_t i = 1; i < arguments.size(); ++i) {
        int movieId = std::stoi(arguments[i]);

        user.movies.erase(
                std::remove(user.movies.begin(), user.movies.end(), movieId),
                user.movies.end()
        );
    }

    // Save the updated state using ISaver
    if (saver) {
        saver->saveState(state);
    }

    // Display success message
    output->displayOutput("204 No Content");
}
