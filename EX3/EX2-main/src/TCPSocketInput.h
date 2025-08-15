//
// Created by Ravid on 13/12/2024
//

#ifndef TCPSOCKETINPUT_H
#define TCPSOCKETINPUT_H

#include "IInput.h"
#include "IInputParser.h"
#include "TCPSocketOutput.h"
#include <string>
#include <netinet/in.h> 
#include <stdexcept>    
#include <unistd.h>     
#include <memory>       

class TCPSocketInput : public IInput {
private:
    int clientSocket;  // Client socket for communication
    static constexpr size_t BUFFER_SIZE = 1024; // Buffer size for reading data

    // Utility function to close sockets safely
    void closeSocket(int& socket);

public:
    // Constructor
    explicit TCPSocketInput(int clientSocket);

    // Reads data from the client socket
    std::string getInput() const override;

    // Destructor
    ~TCPSocketInput() override;
};

#endif // TCPSOCKETINPUT_H
