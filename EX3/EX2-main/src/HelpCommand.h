//
// Created by Lital on 23/11/2024.
//

#ifndef HELP_COMMAND_H 
#define HELP_COMMAND_H

#include "ICommand.h" 
#include "IOutput.h"  
#include <memory>     

// HelpCommand class inherits from ICommand.
class HelpCommand : public ICommand {
public:
    // Constructor of HelpCommand.
    HelpCommand(std::shared_ptr<IOutput> output, State& state,
                std::vector<std::shared_ptr<IValidator>> validators);

    // Override the handle function to implement the help function.
    void handle() override;

private:
    // Shared pointer to an output class, used for output operations.
    std::shared_ptr<IOutput> output;
};

#endif // HELP_COMMAND_H
