//
// Created by Gili on 22/11/2024.
//

#ifndef AP_EX1_FILELOADER_H
#define AP_EX1_FILELOADER_H


#include <string>
#include "ILoader.h"

class FileLoader : public ILoader {
public:
    // Constructor to specify the file name.
    FileLoader(const std::string& fileName);
    // Load the state from the file.
    // @return A string containing the loaded data.
    State loadState() override;

private:
    std::string fileName_; // The file name for saving/loading state.
};


#endif //AP_EX1_FILELOADER_H
