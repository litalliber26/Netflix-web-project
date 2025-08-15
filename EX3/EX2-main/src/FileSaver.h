//
// Created by Gili on 22/11/2024.
//

#ifndef AP_EX1_FILESAVER_H
#define AP_EX1_FILESAVER_H


#include <string>
#include "ISaver.h"

class FileSaver : public ISaver {
public:
    // Constructor to specify the file name.
    FileSaver(const std::string& fileName);

    // Save the state object to the file.
    void saveState(const State& state) override;

private:
    std::string fileName_; // The file name for saving/loading state.
};


#endif //AP_EX1_FILESAVER_H
