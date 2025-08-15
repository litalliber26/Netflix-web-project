import React, { useState } from 'react';
import { createMovie } from '../services/adminService';
import { useUserContext } from '../context/UserContext';
import './AdminCreateMovie.css';

const AdminCreateMovie = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    picture: null,
    video: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { currentUserToken } = useUserContext();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.category || !formData.picture || !formData.video) {
      setError('All fields are required!');
      return;
    }

    const submitFormData = new FormData();
    submitFormData.append('name', formData.name);
    submitFormData.append('category', formData.category);
    submitFormData.append('uploaded_picture', formData.picture);
    submitFormData.append('uploaded_movie', formData.video);

    try {
      setIsLoading(true);
      const response = await createMovie(submitFormData, currentUserToken);
      setSuccess('Movie created successfully!');
      console.log('Response from server:', response.data);
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        picture: null,
        video: null
      });
      // Reset file inputs
      e.target.reset();
      
    } catch (err) {
      console.error('Error creating movie:', err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-movie-container">
      <h2 className="create-movie-title">Create New Movie</h2>
      
      {error && <div className="create-movie-error">{error}</div>}
      {success && <div className="create-movie-success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="create-movie-form">
        <div className="form-group">
          <label htmlFor="name">Movie Name:</label>
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
          <label htmlFor="category">Movie Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="picture">Movie Picture:</label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="video">Movie Video:</label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Movie'}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateMovie;