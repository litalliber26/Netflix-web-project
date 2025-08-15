# Setting Up the Environment

This document provides step-by-step instructions for setting up and running the environment using Docker Compose.

## Prerequisites
Ensure that you have the following installed on your system:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Android Studio](https://developer.android.com/studio)

## Steps to Run the Environment

### 1. Clone the Repository
```sh
git clone <repository-url>
cd <repository-folder>
```

### 2. Set Up Environment Variables (Optional)
Create a `.env` file in the project root and define the necessary environment variables:
```sh
MONGO_USERNAME=root
MONGO_PASSWORD=Password1
CPP_SERVICE_PORT=8080
```
Modify values as needed.
This step is optional you can skip it and the docker-compose would take the defaults.

### 3. Build and Start the Services
Run the following command to build and start the containers:
```sh
docker-compose up --build
```
This will start the following services:
- **MongoDB** (Database)
- **db-migration** (Database migration service)
- **Node.js Application** (Backend server)
- **C++ Recommender Server** (Recommendation system backend)
- **React Application** (Frontend UI)

### 4. Android Application
1. Repeat step 1 for the **android repo URL**
1. Open **Android Studio** and load the Android project.
2. Ensure that your local environment is running (via `docker-compose up`).
3. **If you are willing to use the app on real devices connected via USB with proper network settings**: Update the API URL in the "**repo-path**\app\src\main\res\xml\network_security_config.xml" and "**repo-path**\app\src\main\res\values\strings.xml" (`BaseUrl` string) to point to `http://localhost:3000/api` instead of `http://10.0.2.2:3000/api/`.
4. Build and run the application in Android Studio.

### 5. Stopping the Environment
To stop the running containers, use:
```sh
docker-compose down
```

### 6. Cleaning Up
If you need to remove volumes (including MongoDB data), run:
```sh
docker-compose down -v
```

## Additional Notes
- The `db-migration` service ensures the database schema is properly initialized and seeded with initial data (because we all know that there is no netflix without some movies) before starting the backend.

Now, your environment should be up and running!
