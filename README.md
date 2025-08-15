# Advanced Programming Excercise 4

# Environment Setup

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
- On your first entry you should **register** to the site (there are **no preloaded users**)
- User that created from the android client is fully accessible from the react client and vice versa.

# Web Project

## Admin Panel

## Dark Mode
![Admin Panel - Dark Mode](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/admin%20dark.png)

## Light Mode
![Admin Panel - Light Mode](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/admin%20light.png)

The **Admin Panel** has two display modes: **Dark Mode** and **Light Mode**. Admin can switch between these modes through the user profile menu.

## User Profile & Options
- After logging in, the user's profile picture appears at the **top-right corner** of every screen.
- Clicking on the profile picture opens a dropdown menu with the following options:
  - **Toggle Light/Dark Mode**: Switch between light and dark themes.
  - **Logout**: Log out of the system and return to the login screen.

## Access to the Admin Panel
- This screen opens when clicking the **"Admin Screen"** button in the top navigation menu.
- **Only admins** have access to this panel.
- If a **non-admin** user tries to access this page, they will be **blocked** and receive an **error message**.

## Admin Panel Features
The admin has **nine functions**, each accessible through a button:

1. **View All Categories** – Displays all existing movie categories.
2. **View Movie by ID** – Allows the admin to search for a movie by its unique ID.
3. **View Category by ID** – Allows the admin to search for a category by its unique ID.
4. **Create Category** – Enables the admin to add a new movie category to the system.
5. **Update Category** – Allows modifications to an existing category's details.
6. **Delete Category** – Removes a category from the system.
7. **Create Movie** – Enables the admin to add a new movie to the database.
8. **Update Movie** – Allows modifications to an existing movie’s details.
9. **Delete Movie** – Removes a movie from the system.

---

# Categories Screen

## Dark Mode
![Categories Screen - Dark Mode](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/categories%20dark.png)

## Light Mode
![Categories Screen - Light Mode](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/categories%20light.png)

The **Categories Screen** has two display modes: **Dark Mode** and **Light Mode**. Users can switch between these modes through the user profile menu.

## User Profile & Options
- After logging in, the user's profile picture appears at the **top-right corner** of every screen.
- Clicking on the profile picture opens a dropdown menu with the following options:
  - **Toggle Light/Dark Mode**: Switch between light and dark themes.
  - **Logout**: Log out of the system and return to the login screen.

## Categories Screen Overview
- This screen appears when the user clicks on **"Categories"** in the top navigation menu.
- Movies are displayed by **categories**.
- Each movie is represented by a thumbnail and a title.

## Movie Selection & Navigation
- Users can **click on any movie** to open the **Movie Information Screen**.
- The **Movie Information Screen** provides details about the selected movie and contains a **button to play the movie**.
- Clicking the **play button** redirects the user to the **Movie Player Screen**.

---

# Home Screen (Unauthenticated Users)

![Home Screen](https://github.com/gilizad/EX4/blob/9b87ef86a7e6ed89ab5df7bfe9aa8e6ce032464f/images%20for%20wiki/Home%20Screen%20(Unauthenticated%20Users)%20Web.png)

This is the **home screen** for users who are not logged in. The page features a black background with a **Netflix-style logo** in the center and two main buttons: **Login** and **Register**.

## Functionality

### **Login Button**
- Redirects the user to the **login page**.
- Allows existing users to sign in with their credentials.

### **Register Button**
- Redirects the user to the **registration page**.
- Enables new users to create an account.

---

# Login Screen

![Login Screen](https://github.com/gilizad/EX4/blob/5e964df1e92d957198750c49e708f4709be811e0/images%20for%20wiki/login%20web.png)

This is the **Login Screen**, where registered users can sign in to their accounts.

## Fields Required for Login
- **Username**: Enter your registered username.
- **Password**: Enter your account password.

### **Login Button**
- When clicked, the system verifies the entered credentials.
- If valid, the user is redirected to the main application.
- If incorrect, an error message will be displayed.

### **Sign Up Option**
- If the user does not have an account, they should click on **"Sign up"**.
- This redirects them to the registration page, where they can create a new account.

---

# Main Screen

## Dark Mode
![Main Screen - Dark Mode](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/main%20dark.png)

## Light Mode
![Main Screen - Light Mode](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/main%20light.png)

The **Main Screen** has two display modes: **Light Mode** and **Dark Mode**. Users can switch between these modes through the user profile menu.

## User Profile & Options
- After logging in, the user's profile picture appears at the **top-right corner** of every screen.
- Clicking on the profile picture opens a dropdown menu with the following options:
  - **Toggle Light/Dark Mode**: Switch between light and dark themes.
  - **Logout**: Log out of the system and return to the login screen.

## Navigation Menu (Top Bar)
### **Categories**
- Clicking this button opens a screen displaying **all movie categories** and the movies available in each.

### **Search**
- Clicking this button navigates to a search screen where users can search for movies:
  - By movie **name**.
  - By **category**.

### **Admin Screen**
- Clicking this button:
  - If the user is **not an admin**, a message appears stating **"Access Denied"**.
  - If the user **is an admin**, the admin panel opens.
- The **Admin Panel** provides **9 functions** for managing the system.

---

# Movie Information Screen 

## Dark Mode
![Movie Information - Dark Mode](https://github.com/gilizad/EX4/blob/44da0eb6c8b8c26c4e38f0c75220ccdf52e01402/images%20for%20wiki/movie%20info%20dark%20web.jpeg)

## Light Mode
![Movie Information - Light Mode](https://github.com/gilizad/EX4/blob/44da0eb6c8b8c26c4e38f0c75220ccdf52e01402/images%20for%20wiki/movie%20info%20ligth%20web.jpeg)

The **Movie Information Screen** has two display modes: **Dark Mode** and **Light Mode**. Users can switch between these modes through the user profile menu.

## User Profile & Options
- After logging in, the user's profile picture appears at the **top-right corner** of every screen.
- Clicking on the profile picture opens a dropdown menu with the following options:
  - **Toggle Light/Dark Mode**: Switch between light and dark themes.
  - **Logout**: Log out of the system and return to the login screen.

## How Users Access the Movie Information Screen
- This screen appears after **clicking on a movie** from the:
  - **Categories Screen**
  - **Search Screen**
- It provides detailed information about the selected movie.

## Movie Information Displayed
- **Movie Title**
- **Category Name**
- **Movie Image**
- **Play Button** – Clicking this button navigates to the **Video Player Screen**.
- **Recommended Movies** – Based on the user's viewing history, similar movies are suggested.

---

# Movie Management: Creation, Editing, Deletion, and Viewing

## 1. Accessing the Admin Panel
When an admin wants to create, edit, or delete a movie, they must first navigate to the **Admin Panel**.

![Admin Panel](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/admin%20dark.png)

---

## 2. Creating a New Movie
To create a new movie, the admin clicks the **Create Movie** button and fills in the required details.

![Create Movie](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/create%20movie%201.png)
![Create Movie](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/create%20movie%202.png)

### Movie Details:
- **Movie Title**
- **Category**
- **Image**
- **Video File**

Once all fields are completed, the admin clicks **Submit**, and the movie is added to the system.

---

## 3. Watching the Newly Created Movie
After the movie is created, it becomes available in the **Categories** section or via **Search**. Users can select the movie and watch it.

![Watch Movie](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/create%20movie%203.png)

---

## 4. Editing an Existing Movie
Admins can update movie details using the **Update Movie** button.

![Edit Movie](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/update%20movie%201.png)

They can modify:
- **Title**
- **Category**

After making changes, clicking **Save** updates the movie.

![Edit Movie](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/update%20movie%202.png)

---

## 5. Deleting a Movie
Admins can remove a movie from the system using the **Delete Movie** button.

![Delete Movie](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/delete%20movie%201.png)

Once deleted, the movie will no longer be available in the system.

![delete-movie.png](https://github.com/gilizad/EX4/blob/fbaf16272610aba466754db6942734d067ed6b5b/images%20for%20wiki/new/delete%20movie%202.png)

---

📌 **Notes:**
- Only **admins** can create, edit, or delete movies.

---

# Video Player Screen 

## Dark Mode
![Video Player - Dark Mode](https://github.com/gilizad/EX4/blob/08a1559b9d0c452cdb4b5a98eb4ff7e1e63d8ccd/images%20for%20wiki/video%20dark%20web.png)

## Light Mode
![Video Player - Light Mode](https://github.com/gilizad/EX4/blob/08a1559b9d0c452cdb4b5a98eb4ff7e1e63d8ccd/images%20for%20wiki/video%20light%20web.png)

The **Video Player Screen** has two display modes: **Dark Mode** and **Light Mode**. Users can switch between these modes through the user profile menu.

## User Profile & Options
- After logging in, the user's profile picture appears at the **top-right corner** of every screen.
- Clicking on the profile picture opens a dropdown menu with the following options:
  - **Toggle Light/Dark Mode**: Switch between light and dark themes.
  - **Logout**: Log out of the system and return to the login screen.

## How Users Access the Video Player
- This screen appears after:
  1. Clicking on a **movie** from the **Categories Screen** or **Search Screen**.
  2. Navigating to the **Movie Information Screen**.
  3. Clicking the **"Play"** button in the **Movie Information Screen**.

## Video Player Features
- **Movie Title & Category**: Displayed above the video.
- **Video Playback Controls**:
  - Play/Pause button.

---

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Android Project

## Admin Panel

![Admin Panel - Dark Mode](https://github.com/gilizad/EX4/blob/6e07159e6ac01f220c23edada1a7b48f669e524c/images%20for%20wiki/admin%20dark%20andro.png)

![Admin Panel - Light Mode](https://github.com/gilizad/EX4/blob/6e07159e6ac01f220c23edada1a7b48f669e524c/images%20for%20wiki/admin%20light%20andro.png)

The **Admin Panel** has two display modes: **Dark Mode** and **Light Mode**. Admin can switch between these modes through the user profile menu.

- **Toggle Light/Dark Mode**: Switch between light and dark themes.

## Access to the Admin Panel
- This screen opens when clicking the **"Admin Screen"** button in the top navigation menu.
- **Only admins** have access to this panel.
- If a **non-admin** user tries to access this page, they will be **blocked** and receive an **error message**.

## Admin Panel Features
The admin has **nine functions**, each accessible through a button:

1. **View All Categories** – Displays all existing movie categories.
2. **View Movie by ID** – Allows the admin to search for a movie by its unique ID.
3. **View Category by ID** – Allows the admin to search for a category by its unique ID.
4. **Create Category** – Enables the admin to add a new movie category to the system.
5. **Update Category** – Allows modifications to an existing category's details.
6. **Delete Category** – Removes a category from the system.
7. **Create Movie** – Enables the admin to add a new movie to the database.
8. **Update Movie** – Allows modifications to an existing movie’s details.
9. **Delete Movie** – Removes a movie from the system.

---

## Categories Screen

![Categories Screen - Dark Mode](https://github.com/gilizad/EX4/blob/6e07159e6ac01f220c23edada1a7b48f669e524c/images%20for%20wiki/categories%20screen%20dark%20andro.png)

![Categories Screen - Light Mode](https://github.com/gilizad/EX4/blob/6e07159e6ac01f220c23edada1a7b48f669e524c/images%20for%20wiki/categories%20screen%20light%20andro.png)

The **Categories Screen** has two display modes: **Dark Mode** and **Light Mode**. Users can switch between these modes through the user profile menu.

- **Toggle Light/Dark Mode**: Switch between light and dark themes.

## Categories Screen Overview
- This screen appears when the user clicks on **"Categories"** in the top navigation menu.
- Movies are displayed by **categories**.
- Each movie is represented by a thumbnail and a title.

## Movie Selection & Navigation
- Users can **click on any movie** to open the **Movie Information Screen**.
- The **Movie Information Screen** provides details about the selected movie and contains a **button to play the movie**.
- Clicking the **play button** redirects the user to the **Movie Player Screen**.

---

## Home Screen (Unauthenticated Users)

![Home Screen](https://github.com/gilizad/EX4/blob/580eb325a44da9ef014dde359f46c0f6b526847c/images%20for%20wiki/Home%20Screen%20(Unauthenticated%20Users)%20Andro.png)

This is the **home screen** for users who are not logged in.

### **Login Button**
- Redirects the user to the **login screen**.
- Allows existing users to enter their credentials and sign in.

### **Register Button**
- Redirects the user to the **registration screen**.
- Enables new users to create an account.

---

# README

## Login Screen

![Login Screen](https://github.com/gilizad/EX4/blob/580eb325a44da9ef014dde359f46c0f6b526847c/images%20for%20wiki/login%20andro.png)

This is the **Login Screen**, allowing registered users to log into their accounts.

### Fields Required for Login
- **Username**: Enter your registered username.
- **Password**: Enter your account password.

### Functionality
#### **Login Button**
- When clicked, the system verifies the entered credentials.
- If valid, the user is redirected to the main application.
- If incorrect, an error message will be displayed.

#### **Sign Up Option**
- If the user does not have an account, they should click on **"Sign up"**.
- This redirects them to the registration page, where they can create a new account.

---

## Main Screen

![Main Screen - Dark Mode](https://github.com/gilizad/EX4/blob/6e07159e6ac01f220c23edada1a7b48f669e524c/images%20for%20wiki/main%20screen%20dark%20andro.png)

![Main Screen - Light Mode](https://github.com/gilizad/EX4/blob/6e07159e6ac01f220c23edada1a7b48f669e524c/images%20for%20wiki/main%20screen%20light%20andro.png)

The **Main Screen** has two display modes: **Light Mode** and **Dark Mode**. Users can switch between these modes through the user profile menu.

- **Toggle Light/Dark Mode**: Switch between light and dark themes.
- **Logout**: Log out of the system and return to the login screen.

### Navigation Menu (Top Bar)
#### **Categories**
- Clicking this button opens a screen displaying **all movie categories** and the movies available in each.

#### **Search**
- Clicking this button navigates to a search screen where users can search for movies:
  - By movie **name**.
  - By **category**.

#### **Admin Screen**
- Clicking this button:
  - If the user is **not an admin**, a message appears stating **"Access Denied"**.
  - If the user **is an admin**, the admin panel opens.
- The **Admin Panel** provides **9 functions** for managing the system.

### Featured Movie (Autoplay Video)
- A **featured movie trailer** plays automatically in the main section.
- The **featured movie** is one of the **movies listed below in the categories section**.

### Movies by Categories
- Movies are displayed **by category** at the bottom of the screen.
- Clicking on a movie opens a **detailed movie information screen**.
- From the **movie information screen**, users can navigate to the **movie playback screen**.

---

## Movie Information Screen

![Movie Information - Dark Mode](https://github.com/gilizad/EX4/blob/8ed9f02ad2e4197a147d86d867c362a3df17fb92/images%20for%20wiki/main%20screen%20dark%20andro.png)

![Movie Information - Light Mode](https://github.com/gilizad/EX4/blob/1d1c64b42bb6473687b5441067b85c44633962d5/images%20for%20wiki/movie%20info%20ligth%20andro.jpeg)

The **Movie Information Screen** has two display modes: **Dark Mode** and **Light Mode**. Users can switch between these modes through the user profile menu.

- **Toggle Light/Dark Mode**: Switch between light and dark themes.

### How Users Access the Movie Information Screen
- This screen appears after **clicking on a movie** from the:
  - **Categories Screen**
  - **Search Screen**
- It provides detailed information about the selected movie.

### Movie Information Displayed
- **Movie Title**
- **Category Name**
- **Movie Image**
- **Play Button** – Clicking this button navigates to the **Video Player Screen**.
- **Recommended Movies** – Based on the user's viewing history, similar movies are suggested.

---

## Video Player Screen

![Video Player - Dark Mode](https://github.com/gilizad/EX4/blob/6e07159e6ac01f220c23edada1a7b48f669e524c/images%20for%20wiki/video%20dark%20andro.png)

![Video Player - Light Mode](https://github.com/gilizad/EX4/blob/6e07159e6ac01f220c23edada1a7b48f669e524c/images%20for%20wiki/video%20light%20andro.png)

The **Video Player Screen** has two display modes: **Dark Mode** and **Light Mode**. Users can switch between these modes through the user profile menu.

- **Toggle Light/Dark Mode**: Switch between light and dark themes.

### How Users Access the Video Player
- This screen appears after:
  1. Clicking on a **movie** from the **Categories Screen** or **Search Screen**.
  2. Navigating to the **Movie Information Screen**.
  3. Clicking the **"Play"** button in the **Movie Information Screen**.

### Video Player Features
- **Movie Title & Category**: Displayed above the video.
- **Video Playback Controls**:
  - Play/Pause button.

---

# README

## User Registration and Login Process

![Home Screen](https://github.com/gilizad/EX4/blob/6e07159e6ac01f220c23edada1a7b48f669e524c/images%20for%20wiki/Home%20Screen%20(Unauthenticated%20Users)%20Andro.png)

When a user first visits the website, they arrive at the **Home Screen for Unauthenticated Users**.

### **Login Button**
- Redirects the user to the **login screen**.
- Allows existing users to enter their credentials and sign in.

### **Register Button**
- Redirects the user to the **registration screen**.
- Enables new users to create an account.

---

## Search Screen

![Search Screen - Dark Mode](https://github.com/gilizad/EX4/blob/6e07159e6ac01f220c23edada1a7b48f669e524c/images%20for%20wiki/seaech%20screen%20dark%20andro.png)

![Search Screen - Light Mode](https://github.com/gilizad/EX4/blob/6e07159e6ac01f220c23edada1a7b48f669e524c/images%20for%20wiki/seaech%20screen%20ligth%20andro.png)

The **Search Screen** has two display modes: **Dark Mode** and **Light Mode**. Users can switch between these modes through the user profile menu.

- **Toggle Light/Dark Mode**: Switch between light and dark themes.

### Search Screen Overview
- This screen opens when the user clicks the **"SEARCH"** button in the top navigation menu.
- The search bar allows users to enter queries for finding movies.

### Search Functionality
- Users can search for movies based on:
  - **Part of the movie name**.
  - **Movie category**.
- Search results display movie thumbnails and titles matching the query.

---

## Register Screen

![Sign Up Screen](https://github.com/gilizad/EX4/blob/580eb325a44da9ef014dde359f46c0f6b526847c/images%20for%20wiki/Register%20%20andro.png)

This is the **Sign Up Screen**. It allows new users to create an account.

### Fields Required for Registration
- **Username**: Choose a unique username.
- **Password**: Set a secure password.
- **Confirm Password**: Re-enter the password to confirm it.
- **Display Name**: Enter the name that will be visible to other users.
- **Phone**: Provide a valid phone number.

### **Upload Image Button**
- Allows users to upload a profile picture.
- This step is optional.

### **Sign Up Button**
- When clicked, the system validates all the input fields.
- If valid, the account is created, and the user is redirected to the **login screen**.
- If there are errors (e.g., passwords do not match, missing fields), an error message will be displayed.

---




