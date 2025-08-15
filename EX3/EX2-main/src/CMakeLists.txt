cmake_minimum_required(VERSION 3.22)
project(AP_EX2)

# Set C++ standard to 20
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(AP_EX2 main.cpp IInput.h ConsoleInput.cpp ConsoleInput.h
        IOutput.h ConsoleOutput.cpp ConsoleOutput.h ISaver.h FileSaver.cpp
        FileSaver.h ILoader.h FileLoader.cpp FileLoader.h state.h ICommand.h
        IInputParser.h ConsoleInputParser.cpp ConsoleInputParser.h AddCommand.cpp
        AddCommand.h HelpCommand.cpp HelpCommand.h GetCommand.cpp
        GetCommand.h IValidator.h IsUserNotExistsValidator.cpp
        CheckIfTheUserExistsValidator.cpp CheckIfTheUserExistsValidator.h        
        IsUserNotExistsValidator.h AreAllArgumentNumbersValidator.cpp 
	      AreAllArgumentNumbersValidator.h CheckTwoArgumentsValidator.cpp 
              CheckTwoArgumentsValidator.h CheckNoArgumentsValidator.h
	      CheckNoArgumentsValidator.cpp CheckIfTheMovieExistsInUserMoviesValidator.cpp
        CheckIfTheMovieExistsInMoviesValidator.cpp DeleteCommand.cpp 
        CheckIfTheMovieExistsInMoviesValidator.h
        DeleteCommand.h CheckIfTheMovieExistsInUserMoviesValidator.h server.cpp server.h 
        TCPSocketInput.cpp TCPSocketInput.h TCPSocketOutput.cpp TCPSocketOutput.h networkUtils.h
        IsMovieNotExistsInUserMoviesValidator.cpp IsMovieNotExistsInUserMoviesValidator.h
        ThreadPool.cpp ThreadPool.h)

target_link_libraries(AP_EX2 PRIVATE pthread)
