//
// Created by Gili on 22/11/2024.
//

#include "ConsoleInputParser.h"
#include "AddCommand.h"
#include <sstream>
#include <stdexcept>
#include <algorithm>
#include <iterator>
#include "HelpCommand.h"
#include "GetCommand.h"
#include "CheckIfTheUserExistsValidator.h"
#include "IsUserNotExistsValidator.h"
#include "AreAllArgumentNumbersValidator.h"
#include "CheckIfTheMovieExistsInUserMoviesValidator.h"
#include "CheckNoArgumentsValidator.h"
#include "CheckTwoArgumentsValidator.h"
#include "DeleteCommand.h"
#include "CheckIfTheMovieExistsInMoviesValidator.h"
#include "IsMovieNotExistsInUserMoviesValidator.h"

ConsoleInputParser::ConsoleInputParser(State& state,
                                       std::shared_ptr<ISaver>
        saver, std::shared_ptr<IOutput> output) : state_(state), saver_(std::move(saver)), output_(std::move(output)) {
    // Register default commands
    registerCommand("POST", [this]() {
        std::vector<std::shared_ptr<IValidator>> validators;
        validators.emplace_back(std::make_shared<AreAllArgumentNumbersValidator>
                                        (state_));
        validators.emplace_back(std::make_shared<IsUserNotExistsValidator>
                (state_));
        return std::make_shared<AddCommand>(saver_, output_, state_, validators);
    });
    registerCommand("PATCH", [this]() {
        std::vector<std::shared_ptr<IValidator>> validators;
        validators.emplace_back(std::make_shared<AreAllArgumentNumbersValidator>
                                        (state_));
        validators.emplace_back(std::make_shared<CheckIfTheUserExistsValidator>(state_));
        return std::make_shared<AddCommand>(saver_, output_, state_, validators);
    });
    registerCommand("help", [this]() {
        std::vector<std::shared_ptr<IValidator>> validators;
        validators.emplace_back(std::make_shared<CheckNoArgumentsValidator>(state_));
        return std::make_shared<HelpCommand>(output_ , state_, validators);
    });
    registerCommand("GET", [this]() {
        std::vector<std::shared_ptr<IValidator>> validators;
        validators.emplace_back(std::make_shared<CheckTwoArgumentsValidator>(state_));
        validators.emplace_back(std::make_shared<AreAllArgumentNumbersValidator>(state_));
        validators.emplace_back(std::make_shared<IsMovieNotExistsInUserMoviesValidator>(state_));
        validators.emplace_back(std::make_shared<CheckIfTheUserExistsValidator>(state_));
        validators.emplace_back(std::make_shared<CheckIfTheMovieExistsInMoviesValidator>(state_));
        return std::make_shared<GetCommand>(output_ , state_, validators);
    });
    registerCommand("DELETE", [this]() {
        std::vector<std::shared_ptr<IValidator>> validators;
        validators.emplace_back(std::make_shared<CheckIfTheUserExistsValidator>(state_));
        validators.emplace_back(std::make_shared<CheckIfTheMovieExistsInUserMoviesValidator>(state_));
        return std::make_shared<DeleteCommand>(saver_, output_ , state_,
                                               validators);
    });
}

void ConsoleInputParser::registerCommand(const std::string& commandName,
                                         std::function<std::shared_ptr<ICommand>()> factory) {
    commandFactories[commandName] = std::move(factory);
}

std::shared_ptr<ICommand> ConsoleInputParser::parse(const std::string& input) {
    std::vector<std::string> tokens = tokenize(input);

    // First token is the command name, the rest are arguments
    std::string commandName = tokens[0];
    std::vector<std::string> arguments(tokens.begin() + 1, tokens.end());

    // Look for the command in the registry
    auto it = commandFactories.find(commandName);
    if (it == commandFactories.end()) {
        throw std::invalid_argument("Unknown command: " + commandName);
    }

    // Create the command object and set its arguments
    std::shared_ptr<ICommand> command = it->second();
    command->arguments = arguments;

    return command;
}

std::vector<std::string> ConsoleInputParser::tokenize(const std::string& input) {
    std::vector<std::string> tokens;
    std::istringstream stream(input);
    std::string token;

    while (std::getline(stream, token, ' ')) {
        // Trim and ignore empty tokens
        token.erase(0, token.find_first_not_of(' ')); // Trim leading spaces
        token.erase(token.find_last_not_of(' ') + 1); // Trim trailing spaces
        if (!token.empty()) {
            tokens.push_back(token);
        }
    }

    return tokens;
}