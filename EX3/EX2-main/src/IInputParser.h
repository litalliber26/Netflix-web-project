//
// Created by Gili on 22/11/2024.
//

#ifndef AP_EX1_IINPUTPARSER_H
#define AP_EX1_IINPUTPARSER_H
#include <string>
#include <memory>
#include "ICommand.h"

class IInputParser {
public:
    virtual ~IInputParser() = default;

    // Pure virtual function to parse input and return an ICommand
    virtual std::shared_ptr<ICommand> parse(const std::string& input) = 0;
};
#endif //AP_EX1_IINPUTPARSER_H
