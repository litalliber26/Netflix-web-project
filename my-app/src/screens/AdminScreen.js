// Updated Screen8.js for handling Create Movie functionality
import React, { useState } from 'react';
import '../screens/AdminScreen.css';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import MainMenu from '../components/MainMenu';
import AdminMovieById from '../components/AdminMovieById';
import AdminCategoryById from '../components/AdminCategoryById';
import AdminAllCategories from '../components/AdminAllCategories';
import AdminCreateMovie from '../components/AdminCreateMovie';
import AdminUpdateMovie from '../components/AdminUpdateMovie';
import AdminDeleteMovie from '../components/AdminDeleteMovie';
import AdminCreateCategory from '../components/AdminCreateCategory';
import AdminUpdateCategory from '../components/AdminUpdateCategory';
import AdminDeleteCategory from '../components/AdminDeleteCategory';
function AdminScreen() {
  const { currentUser, isDarkMode } = useUserContext();
  const navigate = useNavigate();
  const [actionToggler, setActionToggler] = useState({
    getMovieById: false,
    getAllCategories: false,
    getCategoryById: false,
    createCategory: false,
    updateCategory: false,
    deleteCategory: false,
    createMovie: false,
    updateMovie: false,
    deleteMovie: false
  });

  // Handle admin actions
  const handleAction = (actionType) => {
    setActionToggler(Object.keys(actionToggler)
    .reduce((acc, currentValue) => ({...acc,  [currentValue]: currentValue === actionType ? true : false}), {}));
  };

  return (
    <div>
            <MainMenu />
    <div className={isDarkMode ? "admin-container dark-mode" : "admin-container light-mode"}>
      {!currentUser || (currentUser && currentUser.role !== 'Admin')  ? (
        <div className="login-section">
          <h1>You are not permitted to be here!</h1>
          <button className="action-button" onClick={() => navigate('/main')}>
              Go to Home Page
            </button>
        </div>
      ) : (
        <div className="dashboard-section">
          <h1>Welcome, {currentUser.name}! This is your Admin panel</h1>
          <h2>What would you like to do?</h2>
          <div className="button-grid">
            <button className="action-button" onClick={() => handleAction('getAllCategories')}>
              View All Categories
            </button>
            <button className="action-button" onClick={() => handleAction('getMovieById')}>
              View Movie by ID
            </button>
            <button className="action-button" onClick={() => handleAction('getCategoryById')}>
              View Category by ID
            </button>
            <button className="action-button" onClick={() => handleAction('createCategory')}>
              Create Category
            </button>
            <button className="action-button" onClick={() => handleAction('updateCategory')}>
              Update Category
            </button>
            <button className="action-button" onClick={() => handleAction('deleteCategory')}>
              Delete Category
            </button>
            <button className="action-button" onClick={() => handleAction('createMovie')}>
              Create Movie
            </button>
            <button className="action-button" onClick={() => handleAction('updateMovie')}>
              Update Movie
            </button>
            <button className="action-button" onClick={() => handleAction('deleteMovie')}>
              Delete Movie
            </button>
          </div>

          {actionToggler['getMovieById'] && <AdminMovieById />}
          {actionToggler['getCategoryById'] && <AdminCategoryById />}
          {actionToggler['getAllCategories'] && <AdminAllCategories />}
          {actionToggler['createMovie'] && <AdminCreateMovie />}
          {actionToggler['updateMovie'] && <AdminUpdateMovie />}
          {actionToggler['deleteMovie'] && <AdminDeleteMovie />}
          {actionToggler['createCategory'] && <AdminCreateCategory />}
          {actionToggler['updateCategory'] && <AdminUpdateCategory />}
          {actionToggler['deleteCategory'] && <AdminDeleteCategory />}

        </div>
      )}

      
    </div>
    </div>
  );
}

export default AdminScreen;
