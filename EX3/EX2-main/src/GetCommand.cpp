#include "GetCommand.h"
#include <algorithm>
#include <sstream>

// Constructor of GetCommand.
GetCommand::GetCommand(std::shared_ptr<IOutput> output, State& state,
                       std::vector<std::shared_ptr<IValidator>> validators)
    : ICommand(nullptr, output, state, validators) {}

// Handle function: processes the recommend command.
void GetCommand::handle() {
    // Iterate over each validator in the validators collection.
    for (auto& validator : validators) {
        // Call the validate method on the current validator, passing the current object (*this).
        auto result = validator->validate(*this);
        // Check if the validation result indicates failure.
        if (!result.isValid) {
            // Display the validation failure output using the output object.
            output->displayOutput(result.validationResultOutput);
             // Exit the function as validation failed.
            return;
        }
    }

    // Input handling of the arguments.
    int userID, movieID;
    try {
        userID = std::stoi(arguments[0]);
        movieID = std::stoi(arguments[1]);
    } catch (const std::exception&) {
        output->displayOutput("Invalid arguments.\n");
        return;
    }

    // Check if the user exists in state.users (the user list).
    auto currentUser = std::find_if(state.users.begin(), state.users.end(),
                                    [userID](const User& u) { return u.id == userID; });

    if (currentUser == state.users.end()) {
        output->displayOutput("User not found.\n");
        return;
    }

    // Step 1: Calculate similarity scores for other users.
    std::map<int, int> similarity;
    for (const auto& user : state.users) {
        if (user.id == userID) continue;
        int commonMovies = 0;
        for (const auto& movie : user.movies) {
            if (std::find(currentUser->movies.begin(), currentUser->movies.end(), movie) != currentUser->movies.end()) {
                ++commonMovies;
            }
        }
        if (commonMovies > 0) {
            similarity[user.id] = commonMovies;
        }
    }

    // Step 2: Find relevant movie recommendations.
    std::map<int, int> movieRelevance;
    for (const auto& [otherUserId, score] : similarity) {
        auto otherUser = std::find_if(state.users.begin(), state.users.end(),
                                      [otherUserId](const User& u) { return u.id == otherUserId; });
        if (std::find(otherUser->movies.begin(), otherUser->movies.end(), movieID) != otherUser->movies.end()) {
            for (const auto& movie : otherUser->movies) {
                if (movie != movieID &&
                    std::find(currentUser->movies.begin(), currentUser->movies.end(), movie) == currentUser->movies.end()) {
                    movieRelevance[movie] += score;
                }
            }
        }
    }

    // Step 3: Sort recommendations by relevance and movie ID.
    std::vector<std::pair<int, int>> sortedMovies;
    for (const auto& [movie, relevance] : movieRelevance) {
        sortedMovies.emplace_back(movie, relevance);
    }
    std::sort(sortedMovies.begin(), sortedMovies.end(), [](const auto& a, const auto& b) {
        if (a.second != b.second) {
            return a.second > b.second;
        }
        return a.first < b.first;
    });

    // Step 4: Display up to 10 recommendations.
    std::ostringstream outputStream;
    outputStream << "200 OK\n\n"; // Add "200 OK" with two newlines

    int count = 0;
    for (const auto& [movie, relevance] : sortedMovies) {
        outputStream << movie << " ";
        if (++count == 10) break;
    }

    if (count > 0) {
        outputStream << "\n\n"; // Add two newlines at the end
    } else {
    }

    // Display the concatenated output
    output->displayOutput(outputStream.str());
}
