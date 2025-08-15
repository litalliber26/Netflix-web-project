#ifndef SERVER_H
#define SERVER_H

#include "TCPSocketInput.h"
#include "TCPSocketOutput.h"
#include "ConsoleInputParser.h"
#include "ThreadPool.h"  // Include the ThreadPool header
#include <memory>
#include <atomic>

class Server {
public:
    Server(int port, State& state, std::shared_ptr<ISaver> saver);
    ~Server();

    void start();
    void stop();

private:
    void handleClient(int clientSocket);
    void startListening(TCPSocketInput input, ConsoleInputParser inputParser, std::shared_ptr<TCPSocketOutput> output);
    int port;
    std::atomic<bool> isRunning;            // Indicates whether the server is running
    ThreadPool threadPool;                  // Thread Pool for managing tasks
    State& state_;
    std::shared_ptr<ISaver> saver_;
};

#endif // SERVER_H
