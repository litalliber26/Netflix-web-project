import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import {ReactComponent as NetflixLogo} from '../assets/netflix-logo-no-background.svg';
import './MainMenu.css'

const MainMenu = () => { 
    const { currentUserToken, setIsAuthenticated, currentUser, setCurrentUser, setCurrentUserToken, isAuthenticated, isDarkMode, setIsDarkMode } = useUserContext();
    const navigate = useNavigate();
    // Function to toggle theme
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Function to log out the user
    const handleLogout = () => {
        setIsAuthenticated(false); // Update state to indicate the user is logged out
        setCurrentUserToken(null); // Remove the token from state
        setCurrentUser(null); // Remove the token from state
        navigate('/login');
    };

    const [isTooltipOpen, setTooltipOpen] = useState(false);

    return ( 
<div className={isDarkMode ? "dark-mode main-menu-container" : "light-mode main-menu-container"}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <NetflixLogo className='menu-button menu-netflix-logo' onClick={() => navigate('/main')} />
                <button 
                    className={isDarkMode ? "dark-mode menu-button" : "light-mode menu-button"} 
                    onClick={() => navigate('/categories')}
                >
                    Categories
                </button>
                <button 
                    className={isDarkMode ? "dark-mode menu-button" : "light-mode menu-button"} 
                    onClick={() => navigate('/search')}
                >
                    SEARCH
                </button>
                {currentUser?.role === 'Admin' && (
                    <button 
                        className={isDarkMode ? "dark-mode menu-button" : "light-mode menu-button"} 
                        onClick={() => navigate('/admin')}
                    >
                        Admin screen
                    </button>
                )}
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "10px" }}>
                {currentUser?.photo && (
                    <img 
                        src={currentUser?.photo} 
                        alt="User" 
                        style={{ width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer" }} 
                        onClick={() => setTooltipOpen(!isTooltipOpen)}
                    />
                )}
                {isTooltipOpen && (
                    <div 
                        className="menu-tooltip" 
                        style={{
                            position: "absolute",
                            top: "50px",
                            right: "0",
                            width: "200px", 
                            backgroundColor: isDarkMode ? "#333" : "#fff",
                            color: isDarkMode ? "#fff" : "#000",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            padding: "10px",
                            borderRadius: "8px",
                            zIndex: 1000,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {currentUser?.photo && (
                    <img 
                        src={currentUser?.photo} 
                        alt="User" 
                        style={{ width: "75px", height: "75px", borderRadius: "50%", cursor: "pointer" }} 
                        onClick={() => setTooltipOpen(!isTooltipOpen)}
                    />
                )}
                        <span style={{ marginBottom: "10px" }}>{currentUser?.name}</span>
                         {/* Toggle Switch */}
    <label 
        className="toggle-switch" 
        style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginBottom: "10px"
        }}
    >
        <input 
            type="checkbox" 
            checked={isDarkMode} 
            onChange={toggleTheme} 
            style={{ display: "none" }}
        />
        <span 
            style={{
                width: "40px",
                height: "20px",
                backgroundColor: isDarkMode ? "#b20710" : "#ccc",
                borderRadius: "20px",
                position: "relative",
                transition: "background-color 0.3s ease"
            }}
        >
            <span 
                style={{
                    position: "absolute",
                    top: "2px",
                    left: isDarkMode ? "22px" : "2px",
                    width: "16px",
                    height: "16px",
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    transition: "left 0.3s ease"
                }}
            ></span>
        </span>
        <span style={{ marginLeft: "10px", color: isDarkMode ? "#fff" : "#000" }}>
            {isDarkMode ? "Dark Mode" : "Light Mode"}
        </span>
    </label>
                        <button 
                            className={isDarkMode ? "dark-mode menu-button" : "light-mode menu-button"} 
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
)};

export default MainMenu;
