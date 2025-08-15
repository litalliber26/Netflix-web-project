//
// Created by Gili on 21/11/2024.
//

#include "ConsoleInput.h"
#include <iostream>

std::string ConsoleInput::getInput() const {
    std::string input;
    std::getline(std::cin, input);
    return input;
}