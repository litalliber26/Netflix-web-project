#ifndef AP_EX1_STATE_H
#define AP_EX1_STATE_H
#include <vector>
#include <string>
#include <map>
#include <algorithm>

// Object representing an individual user with an ID and a vector of movies ids.
struct User {
    int id;
    std::vector<int> movies;
};

// The state object containing a vector of users and command information.
struct State {
    // List of users in the system.
    std::vector<User> users;

    // Map to store commands and their descriptions.
    std::map<std::string, std::string> commands = {
        {"POST", "POST, arguments: [userid] [movieid1] [movieid2] ..."},
        {"PATCH", "PATCH, arguments: [userid] [movieid1] [movieid2] ..."},
        {"GET", "GET, arguments: [userid] [movieid]"},
        {"DELETE", "DELETE, arguments: [userid] [movieid1] [movieid2] ..."},
        {"help", "help"}
    };

    // Sorted list of commands.
    std::vector<std::pair<std::string, std::string>> sortedCommands;

    // Constructor to initialize and sort commands.
    State() {
        // Initialize and sort commands.
        sortedCommands = std::vector<std::pair<std::string, std::string>>(commands.begin(), commands.end());
        std::sort(sortedCommands.begin(), sortedCommands.end(), [](const auto& a, const auto& b) {
            if (a.first == "help") return false;     // "help" always last.
            if (b.first == "help") return true;
            return a.first < b.first;               // Default alphabetical order.
        });
    }
};

#endif //AP_EX1_STATE_H
