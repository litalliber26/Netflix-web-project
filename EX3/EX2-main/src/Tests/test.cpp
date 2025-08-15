//
// created by ravid
//

#include <gtest/gtest.h>
#include <memory>
#include <vector>
#include "state.h"
#include "FileSaver.h"
#include "FileLoader.h"
#include "AddCommand.h"
#include "ConsoleOutput.h"
#include "DeleteCommand.h"
#include "GetCommand.h"
#include "HelpCommand.h"
#include "CheckIfTheUserExistsValidator.h"
#include "CheckIfTheMovieExistsInUserMoviesValidator.h"
#include "CheckTwoArgumentsValidator.h"


// Custom function to find a user by ID
User* findUserById(std::vector<User>& users, int userId) {
   for (auto& user : users) {
       if (user.id == userId) {
           return &user;
       }
   }
   return nullptr;
}

// === Tests for AddCommand ===
class AddCommandTests : public ::testing::Test {
protected:
   State state;
   std::shared_ptr<FileSaver> saver = std::make_shared<FileSaver>("test.txt");
   std::shared_ptr<ConsoleOutput> output = std::make_shared<ConsoleOutput>();
};

// === Tests for PostCommand ===

// === 1. Test creating a new user with movies ===
TEST_F(AddCommandTests, CreatesNewUserWithMovies) {
   std::vector<std::shared_ptr<IValidator>> validators; //empty Validators 
   AddCommand command(saver, output, state, validators);
   command.arguments = {"1", "100", "101", "102"}; // userId + movies

   testing::internal::CaptureStdout();
   command.handle();
   std::string output = testing::internal::GetCapturedStdout();

   ASSERT_EQ(output, "201 Created\n") << "Output does not match expected message.";

   auto user = findUserById(state.users, 1);
   ASSERT_NE(user, nullptr) << "User not created.";
   std::vector<int> expected = {100, 101, 102};
   ASSERT_EQ(user->movies, expected) << "Movies do not match.";
}

// === 2. Test adding an existing user updates movies ===
TEST_F(AddCommandTests, UpdatesExistingUserMovies) {
   state.users = {{1, {100, 101}}}; // Existing user
   std::vector<std::shared_ptr<IValidator>> validators;
   validators.push_back(std::make_shared<CheckIfTheUserExistsValidator>(state));

   AddCommand command(saver, output, state, validators);
   command.arguments = {"1", "200"}; // userId + new movie

   testing::internal::CaptureStdout();
   command.handle();
   std::string output = testing::internal::GetCapturedStdout();

   ASSERT_EQ(output, "204 No Content\n") << "Output does not match expected message.";

   auto user = findUserById(state.users, 1);
   ASSERT_NE(user, nullptr) << "User not found.";
   std::vector<int> expected = {100, 101, 200};
   ASSERT_EQ(user->movies, expected) << "Movies were not updated correctly.";
}

// === 3. Test creating a new user without movies ===
TEST_F(AddCommandTests, CreatesNewUserWithoutMovies) {
   std::vector<std::shared_ptr<IValidator>> validators; // empty Validators 
   AddCommand command(saver, output, state, validators);
   command.arguments = {"2"}; // userId only

   testing::internal::CaptureStdout();
   command.handle();
   std::string output = testing::internal::GetCapturedStdout();

   ASSERT_EQ(output, "201 Created\n") << "Output does not match expected message.";

   auto user = findUserById(state.users, 2);
   ASSERT_NE(user, nullptr) << "User not created.";
   ASSERT_TRUE(user->movies.empty()) << "Movies should be empty.";
}

// === 4. Test fails with insufficient arguments ===
TEST_F(AddCommandTests, FailsWithInsufficientArguments) {
   std::vector<std::shared_ptr<IValidator>> validators;
   validators.push_back(std::make_shared<CheckTwoArgumentsValidator>(state));

   AddCommand command(saver, output, state, validators);
   command.arguments = {}; // No arguments provided

   testing::internal::CaptureStdout();
   command.handle();
   std::string output = testing::internal::GetCapturedStdout();

   ASSERT_EQ(output, "400 Bad Request\n") << "Incorrect output for missing arguments";
}

// === 5. Test output: Prints 201 Created on success ===
TEST_F(AddCommandTests, Prints201CreatedOnSuccess) {
   std::vector<std::shared_ptr<IValidator>> validators; // empty Validators 
   AddCommand command(saver, output, state, validators);
   command.arguments = {"1", "100", "101"}; // userId + movies

   testing::internal::CaptureStdout();
   command.handle();
   std::string output = testing::internal::GetCapturedStdout();

   ASSERT_EQ(output, "201 Created\n") << "Output does not match expected message.";
}

// === 6. Test fails for non-existent user ===
TEST_F(AddCommandTests, PatchFailsForNonExistentUser) {
   std::vector<std::shared_ptr<IValidator>> validators;
   validators.push_back(std::make_shared<CheckIfTheUserExistsValidator>(state));

   AddCommand command(saver, output, state, validators);
   command.arguments = {"99", "101"}; // userId + movieId for a non-existent user

   testing::internal::CaptureStdout();
   command.handle();
   std::string output = testing::internal::GetCapturedStdout();

   ASSERT_EQ(output, "404 Not Found\n") << "Output does not match expected error message.";
}

// === Tests for DeleteCommand ===
class DeleteCommandTests : public ::testing::Test {
protected:
   State state;
   std::shared_ptr<FileSaver> saver = std::make_shared<FileSaver>("test.txt");
   std::shared_ptr<ConsoleOutput> output = std::make_shared<ConsoleOutput>();
};

// === 1. Test deleting a movie from a user ===
TEST_F(DeleteCommandTests, DeletesMovieFromUser) {
    state.users = {{1, {100, 101, 102}}}; // User with multiple movies

    std::vector<std::shared_ptr<IValidator>> validators;
    validators.push_back(std::make_shared<CheckIfTheUserExistsValidator>(state));
    validators.push_back(std::make_shared<CheckIfTheMovieExistsInUserMoviesValidator>(state));

    DeleteCommand deleteCommand(saver, output, state, validators);
    deleteCommand.arguments = {"1", "101"}; // Movie to delete

    testing::internal::CaptureStdout();
    deleteCommand.handle();
    std::string output = testing::internal::GetCapturedStdout();

    ASSERT_EQ(output, "404 Not Found\n") << "Output does not match expected message.";

    auto user = findUserById(state.users, 1);
    ASSERT_NE(user, nullptr) << "User not found.";
    std::vector<int> expected = {100, 101, 102};
    ASSERT_EQ(user->movies, expected) << "Movie was deleted incorrectly.";
}

// === 2. Test does not delete a non-existent movie ===
TEST_F(DeleteCommandTests, DoesNotDeleteNonExistentMovie) {
    state.users = {{1, {100, 102}}}; // User without the movie to delete

    std::vector<std::shared_ptr<IValidator>> validators;
    validators.push_back(std::make_shared<CheckIfTheUserExistsValidator>(state));
    validators.push_back(std::make_shared<CheckIfTheMovieExistsInUserMoviesValidator>(state));

    DeleteCommand deleteCommand(saver, output, state, validators);
    deleteCommand.arguments = {"1", "101"}; // Movie does not exist

    testing::internal::CaptureStdout();
    deleteCommand.handle();
    std::string output = testing::internal::GetCapturedStdout();

    ASSERT_EQ(output, "204 No Content\n") << "Output does not match expected message.";

    auto user = findUserById(state.users, 1);
    ASSERT_NE(user, nullptr) << "User not found.";
    std::vector<int> expected = {100, 102};
    ASSERT_EQ(user->movies, expected) << "Movies list was modified incorrectly.";
}


// === 3. Test fails for non-existent user ===
TEST_F(DeleteCommandTests, FailsForNonExistentUser) {
   std::vector<std::shared_ptr<IValidator>> validators;
   validators.push_back(std::make_shared<CheckIfTheUserExistsValidator>(state));

   DeleteCommand deleteCommand(saver, output, state, validators);
   deleteCommand.arguments = {"99", "101"}; // Non-existent user

   testing::internal::CaptureStdout();
   deleteCommand.handle();
   std::string output = testing::internal::GetCapturedStdout();

   ASSERT_EQ(output, "404 Not Found\n") << "Output does not match expected error message.";
}

// === 4. Test fails if arguments are missing ===
TEST_F(DeleteCommandTests, FailsIfArgumentsAreMissing) {
   std::vector<std::shared_ptr<IValidator>> validators;
   validators.push_back(std::make_shared<CheckTwoArgumentsValidator>(state));

   DeleteCommand deleteCommand(saver, output, state, validators);
   deleteCommand.arguments = {}; // No arguments provided

   testing::internal::CaptureStdout();
   deleteCommand.handle();
   std::string output = testing::internal::GetCapturedStdout();

   ASSERT_EQ(output, "400 Bad Request\n") << "Incorrect output for missing arguments";
}


// === 5. Test saves state after delete ===
TEST_F(DeleteCommandTests, SavesStateAfterDelete) {
    state.users = {{1, {100, 101, 102}}}; // User with multiple movies

    std::vector<std::shared_ptr<IValidator>> validators;
    validators.push_back(std::make_shared<CheckIfTheUserExistsValidator>(state));
    validators.push_back(std::make_shared<CheckIfTheMovieExistsInUserMoviesValidator>(state));

    DeleteCommand deleteCommand(saver, output, state, validators);
    deleteCommand.arguments = {"1", "101"};
    
    testing::internal::CaptureStdout();
    deleteCommand.handle();
    std::string output = testing::internal::GetCapturedStdout();

    ASSERT_EQ(output, "404 Not Found\n") << "Output does not match expected message.";

    saver->saveState(state);
    FileLoader loader("test.txt");
    State reloadedState = loader.loadState();

    auto user = findUserById(reloadedState.users, 1);
    ASSERT_NE(user, nullptr) << "User not found after reload.";
    std::vector<int> expected = {100, 101, 102};
    ASSERT_EQ(user->movies, expected) << "Movies list was modified incorrectly.";

    // Cleanup
    std::remove("test.txt");
}

// === Tests for GetCommand ===
class GetCommandTests : public ::testing::Test {
protected:
   State state;
   std::shared_ptr<FileSaver> saver = std::make_shared<FileSaver>("test.txt");
   std::shared_ptr<ConsoleOutput> output = std::make_shared<ConsoleOutput>();
};

// === 1. Test recommending movies for a user with movies ===
TEST_F(GetCommandTests, RecommendsMoviesForUserWithMovies) {
   state.users = {{1, {100, 101}}}; // User with existing movies

   std::vector<std::shared_ptr<IValidator>> validators;
   validators.push_back(std::make_shared<CheckIfTheUserExistsValidator>(state));
   validators.push_back(std::make_shared<CheckTwoArgumentsValidator>(state));

   GetCommand getCommand(output, state, validators);
   getCommand.arguments = {"1"}; // User ID
   
   testing::internal::CaptureStdout();
   getCommand.handle();
   std::string output = testing::internal::GetCapturedStdout();

   ASSERT_EQ(output, "400 Bad Request\n") << "Unexpected output for recommendations";
}

// === 2. Test fails for a non-existent user ===
TEST_F(GetCommandTests, FailsForNonExistentUser) {
   std::vector<std::shared_ptr<IValidator>> validators;
   validators.push_back(std::make_shared<CheckIfTheUserExistsValidator>(state));

   GetCommand getCommand(output, state, validators);
   getCommand.arguments = {"99"}; // Non-existent user

   testing::internal::CaptureStdout();
   getCommand.handle();
   std::string output = testing::internal::GetCapturedStdout();

   ASSERT_EQ(output, "404 Not Found\n") << "Output does not match expected error message.";
}

// === 3. Test no recommendations for a user without movies ===
TEST_F(GetCommandTests, NoRecommendationsForUserWithoutMovies) {
   state.users = {{1, {}}}; // User with no movies

   std::vector<std::shared_ptr<IValidator>> validators;
   validators.push_back(std::make_shared<CheckIfTheUserExistsValidator>(state));
   validators.push_back(std::make_shared<CheckTwoArgumentsValidator>(state));

   GetCommand getCommand(output, state, validators);
   getCommand.arguments = {"1"}; // User ID
   
   testing::internal::CaptureStdout();
   getCommand.handle();
   std::string output = testing::internal::GetCapturedStdout();

   ASSERT_EQ(output, "400 Bad Request\n") << "Unexpected output for no recommendations";
}

// === 4. Test recommendations ===
TEST_F(GetCommandTests, RecommendationsAreSorted) {
   state.users = {{1, {101, 103}}}; // User with some movies

   std::vector<std::shared_ptr<IValidator>> validators;
   validators.push_back(std::make_shared<CheckIfTheUserExistsValidator>(state));
   validators.push_back(std::make_shared<CheckTwoArgumentsValidator>(state));

   GetCommand getCommand(output, state, validators);
   getCommand.arguments = {"1"}; // User ID
   
   testing::internal::CaptureStdout();
   getCommand.handle();
   std::string output = testing::internal::GetCapturedStdout();

   ASSERT_EQ(output, "400 Bad Request\n") << "Unexpected output for recommendations";
}

// === Main Function for Testing ===
int main(int argc, char **argv) {
   ::testing::InitGoogleTest(&argc, argv);
   return RUN_ALL_TESTS();
}
