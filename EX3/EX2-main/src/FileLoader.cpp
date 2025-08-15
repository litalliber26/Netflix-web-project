//
// Created by Gili on 22/11/2024.
//

#include <fstream>
#include "FileLoader.h"

FileLoader::FileLoader(const std::string& fileName) : fileName_(fileName) {}

// Load the state from the specified file.
State FileLoader::loadState() {
    std::ifstream inFile(fileName_); // Open the file for reading.
    if (!inFile) {
        throw std::ios_base::failure("Failed to open file for reading: " + fileName_);
    }

    State state;

    // Read the number of users.
    size_t numItems;
    inFile >> numItems;

    // Read each User.
    for (size_t i = 0; i < numItems; ++i) {
        User user;
        inFile >> user.id; // Read the ID.

        size_t numValues;
        inFile >> numValues; // Read the number of values.

        user.movies.resize(numValues);
        for (size_t j = 0; j < numValues; ++j) {
            inFile >> user.movies[j]; // Read the values.
        }

        state.users.push_back(user);
    }

    inFile.close();
    return state;
}