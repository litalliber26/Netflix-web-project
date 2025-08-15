#include "server.h"
#include "ThreadPool.h"  // Include the ThreadPool header
#include <iostream>
#include <stdexcept>
#include <unistd.h>
#include <netinet/in.h>

// Constructor
Server::Server(int port, State& state, std::shared_ptr<ISaver> saver)
    : port(port), isRunning(false), state_(state), saver_(std::move(saver)), threadPool(std::thread::hardware_concurrency() * 2) {}

// Listen for commands from the client
void Server::startListening(TCPSocketInput input, ConsoleInputParser inputParser, std::shared_ptr<TCPSocketOutput> output) {
    try {
        while (true) {
            std::string receivedData = input.getInput();

            if (receivedData.empty()) {
                break;
            }

            try {
                std::shared_ptr<ICommand> command = inputParser.parse(receivedData);
                command->handle();
            } catch (const std::exception& e) {
            }
        }
    } catch (const std::exception& e) {
    }
}

// Start the server
void Server::start() {
    isRunning = true;
    int serverSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (serverSocket == -1) {
        return;
    }

    sockaddr_in serverAddress{};
    serverAddress.sin_family = AF_INET;
    serverAddress.sin_addr.s_addr = INADDR_ANY;
    serverAddress.sin_port = htons(port);

    if (bind(serverSocket, (struct sockaddr*)&serverAddress, sizeof(serverAddress)) == -1) {
        close(serverSocket);
        return;
    }

    if (listen(serverSocket, SOMAXCONN) == -1) {
        close(serverSocket);
        return;
    }

    try {
        while (isRunning) {
            sockaddr_in clientAddress;
            socklen_t clientAddressLen = sizeof(clientAddress);
            int clientSocket = accept(serverSocket, (struct sockaddr*)&clientAddress, &clientAddressLen);

            if (clientSocket == -1) {
                continue;
            }

            // Enqueue the client handling task in the Thread Pool
            threadPool.enqueue([this, clientSocket]() {
                handleClient(clientSocket);
            });
        }
    } catch (...) {
    }

    close(serverSocket);
}

// Handle client connection
void Server::handleClient(int clientSocket) {
    try {
        TCPSocketInput clientInput(clientSocket);
        std::shared_ptr<TCPSocketOutput> clientOutput = std::make_shared<TCPSocketOutput>(clientSocket);
        ConsoleInputParser inputParser(state_, saver_, clientOutput);

        startListening(clientInput, inputParser, clientOutput);
    } catch (...) {
    }

    close(clientSocket);
}

// Stop the server
void Server::stop() {
    isRunning = false;
    threadPool.~ThreadPool(); // Explicitly stop the Thread Pool
}

// Destructor
Server::~Server() {
    stop(); // Ensure cleanup
}
