import React, { useState } from 'react';
import { createCategory } from '../services/adminService';
import { useUserContext } from '../context/UserContext';
import './AdminCreateCategory.css';

const AdminCreateCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    promoted: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { currentUserToken } = useUserContext();

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setError('Category name is required!');
      return;
    }

    try {
      setIsLoading(true);
      const response = await createCategory(formData, currentUserToken);
      setSuccess('Category created successfully!');
      console.log('Response from server:', response.data);
      
      // Reset form
      setFormData({
        name: '',
        promoted: false
      });
      
    } catch (err) {
      console.error('Error creating category:', err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-category-container">
      <h2 className="create-category-title">Create New Category</h2>
      
      {error && <div className="create-category-error">{error}</div>}
      {success && <div className="create-category-success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="create-category-form">
        <div className="form-group">
          <label htmlFor="name">Category Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group-checkbox">
          <label htmlFor="promoted" className="checkbox-label">
            <input
              type="checkbox"
              id="promoted"
              name="promoted"
              checked={formData.promoted}
              onChange={handleInputChange}
              className="form-checkbox"
            />
            <span className="checkbox-text">Promoted Category</span>
          </label>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Category'}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateCategory;