# Project Documentation

## Overview

This project is a Node.js-based application that uses Express for handling API routes and Mongoose for interacting with MongoDB. It is modularly designed with separate files for routes, controllers, models, and services to ensure scalability and maintainability.

## Installation and Usage

### Prerequisites
- Docker must be installed on your system. You can download and install it from the [Docker website](https://www.docker.com/).

### Steps to Build and Run The Server

1. **Clone the Project**:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Run The Environment With Docker**:

   ```bash
   docker-compose up
   ```

  This command will create the required containers (cpp service, nodejs service and mongodb) with default values for the ports (8080 cpp, 3000 nodejs)
  you can call the command:
  ```bash
  export CPP_SERVICE_PORT=<service port>
  ```
  before the previous command to change the port of cpp service. 

## Architecture

The project architecture follows a typical MVC (Model-View-Controller) structure:

- **`app.js`****:** The main entry point. Configures middleware, connects to MongoDB, and sets up routes.
- **`routes/`****:** Defines API endpoints for different features, such as movies, users, and categories.
- **`controllers/`****:** Contains business logic for processing requests and generating responses.
- **`models/`****:** Defines Mongoose schemas for database entities like movies, users, and categories.
- **`services/`****:** Provides utility functions or shared business logic to be used across controllers.

## Exposed Routes

### 1. User Authentication Routes (`token.js`)

- **POST /**
  - **Description:** Authenticates a user.
  - **Request Body:**
    - `email` (string): User's email.
    - `password` (string): User's password.
  - **Responses:**
    - `200`: `{ userId: <user_id> }`
    - `401`: `{ error: 'Invalid email or password' }`

### 2. User Routes (`user.js`)

- **POST /**
  - **Description:** Creates a new user.
  - **Request Body:**
    - `email` (string): Email of the user.
    - `password` (string): User's password.
    - `name` (string): Name of the user.
    - `phone` (string, optional): Phone number of the user.
    - `photo` (string, optional): Photo of the user (URL to the photo file).
  - **Responses:**
    - `201`: `{ message: 'User created successfully', user: <user_data> }`
    - `400`: `{ error: <error_message> }`

- **GET /:id**
  - **Description:** Retrieves user details by ID.
  - **Responses:**
    - `200`: `{ id, email, name, phone }`
    - `404`: `{ error: 'User not found' }`
    - `400`: `{ error: <error_message> }`

### 3. Category Routes (`category.js`)

- **GET /**
  - **Description:** Retrieves all categories.
  - **Responses:**
    - `200`: List of categories.
    - `404`: `{ error: "No categories found" }`
    - `500`: `{ error: "Internal server error" }`

- **POST /**
  - **Description:** Creates a new category.
  - **Request Body:**
    - `name` (string): Name of the category.
    - `promoted` (boolean, optional): Whether the category is promoted.
  - **Responses:**
    - `201`: Created category details.
    - `400`: `{ error: "Name is required" }`
    - `500`: `{ error: "Internal server error" }`
  
- **GET /:id**
  - **Description:** Retrieves a category by ID.
  - **Responses:**
    - `200`: Category details.
    - `404`: `{ error: "Category not found" }`
    - `400`: `{ error: "Id is required" }`
    - `500`: `{ error: "Internal server error" }`
  
- **PATCH /:id**
  - **Description:** Updates a specific category.
  - **Request Body:** Partial category data (e.g., name, promoted).
  - **Responses:**
    - `204`: No content on success.
    - `404`: `{ error: "Category not found" }`
    - `400`: `{ error: "Id is required" }`
    - `500`: `{ error: "Internal server error" }`
  
- **DELETE /:id**
  - **Description:** Deletes a specific category.
  - **Responses:**
    - `204`: No content on success.
    - `404`: `{ error: "Category not found" }`
    - `400`: `{ error: "Id is required" }`
    - `500`: `{ error: "Internal server error" }`

### 4. Movie Routes (`movie.js`)

- **GET /**
  - **Description:** Retrieves movies by category.
  - **Responses:**
    - `200`: List of movies grouped by category.
    - `404`: `{ error: "Movies not found" }`
    - `500`: `{ error: "Internal server error" }`

- **POST /**
  - **Description:** Creates a new movie.
  - **Request Body:**
    - `name` (string): Movie name.
    - `category` (string): Movie category.
  - **Responses:**
    - `201`: Created movie details.
    - `400`: `{ error: "Name and Category are required" }`
    - `409`: `{ error: "Movie with the same name and category already exists" }`
    - `500`: `{ error: "Internal server error" }`
  
- **GET /search/:query**
  - **Description:** Searches for movies by a query.
  - **Responses:**
    - `200`: List of movies matching the query.
    - `404`: `{ error: "Query not found" }`
    - `400`: `{ error: "Query is required" }`
    - `500`: `{ error: "Internal server error" }`

- **GET /:id**
  - **Description:** Retrieves a specific movie by ID.
  - **Responses:**
    - `200`: Movie details (`id`, `name`, `category`, `intId`).
    - `404`: `{ error: "Movie not found" }`
    - `500`: `{ error: "Internal server error" }`

- **PUT /:id**
  - **Description:** Updates a specific movie.
  - **Request Body:** Updated movie data (name, category).
  - **Responses:**
    - `204`: No content on success.
    - `404`: `{ error: "Movie not found" }`
    - `400`: `{ error: "Name and Category are required" }`
    - `500`: `{ error: "Internal server error" }`
- **DELETE /:id**
  - **Description:** Deletes a specific movie.
  - **Responses:**
    - `204`: No content on success.
    - `404`: `{ error: "Movie not found" }`
    - `500`: `{ error: "Internal server error" }`

- **GET /:id/recommend**
  - **Description:** Retrieves movie recommendations for a user based on a specific movie.
  - **Responses:**
    - `200`: List of recommended movies.
    - `404`: `{ error: "Not Found" }`
    - `500`: `{ error: "Internal server error" }`

- **POST /:id/recommend**
  - **Description:** Adds a movie to the user's watched list and updates recommendations system.
  - **Parameters:**
    - `id`: ID of the movie being watched.

## Configuration

The application uses environment variables to manage configuration settings. Ensure the following variables are defined in a `.env` file:

- `DB_URI`: MongoDB connection string.
- `PORT`: Port for the Express server.
- `RECOMMENDER_SERVER_HOST`: Host address for the recommender server (default: `127.0.0.1`).
- `RECOMMENDER_SERVER_PORT`: Port for the recommender server (default: `8080`).

## Data Models

### Movie

- **Fields:**
  - `name` (String): Required, trims extra spaces. The name of the movie.
  - `category` (String): Required, trims extra spaces. The category of the movie.
  - `intId` (Number): Required. Unique identifier for the movie.

### Category

- **Fields:**
  - `name` (String): Required, trims extra spaces. The name of the category.
  - `promoted` (Boolean): Optional. Indicates if the category is promoted.

### User

- **Fields:**
  - `email` (String): Required, unique, trims extra spaces, and validates the email format.
  - `password` (String): Required, stores plain text for now.
  - `name` (String): Optional. Represents the user's name.
  - `phone` (String): Optional. Represents the user's phone.
  - `photo` (String): Optional. Represents the user's photo (URL to the photo file).
  - `intId` (Number): Required. Unique identifier for the user.
  - `watchedMovies` (Number[]): Required. The movies watched by the user. Default: [].
  
### Counter

- **Fields:**
  - `name` (String): Required, unique. Name of the counter.
  - `value` (Number): Required. Current value of the counter.

## Execution Examples
### Example API Calls

#### User commands

- **POST** 
![User Post](https://github.com/LitalLiber/EX3/blob/c60d66c485b050e140b2eb14c719ffe0b36d2307/images%20for%20README/check%20user%20post.png)

- **GET** 
![User Get](https://github.com/LitalLiber/EX3/blob/c60d66c485b050e140b2eb14c719ffe0b36d2307/images%20for%20README/check%20user%20get.png)


#### Token commands

- **POST** 
![Token Post](https://github.com/LitalLiber/EX3/blob/c60d66c485b050e140b2eb14c719ffe0b36d2307/images%20for%20README/check%20token%20post.png)
![Token Post wrong pass](https://github.com/LitalLiber/EX3/blob/c60d66c485b050e140b2eb14c719ffe0b36d2307/images%20for%20README/check%20token%20post%20wrong%20pass.png)


#### Categories commands

- **GET ALL** 
![Category Get All](https://github.com/LitalLiber/EX3/blob/c60d66c485b050e140b2eb14c719ffe0b36d2307/images%20for%20README/check%20categ%20get%20all.png)

- **POST** 
- This command can only be run when the user is logged into the system. Therefore, to run it, you need to add a userid http header to the command.
 - With http header of userid:
![Category Post](<images for README/post categorie with.jpeg>)
- Without http header of userid:
![Category Post](<images for README/post categorie without.jpeg>)


- **GET** 
![Category Get](https://github.com/LitalLiber/EX3/blob/c60d66c485b050e140b2eb14c719ffe0b36d2307/images%20for%20README/check%20categ%20get%20one.png)

- **PATCH** 
- This command can only be run when the user is logged into the system. Therefore, to run it, you need to add a userid http header to the command.
 - With http header of userid:
![Category Patch](<images for README/patch categorie with.jpeg>)
- Without http header of userid:
![Category Patch](<images for README/patch categorie without.jpeg>)


- **DELETE** 
- This command can only be run when the user is logged into the system. Therefore, to run it, you need to add a userid http header to the command.
 - With http header of userid:
![Category Delete](<images for README/delete categorie with.jpeg>)
- Without http header of userid:
![Category Delete](<images for README/delete categorie without.jpeg>)

#### Movies commands

- **GET ALL** 
![Movie Get All](https://github.com/LitalLiber/EX3/blob/c60d66c485b050e140b2eb14c719ffe0b36d2307/images%20for%20README/check%20movie%20get%20all.png)

- **POST** 
 - This command can only be run when the user is logged into the system. Therefore, to run it, you need to add a userid http header to the command.
 - With http header of userid:
![Movie Post](https://github.com/LitalLiber/EX3/blob/9358a7393e40c81fdc8d55b7567370c2426fb089/images%20for%20README/check%20movie%20post%20with%20http%20header%20of%20userid.png)
- Without http header of userid:
![Movie Post](https://github.com/LitalLiber/EX3/blob/3eb90b7a5c83603b9822560634e067f514be0071/images%20for%20README/check%20movie%20post%20without%20http%20header%20of%20userid.png)

- **GET** 
![Movie Get](https://github.com/LitalLiber/EX3/blob/c60d66c485b050e140b2eb14c719ffe0b36d2307/images%20for%20README/check%20movie%20get%20one.png)

- **PUT** 
 - This command can only be run when the user is logged into the system. Therefore, to run it, you need to add a userid http header to the command.
 - With http header of userid:
![Movie Put](https://github.com/LitalLiber/EX3/blob/9358a7393e40c81fdc8d55b7567370c2426fb089/images%20for%20README/check%20movie%20put%20with%20http%20header%20of%20userid.png)
- Without http header of userid:
![Movie Put](https://github.com/LitalLiber/EX3/blob/3eb90b7a5c83603b9822560634e067f514be0071/images%20for%20README/check%20movie%20put%20without%20http%20header%20of%20userid.png)

- **DELETE** 
 - This command can only be run when the user is logged into the system. Therefore, to run it, you need to add a userid http header to the command.
 - With http header of userid:
![Movie Delete](https://github.com/LitalLiber/EX3/blob/9358a7393e40c81fdc8d55b7567370c2426fb089/images%20for%20README/check%20movie%20delete%20with%20http%20header%20of%20userid.png)
- Without http header of userid:
![Movie Get after Delete](https://github.com/LitalLiber/EX3/blob/3eb90b7a5c83603b9822560634e067f514be0071/images%20for%20README/check%20movie%20delete%20without%20http%20header%20of%20userid.png)


#### Recommendation system commands

- **POST** 
- This command can only be run when the user is logged into the system. Therefore, to run it, you need to add a userid http header to the command.
 - With http header of userid:
![Recommendation system Post - AddWatchMovie](https://github.com/LitalLiber/EX3/blob/c60d66c485b050e140b2eb14c719ffe0b36d2307/images%20for%20README/check%20recommend%20addWatchMovie.png)
- Without http header of userid:
![Recommendation system Post - AddWatchMovie](https://github.com/LitalLiber/EX3/blob/a972e239305ba842e448160b5bae6a1a2f353b14/images%20for%20README/check%20recommend%20post%20without%20http%20header%20of%20userid.png)

- **GET** 
- This command can only be run when the user is logged into the system. Therefore, to run it, you need to add a userid http header to the command.
 - With http header of userid:
![Recommendation system Get - RecommendComannd](https://github.com/LitalLiber/EX3/blob/c60d66c485b050e140b2eb14c719ffe0b36d2307/images%20for%20README/check%20recommend%20RecommendComannd.png)
- Without http header of userid:
![Recommendation system Get - RecommendComannd](https://github.com/LitalLiber/EX3/blob/a972e239305ba842e448160b5bae6a1a2f353b14/images%20for%20README/check%20recommend%20get%20without%20http%20header%20of%20userid.png)