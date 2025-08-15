//
// Created by Gili on 22/11/2024.
//

#ifndef AP_EX1_ISAVER_H
#define AP_EX1_ISAVER_H


#include <string>
#include "state.h"

class ISaver {
public:
    virtual ~ISaver() = default;
    // Save the state object to the storage medium.
    virtual void saveState(const State& state) = 0;

};


#endif //AP_EX1_ISAVER_H
