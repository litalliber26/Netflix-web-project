import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Fetch all categories
export const getUserById = (id) => {
  return axios.get(`${API_URL}/users/${id}`);
};