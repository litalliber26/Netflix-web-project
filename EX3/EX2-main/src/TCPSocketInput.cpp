//
// Created by Ravid on 13/12/2024
//

#include "TCPSocketInput.h"
#include <sys/socket.h> 
#include <cstring>      
#include <stdexcept>    
#include <iostream>

// Utility function to close sockets safely
void TCPSocketInput::closeSocket(int& socket) {
    if (socket != -1) {
        close(socket);
        socket = -1;
    }
}

// Constructor
TCPSocketInput::TCPSocketInput(int clientSocket)
    : clientSocket(clientSocket) {
    if (clientSocket == -1) {
       // invalid_argument
    }
}

// Reads data from the client socket
std::string TCPSocketInput::getInput() const {
    char buffer[BUFFER_SIZE] = {0};
    ssize_t bytesReceived = recv(clientSocket, buffer, sizeof(buffer) - 1, 0);
    if (bytesReceived == -1) {
      //runtime_error
    }

    if (bytesReceived == 0) {
       // 400 Bad Request
    }
    buffer[bytesReceived] = '\0'; // Null-terminate the string
    return std::string(buffer);
    
}

// Destructor
TCPSocketInput::~TCPSocketInput() {
    closeSocket(clientSocket);
}
