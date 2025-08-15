//
// Created by Gili on 21/11/2024.
//

#ifndef AP_EX1_CONSOLEINPUT_H
#define AP_EX1_CONSOLEINPUT_H


#include "IInput.h"

// Concrete implementation of IInput
class ConsoleInput : public IInput {
public:
    std::string getInput() const override;
};


#endif //AP_EX1_CONSOLEINPUT_H
