//
// Created by Gili on 22/11/2024.
//

#ifndef AP_EX1_ILOADER_H
#define AP_EX1_ILOADER_H


#include <string>
#include "state.h"

class ILoader {
public:
    virtual ~ILoader() = default;

    // Load the state from the storage medium.
    // @return The loaded data.
    virtual State loadState() = 0;
};


#endif //AP_EX1_ILOADER_H
