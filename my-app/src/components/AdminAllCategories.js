
import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../services/adminService';
import { useUserContext } from '../context/UserContext';
import CategoryCard from './CategoryCard';
import './AdminAllCategories.css';


const AdminAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { currentUserToken, currentUser, isDarkMode } = useUserContext();

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError('');
      const result = await getAllCategories(currentUserToken);
      setCategories(result.data);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="admin-categories-container">
      <div className="admin-categories-header">
        <h2 className="admin-categories-title">All Categories</h2>
        <button 
          onClick={fetchCategories}
          className="admin-categories-refresh-btn"
        >
          Refresh
        </button>
      </div>

      {isLoading && (
        <p className="admin-categories-loading">Loading categories...</p>
      )}

      {error && (
        <p className="admin-categories-error">{error}</p>
      )}

      <div className="admin-categories-grid">
        {categories.map((category) => (
          <CategoryCard 
            key={category._id} 
            category={category}
          />
        ))}
      </div>

      {!isLoading && !error && categories.length === 0 && (
        <p className="admin-categories-empty">No categories found</p>
      )}
    </div>
  );
};

export default AdminAllCategories;