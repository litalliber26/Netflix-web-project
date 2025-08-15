//
// Created by Gili on 21/11/2024.
//

#ifndef AP_EX1_IOUTPUT_H
#define AP_EX1_IOUTPUT_H


#include <string>

class IOutput {
public:
    // Pure virtual function for sending output
    virtual void displayOutput(const std::string& message) const = 0;

    // Virtual destructor for proper cleanup
    virtual ~IOutput() {}
};


#endif //AP_EX1_IOUTPUT_H
