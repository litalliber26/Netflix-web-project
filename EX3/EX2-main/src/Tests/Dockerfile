FROM gcc:latest

# Install required dependencies
RUN apt-get update && apt-get install -y cmake git wget unzip

# Set the working directory
WORKDIR /usr/src/ex2

# Copy all project files
COPY . .

# Fix State.h case sensitivity
RUN ln -s /usr/src/ex2/state.h /usr/src/ex2/State.h

# Navigate to Tests directory and build
WORKDIR Tests
RUN mkdir -p build
WORKDIR build

# Configure CMake with additional flags for debugging
RUN VERBOSE=1 cmake -DCMAKE_CXX_FLAGS="-v -I/usr/src/ex2" .. && \
    VERBOSE=1 make

# Run the tests binary as the default command
CMD ["./tests"]
