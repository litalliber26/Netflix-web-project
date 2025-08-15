cmake_minimum_required(VERSION 3.23)
project(AP_EX2)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_VERBOSE_MAKEFILE ON)

# Add parent directory to includes BEFORE other includes
include_directories(BEFORE
    ${CMAKE_CURRENT_SOURCE_DIR}/..
    ${CMAKE_CURRENT_SOURCE_DIR}
)

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

add_executable(tests
    test.cpp
    ../FileSaver.cpp
    ../FileLoader.cpp
    ../AddCommand.cpp
    ../ConsoleOutput.cpp
    ../DeleteCommand.cpp
    ../GetCommand.cpp
    ../HelpCommand.cpp
    ../CheckIfTheUserExistsValidator.cpp
    ../CheckIfTheMovieExistsInUserMoviesValidator.cpp
    ../CheckTwoArgumentsValidator.cpp
)

# Add include paths with BEFORE to ensure they're checked first
target_include_directories(tests BEFORE PRIVATE 
    ${CMAKE_CURRENT_SOURCE_DIR}/..
)

target_link_libraries(tests gtest gtest_main pthread)
