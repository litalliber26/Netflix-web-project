import React from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`}><div className="movie-card">
      <img 
        src={movie.pictureUrl} 
        alt={movie.name} 
        className="movie-image" 
      />
      <p className="movie-name">{movie.name}</p>
    </div></Link>
  );
};

export default MovieCard;