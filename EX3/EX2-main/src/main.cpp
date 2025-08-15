#include <iostream>
#include <string>
#include "ConsoleInputParser.h"
#include "FileLoader.h"
#include "FileSaver.h"
#include "ConsoleOutput.h"
#include "IInput.h"
#include "ConsoleInput.h"
#include "server.h"

const std::string dataFile = "../data/movies_data.txt";

int main(int argc, char* argv[]) {
    if (argc < 2) {
        return 1;
    }
    int port;
    try {
        port = std::stoi(argv[1]);
        if (port <= 0) {
            return 1;
        }
    } catch (const std::exception& e) {
        return 1;
    }

    State state;

    // Load existing data using FileLoader
    try {
        std::shared_ptr<ILoader> loader = std::make_shared<FileLoader>(dataFile);
        state = loader->loadState();
    } catch (const std::ios_base::failure&) {
        // If the file doesn't exist or cannot be read, start with an empty state
    }

    std::shared_ptr<ISaver> saver = std::make_shared<FileSaver>(dataFile);
    std::shared_ptr<IOutput> output = std::make_shared<TCPSocketOutput>(port);
    Server server = Server(port, state, saver);
    server.start();
    return 0;
}
