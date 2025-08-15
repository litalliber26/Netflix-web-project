import React, { useState } from 'react';
import { updateCategory } from '../services/adminService';
import { useUserContext } from '../context/UserContext';
import './AdminUpdateCategory.css';

const AdminUpdateCategory = () => {
  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
  });
  const [promotedStatus, setPromotedStatus] = useState(null); // null means unchanged
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { currentUserToken } = useUserContext();

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePromotedChange = (value) => {
    setPromotedStatus(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.categoryId.trim() || !formData.name.trim()) {
      setError('Category ID and name are required!');
      return;
    }

    try {
      setIsLoading(true);
      const updateData = {
        name: formData.name
      };

      // Only include promoted if it was explicitly set
      if (promotedStatus !== null) {
        updateData.promoted = promotedStatus;
      }

      const response = await updateCategory(formData.categoryId, updateData, currentUserToken);
      setSuccess('Category updated successfully!');
      console.log('Response from server:', response.data);
      
      // Reset form
      setFormData({
        categoryId: '',
        name: ''
      });
      setPromotedStatus(null);
      
    } catch (err) {
      console.error('Error updating category:', err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="update-category-container">
      <h2 className="update-category-title">Update Category</h2>
      
      {error && <div className="update-category-error">{error}</div>}
      {success && <div className="update-category-success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="update-category-form">
        <div className="form-group">
          <label htmlFor="categoryId">Category ID:</label>
          <input
            type="text"
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">New Category Name:</label>
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
          <label className="promoted-label">Promoted Status:</label>
          <div className="promoted-buttons">
            <button
              type="button"
              onClick={() => handlePromotedChange(true)}
              className={`promoted-button ${promotedStatus === true ? 'active' : ''}`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => handlePromotedChange(false)}
              className={`promoted-button ${promotedStatus === false ? 'active' : ''}`}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => handlePromotedChange(null)}
              className={`promoted-button ${promotedStatus === null ? 'active' : ''}`}
            >
              Don't Change
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Category'}
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateCategory;