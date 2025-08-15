//
// Created by Gili on 22/11/2024.
//

#include "FileSaver.h"
#include <fstream>
#include <stdexcept>

// Constructor to initialize the file name.
FileSaver::FileSaver(const std::string& fileName) : fileName_(fileName) {}

// Save the provided state object to the specified file.
void FileSaver::saveState(const State& state) {
    std::ofstream outFile(fileName_); // Open the file for writing.
    if (!outFile) {
        throw std::ios_base::failure("Failed to open file for writing: " + fileName_);
    }

    // Write the number of users.
    outFile << state.users.size() << "\n";

    // Write each User.
    for (const auto& user : state.users) {
        outFile << user.id << " ";                 // Write the ID.
        outFile << user.movies.size() << " ";     // Write the number of values.
        for (int value : user.movies) {
            outFile << value << " ";              // Write the values.
        }
        outFile << "\n"; // Newline after each User.
    }

    outFile.close();
}



