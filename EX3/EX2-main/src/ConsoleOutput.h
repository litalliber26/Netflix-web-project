//
// Created by Gili on 21/11/2024.
//

#ifndef AP_EX1_CONSOLEOUTPUT_H
#define AP_EX1_CONSOLEOUTPUT_H


#include "IOutput.h"

class ConsoleOutput : public IOutput {
public:
    void displayOutput(const std::string& message) const override;
};


#endif //AP_EX1_CONSOLEOUTPUT_H
