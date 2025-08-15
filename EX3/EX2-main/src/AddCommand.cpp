//
// Created by Gili on 23/11/2024.
//
#include <algorithm> // For std::unique and std::sort
#include "AddCommand.h"
#include <vector>
#include <cctype>    // For std::isdigit
#include <sstream>   // For std::istringstream
#include <string>

AddCommand::AddCommand(std::shared_ptr<ISaver> saver,
                       std::shared_ptr<IOutput> output, State& state,
                       std::vector<std::shared_ptr<IValidator>> validators)
        : ICommand(std::move(saver), std::move(output), state, validators) {}


// Function to merge the user's movie list with the new list
void AddCommand::mergeMovieLists(std::vector<int>& userMovies, const
std::vector<int>& newMovies) {
    // Add new movies to the user's movie list
    userMovies.insert(userMovies.end(), newMovies.begin(), newMovies.end());

    // Remove duplicates by sorting and using std::unique
    std::sort(userMovies.begin(), userMovies.end());
    userMovies.erase(std::unique(userMovies.begin(), userMovies.end()), userMovies.end());
}

void AddCommand::handle(){
    for (auto& validator : validators) {
        auto result = validator->validate(*this);
        if (!result.isValid) {
            output->displayOutput(result.validationResultOutput);
            return;
        }
    }

    // Parse user ID
    int userid = std::stoi(arguments[0]);

    // Parse the new movies list from arguments
    std::vector<int> newMovies;
    for (size_t i = 1; i < arguments.size(); ++i) {
        std::istringstream iss(arguments[i]);
        std::string token;
        while (std::getline(iss, token, ' ')) { // Split by space
            // Ignore empty tokens (e.g., from multiple spaces)
            if (!token.empty()) {
                try {
                    newMovies.push_back(std::stoi(token)); // Convert to integer
                } catch (const std::exception&) {
                    continue; // Skip invalid entries
                }
            }
        }
    }
    // Find the user and merge the movie lists
    for (auto& user : state.users) { // Use non-const reference to modify the user
        if (user.id == userid) {
            mergeMovieLists(user.movies, newMovies); // Call the merge function
            saver->saveState(state); // Save the new state after changing it
            output->displayOutput("204 No Content");
            return; // Exit the loop once the user is found and updated
        }
    }
// If user is not found, create a new user and add to the list
User newUser{userid, newMovies};
state.users.push_back(newUser);
saver->saveState(state);
output->displayOutput("201 Created");
}