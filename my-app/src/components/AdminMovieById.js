import React, { useState } from 'react';
import './AdminMovieById.css';
import { useUserContext } from '../context/UserContext';
import {
  getMovieById,
} from '../services/adminService';

const AdminMovieById = () => {
  const [movieId, setMovieId] = useState(null);
  const [error, setError] = useState('');
  const [movie, setMovie] = useState(null);

  const { currentUserToken, currentUser, isDarkMode, setIsDarkMode } = useUserContext();
  const handle = async () => {
    const movieByIdResult = await getMovieById(movieId, currentUserToken)
    setMovie(movieByIdResult.data);
  };
  return (
    <div>
      <input type='text' onChange={(e) => setMovieId(e.target.value)} value={movieId} />
      <button onClick={handle}>Get</button>
      {movie ? 
        (<div key={movie.id} className="movie-card">
        <img
          src={movie.pictureUrl}
          alt={movie.name}
          className="movie-image"
        />
        <p className="movie-name">{movie.name}</p>
      </div>) : null
      } 
    </div>
  )};
  
  export default AdminMovieById;