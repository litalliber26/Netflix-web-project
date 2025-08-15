//
// Created by Lital on 23/11/2024.
//

#ifndef GET_COMMAND_H
#define GET_COMMAND_H

#include "ICommand.h"
#include "IOutput.h"
#include <memory>
#include <map>
#include <set>

class GetCommand : public ICommand {
public:
     // Constructor of GetCommand.
    GetCommand(std::shared_ptr<IOutput> output, State& state,
                     std::vector<std::shared_ptr<IValidator>> validators);

    // Override the handle function to process the recommendation.
    void handle() override;
};

#endif // GET_COMMAND_H
