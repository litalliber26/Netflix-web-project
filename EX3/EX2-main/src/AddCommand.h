//
// Created by Gili on 23/11/2024.
//

#ifndef AP_EX1_ADDCOMMAND_H
#define AP_EX1_ADDCOMMAND_H


#include "ICommand.h"

class AddCommand  : public ICommand {
public:
    AddCommand(std::shared_ptr<ISaver> saver, std::shared_ptr<IOutput>
            output, State& state,
               std::vector<std::shared_ptr<IValidator>> validators);
    void handle() override;

private:
        // Merge the user's movie list with a new list of movies
        void mergeMovieLists(std::vector<int>& userMovies, const std::vector<int>& newMovies);
};


#endif //AP_EX1_ADDCOMMAND_H
