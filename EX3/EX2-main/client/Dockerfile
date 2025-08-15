# Use the official Python base image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the Python script into the container
COPY client.py /app/client.py

# Set the entrypoint to the Python interpreter
ENTRYPOINT ["python", "client.py"]

# Set default arguments
CMD ["ex2_server_container", "8080"]