FROM gcc:latest

RUN apt-get update && apt-get install -y cmake

COPY . /program/ex2/src
WORKDIR /program/ex2

RUN mkdir data
RUN mkdir build
WORKDIR /program/ex2/build

RUN cmake ../src && make

# Set ENTRYPOINT to the executable
ENTRYPOINT ["./AP_EX2"]

# Set CMD to the default argument
CMD ["8080"]