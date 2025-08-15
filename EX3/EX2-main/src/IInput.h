//
// Created by Gili on 21/11/2024.
//

#ifndef AP_EX1_IINPUT_H
#define AP_EX1_IINPUT_H


#include <string>

// Interface definition
class IInput {
public:
    // Pure virtual function for getting input
    virtual std::string getInput() const = 0;

    // Virtual destructor for proper cleanup
    virtual ~IInput() {}
};


#endif //AP_EX1_IINPUT_H
