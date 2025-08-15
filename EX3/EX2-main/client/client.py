import socket
import sys
import struct

# Function to read a message from a socket according to a protocol that includes a message size followed by the message itself.
def recv_message(sock):
     # Read the first 4 bytes representing the message size.
    raw_size = sock.recv(4)
    if len(raw_size) < 4:
         # If less than 4 bytes were received, the connection was unexpectedly closed.
        raise ConnectionError("Connection closed while reading message size")
     # Convert the message size from binary format to an integer.
    message_size = struct.unpack('!I', raw_size)[0]
 
     # Read the message itself according to the determined size.
    message = b""
    while len(message) < message_size:
        # Read chunks of the message until the entire message is received.
        chunk = sock.recv(message_size - len(message))
        if not chunk:
            # If an empty chunk is received, the connection was unexpectedly closed.
            raise ConnectionError("Connection closed while reading message")
        message += chunk
    # Convert the message from binary to text (UTF-8).
    return message.decode('utf-8')
 

def main():
     # Check if two arguments were provided from the command line (IP address and port).
    if len(sys.argv) != 3:
        sys.exit(1)

     # Parse the server IP address and port from the provided arguments.
    server_ip = sys.argv[1]     
    try:         
        server_port = int(sys.argv[2])  
        # Check if the port number is within a valid range (1 to 65535).       
        if server_port <= 0 or server_port > 65535:             
            raise ValueError    
     # Exit the program in case of an error parsing the port.     
    except ValueError: 
        sys.exit(1)
 
     # Create a new socket for TCP communication.
    try:
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
     # Exit the program if socket creation fails.
    except socket.error:
        sys.exit(1)

    # Connect to the server at the specified IP address and port.
    try:
        client_socket.connect((server_ip, server_port))
     # Exit the program if connection to the server fails.        
    except socket.error:
        sys.exit(1)

    # Loop to handle user input and send it to the server.
    try:
        while True:
            try:
                # Send the command entered by the user to the server.
                command = input()
                client_socket.sendall(command.encode('utf-8'))

                # Read the server's response until the end of the message.
                response = recv_message(client_socket)
                # Split the response into lines and print each line separately.
                response_lines = response.strip().split("\n")
                for line in response_lines:
                    print(line)
            
            # Exit the loop if Ctrl+C is pressed.
            except KeyboardInterrupt:
                break
    # Close the socket when the program ends or in case of an error.
    finally:
        client_socket.close()
# The main entry point of the program.
if __name__ == "__main__":
    main()
