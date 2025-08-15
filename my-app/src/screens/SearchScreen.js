import React, { useState } from 'react';
import { searchMovies } from '../services/movieService';
import '../screens/SearchScreen.css';
import { useUserContext } from '../context/UserContext';
import MainMenu from '../components/MainMenu';
import MovieCard from '../components/MovieCard';

function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const { isDarkMode } = useUserContext();

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setResults([]);
      setError('');
      return;
    }
    try {
      const response = await searchMovies(searchTerm);
      if (response.data.length === 0) {
        setError('No results found.');
        setResults([]);
      } else {
        setResults(response.data);
        setError('');
      }
    } catch (err) {
      if(err.status === 404) {
        setError('No results found.');
        setResults([]);
        return;
      }
      console.error('Error fetching search results:', err);
      setError('Failed to load search results.');
      setResults([]);
    }
  };

  return (
    <div className='page-layout'>
    <MainMenu />
    <div className={isDarkMode ? "search-container dark-mode" : "search-container light-mode"}>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>
          🔍
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      
        {results.length > 0 && (
          <div className="movies-grid">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
          ))}
          </div>
        )}
    </div>
    </div>
  );
}

export default SearchScreen;
