import axios from 'axios';

const BASE_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
const API_URL = BASE_API_URL + '/movies';

export const getMovieById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const getRecommendations = (id, currentUserToken) => {
  return axios.get(`${API_URL}/${id}/recommend`, {
    headers: { Authorization: `Bearer ${currentUserToken}` }
  });
};

export const searchMovies = (query) => {
  return axios.get(`${API_URL}/search/${query}`);
};

  export const updateCategory = async (id, data, currentUserToken) => {
    try {
      if (!id) {
        throw new Error("Category ID is required");
      }
  
      console.log("Updating Category ID:", id);
      console.log("Data to update:", data);
  
      const response = await axios.patch(`${BASE_API_URL}/categories/${id}`, data, {
        headers: {
          Authorization: `Bearer ${currentUserToken}` ,
          'Content-Type': 'application/json' // Ensure JSON data is sent
        }
      });
  
      console.log("Update response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error.response ? error.response.data : error.message);
      throw error;
    }
  
    
  };

  export const addWatchedMovie = async (movieId, currentUserToken) => {
    try {
      const response = await axios.post(
        `${API_URL}/${movieId}/recommend`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUserToken}`, 
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding watched movie:", error);
      throw error;
    }
  };
  


  
  
  
  

  
  

