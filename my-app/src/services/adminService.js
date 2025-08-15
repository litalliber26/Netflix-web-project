import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Fetch all categories
export const getAllCategories = (currentUserToken) => {
  return axios.get(`${API_URL}/categories`, {
    headers: { Authorization: `Bearer ${currentUserToken}` }
  });
};

// Get movie by ID
export const getMovieById = (id, currentUserToken) => {
  return axios.get(`${API_URL}/movies/${id}`, {
    headers: { Authorization: `Bearer ${currentUserToken}` }
  });
};


// Get category by ID
export const getCategoryById = (id, currentUserToken) => {
  return axios.get(`${API_URL}/categories/${id}`, {
    headers: { Authorization: `Bearer ${currentUserToken}` }
  });
};

// Create new category
export const createCategory = (data, currentUserToken) => {
  return axios.post(`${API_URL}/categories`, data, {
    headers: { Authorization: `Bearer ${currentUserToken}` }
  });
};

// Update category
export const updateCategory = async (id, data, currentUserToken) => {
  try {
    const response = await axios.patch(`${API_URL}/categories/${id}`, data, {
      headers: { Authorization: `Bearer ${currentUserToken}`,
        'Content-Type': 'application/json',
      }
    });
    return response;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Delete category
export const deleteCategory = (id, currentUserToken) => {
  return axios.delete(`${API_URL}/categories/${id}`, {
    headers: { Authorization: `Bearer ${currentUserToken}` }
  });
};

// Create new movie
export const createMovie = (data, currentUserToken) => {
  return axios.post(`${API_URL}/movies`, data, {
    headers: { Authorization: `Bearer ${currentUserToken}` }
  });
};


// Update movie
export const updateMovie = (id, data, currentUserToken) => {
  return axios.put(`${API_URL}/movies/${id}`, data, {
    headers: { Authorization: `Bearer ${currentUserToken}` }
  });
};

// Delete movie
export const deleteMovie = (id, currentUserToken) => {
  return axios.delete(`${API_URL}/movies/${id}`, {
    headers: { Authorization: `Bearer ${currentUserToken}` }
  });
};