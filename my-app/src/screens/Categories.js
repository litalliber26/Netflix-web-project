import React, { useState, useEffect } from "react";
import "./Categories.css"; // Import the CSS file
import { useUserContext } from '../context/UserContext';
import MainMenu from '../components/MainMenu';
import MovieCard from "../components/MovieCard";

const Categories = () => {
    const { currentUserToken, currentUser, isDarkMode } = useUserContext();
    const [empty, setEmpty] = useState(null); // indicates empty State
    const [categories, setCategories] = useState([]); // State for categories
    const [error, setError] = useState(null); // State for errors

    // Function to fetch categories
    const fetchCategories = async () => {
        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
            const response = await fetch(`${API_URL}/movies?all=true`, {
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
                return;
            }
            setEmpty(true);
        } catch (err) {
            console.error("Error fetching categories:", err);
            setError(err.message);
        }
    };

    // Fetch categories when the component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
        <MainMenu />
        <div className={`categories-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {/* Categories Display */}
            <div className="categories-section">
                <h2>Movies by Categories</h2>
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                {empty && <p>There are no categories with movies yet! {currentUser.role === 'Admin' 
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
        </div>
    );
};

export default Categories;
