//
// Created by Ravid on 13/12/2024
//

#include "TCPSocketOutput.h"
#include <iostream>
#include "networkUtils.h"

// Helper function to close the socket safely
void TCPSocketOutput::closeSocket() {
    if (clientSocket != -1) {
        if (close(clientSocket) == -1) {
            // Log or handle close error if necessary
        }
        clientSocket = -1;
    }
}

// Constructor
TCPSocketOutput::TCPSocketOutput(int socket) : clientSocket(socket) {
    if (clientSocket <= 0) {
      // invalid_argument
    }
}

// Implement displayOutput
void TCPSocketOutput::displayOutput(const std::string& message) const {
    std::string messageWithSuffix = message + "\n";  
    size_t messageSize = messageWithSuffix.size();

    // Send the size of the message as a 4-byte header
    uint32_t messageSizeNetworkOrder = NetworkUtils::htonl(static_cast<uint32_t>(messageSize)); // Convert to network byte order
    ssize_t bytesSent = send(clientSocket, &messageSizeNetworkOrder, sizeof(messageSizeNetworkOrder), 0);     
    if (bytesSent != sizeof(messageSizeNetworkOrder)) { 
               // runtime_error
                }

    size_t totalSent = 0;
    while (totalSent < messageSize) {
        ssize_t bytesSent = send(clientSocket, messageWithSuffix.c_str() + totalSent, messageSize - totalSent, 0);
        if (bytesSent == -1) {
           // Failed to send message to client
        }
        totalSent += static_cast<size_t>(bytesSent);
    }
    
}


// Destructor
TCPSocketOutput::~TCPSocketOutput() {
    closeSocket();
}