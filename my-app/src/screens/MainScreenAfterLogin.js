import React, { useState, useEffect } from "react";
import { useUserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import MainMenu from '../components/MainMenu';
import MovieCard from "../components/MovieCard";

const MainScreenAfterLogin = () => {
    const { currentUserToken, setIsAuthenticated, currentUser, setCurrentUser, setCurrentUserToken, isAuthenticated, isDarkMode, setIsDarkMode } = useUserContext();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]); // State for categories
    const [error, setError] = useState(null); // State for errors
    const [empty, setEmpty] = useState(null); // indicates empty State
    const [videoUrl, setVideoUrl] = useState(""); // State for video URL

    // Function to fetch video URL for random movie
    const fetchRandomVideo = async (data) => {
        if(!data) {
            return;
        }
        try {
            // Flatten categories into a single array and choose a random movie
            const allMovies = Object.values(data).flat();
            const randomIndex = Math.floor(Math.random() * allMovies.length);
            const randomMovie = allMovies[randomIndex];

            // Fetch video for the chosen random movie
            if (randomMovie) {
                setVideoUrl(randomMovie.videoUrl);
            }
        } catch (err) {
            console.error("Error fetching random movie:", err);
            setError(err.message);
        }
    };

    // Function to fetch categories
    const fetchCategories = async () => {
        if (!currentUserToken) {
            console.error("No token found. Cannot fetch categories.");
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/api/movies", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentUserToken}`,
                },
            });

            if(response.status === 404) {
                setEmpty(true);
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }

            const data = await response.json();
            if(Object.keys(data).length){
                setCategories(data); // Update categories state
            }
            else {
                setEmpty(true);
            }
            return data;
        } catch (err) {
            console.error("Error fetching categories:", err);
            setError(err.message);
        }
    };

    // Fetch random video, user info, and categories when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            const categoryMovies = await fetchCategories();
            if(!empty && !error) {
                fetchRandomVideo(categoryMovies);
            }
        };
        isAuthenticated && currentUserToken ? fetchData() : navigate('/login');
    }, [isAuthenticated]);

    return (
        <div className={isDarkMode ? "dark-mode" : "light-mode"} style={{
            minHeight: "100vh",
        }}>
            <MainMenu />
            {/* Video Player */}
            <div>
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                <h2>Featured Movie</h2>
                {empty && <p>There are no movies yet! {currentUser?.role === 'Admin' 
                ? 'You can upload new movies via the admin screen' 
                : 'Contact your Administrator.'}</p>}
                {videoUrl ? (
                    <video
                        autoPlay
                        muted
                        loop
                        controls
                        style={{ width: "100%", maxHeight: "500px", border: "1px solid #ccc", marginTop: "20px" }}
                    >
                        <source src={videoUrl} type="video/mp4"/>
                        </video>
                ) : 
                    !error && !empty && <p>Loading video...</p>
                }
            </div>

            {/* Categories Display */}
<div className="categories-section">
    <h2>Movies by Categories</h2>
    {empty && <p>There are no promoted categories with movies yet! {currentUser?.role === 'Admin' 
                ? 'You can create new categories and movies via the admin screen' 
                : 'Contact your Administrator.'}</p>}
    {Object.keys(categories).length > 0 ? (
        Object.entries(categories).map(([category, movies]) => (
            <div key={category} className="category">
                <h3>{category}</h3>
                <div className="movie-row">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                </div>
            </div>
        ))
    ) : (
        !empty && !error && <p>Loading categories...</p>
    )}
</div>

        </div>
    );
};

export default MainScreenAfterLogin;
