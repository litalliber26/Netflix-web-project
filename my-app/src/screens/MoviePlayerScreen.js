import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../screens/MoviePlayerScreen.css";
import { getMovieById, addWatchedMovie } from "../services/movieService";
import { useUserContext } from '../context/UserContext';
import MainMenu from '../components/MainMenu';

function MoviePlayerScreen() {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentUserToken, isDarkMode } = useUserContext();
  const videoRef = useRef(null); // Reference to the video element


  // Fetch the movie details
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await getMovieById(id);
        setMovie(response.data);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError("Failed to load movie details.");
      }
    };

    fetchMovieData();
  }, [id]);

  // Handle toggle play/pause
  const togglePlayPause = async () => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }
    if (isPlaying) {
      videoElement.pause(); // Pause the video
      setIsPlaying(false); // Update state to not playing
      return;
    }
    videoElement.play(); // Play the video
    setIsPlaying(true); // Update state to playing

    // Call addWatchedMovie when the video starts playing
    try {
      console.log("Calling addWatchedMovie with id:", id);
      await addWatchedMovie(id, currentUserToken); // Pass the current movie ID
      console.log("Movie added to watched list successfully");
    } catch (err) {
      console.error("Error adding movie to watched list:", err);
    }
  }


  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movie) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="dark-mode full-height">
      <MainMenu />
    <div className={isDarkMode ? "movie-video-player-container dark-mode" : "movie-video-player-container light-mode"}>
      {/* Movie Details */}
      <div className="movie-header">
        <h1 className="movie-title">{movie.name}</h1>
        <div className="movie-category">{movie.category}</div>
      </div>

      {/* Video Player */}
      <div className="video-player-placeholder">
        <video 
        ref={videoRef} 
        id="player"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}>
          <source src={movie.videoUrl} type="video/mp4" />
        </video>
              {/* Play/Pause Button */}
      <button 
        onClick={togglePlayPause} 
        style={{
          position: "absolute",
          left: "45px",
          bottom: '35px',
          transform: "translateX(-50%)",
          padding: "8px 12px",
          backgroundColor: "#555",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "1.2rem",
          fontWeight: "bold",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40px",
          height: "40px"
        }}
      >
        {isPlaying ? "❚❚" : "▶"} {/* Pause icon: ❚❚, Play icon: ▶ */}
      </button>
      </div>
    </div>
    </div>
  );
}

export default MoviePlayerScreen;
