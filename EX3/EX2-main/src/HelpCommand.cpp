//
// Created by Lital on 23/11/2024.
//

#include "HelpCommand.h"
#include <algorithm>
#include <sstream> // For use in concatenated string construction

// Constructor of HelpCommand.
HelpCommand::HelpCommand(std::shared_ptr<IOutput> output, State& state,
                         std::vector<std::shared_ptr<IValidator>> validators)
    : ICommand(nullptr, output, state, validators), // Passes the output to ICommand.
      output(std::move(output)) {}              // Stores the output in a private member.

// handle function: displays the help menu using IOutput.
void HelpCommand::handle() {
    // Validate the command arguments using validators.
    for (auto& validator : validators) {
        auto result = validator->validate(*this);
        if (!result.isValid) {
            output->displayOutput(result.validationResultOutput);
            return;
        }
    }

    // Create a single concatenated string with precise formatting
    std::ostringstream responseStream;

    // Add "200 OK" and two newlines
    responseStream << "200 OK\n\n";

    // Append sorted commands
    for (const auto& [command, description] : state.sortedCommands) {
        responseStream << description << "\n"; // Add newline after each command
    }

    // Send the output
    output->displayOutput(responseStream.str()); // Print the concatenated commands
}
