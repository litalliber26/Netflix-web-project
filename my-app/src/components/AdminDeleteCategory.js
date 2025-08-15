import React, { useState } from 'react';
import { deleteCategory } from '../services/adminService';
import { useUserContext } from '../context/UserContext';
import './AdminDeleteCategory.css';

const AdminDeleteCategory = () => {
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { currentUserToken } = useUserContext();

  const handleInputChange = (e) => {
    setCategoryId(e.target.value);
    setError('');
    setSuccess('');
    setShowConfirm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!categoryId) {
      setError('Category ID is required!');
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);
      const response = await deleteCategory(categoryId, currentUserToken);
      setSuccess('Category deleted successfully!');
      console.log('Response from server:', response.data);
      
      // Reset form
      setCategoryId('');
      setShowConfirm(false);
      
    } catch (err) {
      console.error('Error deleting category:', err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="delete-category-container">
      <h2 className="delete-category-title">Delete Category</h2>
      
      {error && <div className="delete-category-error">{error}</div>}
      {success && <div className="delete-category-success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="delete-category-form">
        <div className="form-group">
          <label htmlFor="categoryId">Category ID:</label>
          <input
            type="text"
            id="categoryId"
            value={categoryId}
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
            Delete Category
          </button>
        )}
      </form>

      {showConfirm && (
        <div className="confirmation-dialog">
          <p className="confirmation-message">
            Are you sure you want to delete this category? This action cannot be undone.
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

export default AdminDeleteCategory;
