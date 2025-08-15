import React, { useState } from 'react';
import { updateMovie } from '../services/adminService';
import { useUserContext } from '../context/UserContext';
import './AdminUpdateMovie.css';

const AdminUpdateMovie = () => {
  const [formData, setFormData] = useState({
    movieId: '',
    name: '',
    category: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { currentUserToken } = useUserContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.movieId || !formData.name || !formData.category) {
      setError('All fields are required!');
      return;
    }

    try {
      setIsLoading(true);
      const updateData = {
        name: formData.name,
        category: formData.category
      };

      const response = await updateMovie(formData.movieId, updateData, currentUserToken);
      setSuccess('Movie updated successfully!');
      console.log('Response from server:', response.data);
      
      // Reset form
      setFormData({
        movieId: '',
        name: '',
        category: ''
      });
      
    } catch (err) {
      console.error('Error updating movie:', err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="update-movie-container">
      <h2 className="update-movie-title">Update Movie</h2>
      
      {error && <div className="update-movie-error">{error}</div>}
      {success && <div className="update-movie-success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="update-movie-form">
        <div className="form-group">
          <label htmlFor="movieId">Movie ID:</label>
          <input
            type="text"
            id="movieId"
            name="movieId"
            value={formData.movieId}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">New Movie Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">New Movie Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Movie'}
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateMovie;