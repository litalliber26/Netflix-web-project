//
// Created by Gili on 22/11/2024.
//

#ifndef AP_EX1_ICOMMAND_H
#define AP_EX1_ICOMMAND_H


#include <vector>
#include <string>
#include <memory>
#include "ISaver.h"
#include "IOutput.h"
#include "IValidator.h"

class ICommand {
public:
    // A vector of strings representing the arguments
    std::vector<std::string> arguments;

    // Constructor accepting ISaver, IOutput, and State objects
    ICommand(std::shared_ptr<ISaver> saver, std::shared_ptr<IOutput> output,
             State& state, std::vector<std::shared_ptr<IValidator>> validators)
            : saver(std::move(saver)), output(std::move(output)), state
            (state), validators(std::move(validators)) {}

    // Virtual destructor for safe polymorphic usage
    virtual ~ICommand() = default;

    // Pure virtual function to be implemented by derived classes
    virtual void handle() = 0;

protected:
    // Pointer to an ISaver object for command operations
    std::shared_ptr<ISaver> saver;

    // Pointer to an IOutput object
    std::shared_ptr<IOutput> output;

    // Reference to the State object
    State& state;

    // Vector of IValidator objects
    std::vector<std::shared_ptr<IValidator>> validators;
};
#endif //AP_EX1_ICOMMAND_H
