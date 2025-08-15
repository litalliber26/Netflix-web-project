//
// Created by Ravid on 13/12/2024
//

#ifndef TCPSOCKETOUTPUT_H
#define TCPSOCKETOUTPUT_H

#include "IOutput.h"
#include <string>
#include <stdexcept>    // For exceptions
#include <sys/socket.h> // For socket communication
#include <unistd.h>     // For close()

class TCPSocketOutput : public IOutput {
private:
    int clientSocket; // Socket descriptor for the client connection

    // Helper function to close the socket safely
    void closeSocket();

public:
    // Constructor: Initialize with an existing client socket
    explicit TCPSocketOutput(int socket);

    // Override displayOutput: Send messages to the client
    void displayOutput(const std::string& message) const override;

    // Destructor: Clean up the socket connection
    ~TCPSocketOutput() override;
};

#endif // TCPSOCKETOUTPUT_H
