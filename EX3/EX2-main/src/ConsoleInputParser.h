//
// Created by Gili on 22/11/2024.
//

#ifndef AP_EX1_CONSOLEINPUTPARSER_H
#define AP_EX1_CONSOLEINPUTPARSER_H


#include <memory>
#include <functional>
#include <unordered_map>
#include "ICommand.h"
#include "IInputParser.h"

class ConsoleInputParser : public IInputParser {
public:
    ConsoleInputParser(State& state, std::shared_ptr<ISaver> saver,
                       std::shared_ptr<IOutput> output);

    std::shared_ptr<ICommand> parse(const std::string& input) override;

private:
    std::vector<std::string> tokenize(const std::string& input);

    // Map of command names to their respective factory functions
    std::unordered_map<std::string, std::function<std::shared_ptr<ICommand>()>> commandFactories;

    // Register a new command type
    void registerCommand(const std::string& commandName, std::function<std::shared_ptr<ICommand>()> factory);

    // Store references to the passed objects
    State& state_;
    std::shared_ptr<ISaver> saver_;
    std::shared_ptr<IOutput> output_;

};

#endif //AP_EX1_CONSOLEINPUTPARSER_H
