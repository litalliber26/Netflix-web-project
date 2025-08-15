import React, { useState } from 'react';
import { deleteMovie } from '../services/adminService';
import { useUserContext } from '../context/UserContext';
import './AdminDeleteMovie.css';

const AdminDeleteMovie = () => {
  const [movieId, setMovieId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { currentUserToken } = useUserContext();

  const handleInputChange = (e) => {
    setMovieId(e.target.value);
    setError('');
    setSuccess('');
    setShowConfirm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!movieId) {
      setError('Movie ID is required!');
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);
      const response = await deleteMovie(movieId, currentUserToken);
      setSuccess('Movie deleted successfully!');
      console.log('Response from server:', response.data);
      
      // Reset form
      setMovieId('');
      setShowConfirm(false);
      
    } catch (err) {
      console.error('Error deleting movie:', err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="delete-movie-container">
      <h2 className="delete-movie-title">Delete Movie</h2>
      
      {error && <div className="delete-movie-error">{error}</div>}
      {success && <div className="delete-movie-success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="delete-movie-form">
        <div className="form-group">
          <label htmlFor="movieId">Movie ID:</label>
          <input
            type="text"
            id="movieId"
            value={movieId}
            onChange={handleInputChange}
            className="form-input"
            disabled={showConfirm}
          />
        </div>

        {!showConfirm && (
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            Delete Movie
          </button>
        )}
      </form>

      {showConfirm && (
        <div className="confirmation-dialog">
          <p className="confirmation-message">
            Are you sure you want to delete this movie? This action cannot be undone.
          </p>
          <div className="confirmation-buttons">
            <button 
              onClick={handleConfirmDelete} 
              className="confirm-button"
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button 
              onClick={handleCancelDelete} 
              className="cancel-button"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDeleteMovie;