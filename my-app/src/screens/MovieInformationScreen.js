import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById, getRecommendations } from '../services/movieService';
import '../screens/MovieInformationScreen.css';
import { useUserContext } from '../context/UserContext';
import MainMenu from '../components/MainMenu';
import { useNavigate } from "react-router-dom";
import MovieCard from '../components/MovieCard';

function MovieInformationScreen() {
  const { id } = useParams();
  const { currentUserToken, isDarkMode } = useUserContext();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await getMovieById(id);
        setMovie(movieResponse.data);

        const recommendationsResponse = await getRecommendations(id, currentUserToken);
        setRecommendations(recommendationsResponse.data);
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError('Failed to load movie details.');
      }
    };

    fetchMovieData();
  }, [id]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className='dark-mode full-height'>
      <MainMenu />
    <div className={isDarkMode ? "movie-container dark-mode" : "movie-container light-mode"}>
      <div className="movie-content">
        <div className='movie-content-upper-part'>
        <div className="movie-image-container">
          <img
            src={movie.pictureUrl || "/images/barbie.jpg"}
            alt={movie.name}
            className="movie-image"
          />
        </div>

        <h1 className="movie-title">{movie.name}</h1>

        <div className="tags">
          <span className="tag">{movie.category}</span>
        </div>

        <button onClick={() => navigate(`/movie/video/${id}`)} className={isDarkMode ? "play-button dark-mode" : "play-button light-mode"}><i class="bi bi-play-fill"></i>Play</button>
        </div>
        

        <div className="recommendations">
          <h2>Recommended for You:</h2>
          {recommendations.length > 0 ? (
            <div className="recommendation-list">
              {recommendations.map((rec) => (
                  <MovieCard key={rec._id} movie={rec}/>
              ))}
            </div>
          ) : (
            <p className="no-recommendations">No recommended movies for you right now.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default MovieInformationScreen;
