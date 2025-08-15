//
// Created by Gili on 12/12/2024.
//

#ifndef AP_EX1_DELETECOMMAND_H
#define AP_EX1_DELETECOMMAND_H
#ifndef DELETE_COMMAND_H
#define DELETE_COMMAND_H

#include "ICommand.h"

class DeleteCommand : public ICommand {
public:
    // Constructor inheriting the ICommand interface
    DeleteCommand(std::shared_ptr<ISaver> saver, std::shared_ptr<IOutput> output,
                  State& state, std::vector<std::shared_ptr<IValidator>> validators);

    // Override the handle function
    void handle() override;
};

#endif // DELETE_COMMAND_H

#endif //AP_EX1_DELETECOMMAND_H
