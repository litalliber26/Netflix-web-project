import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieInformationScreen from './screens/MovieInformationScreen';
import SearchScreen from './screens/SearchScreen';
import AdminScreen from './screens/AdminScreen';
import Screen6 from './screens/MoviePlayerScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import { getUserById } from './services/userService';
import MainScreenAfterLogin from './screens/MainScreenAfterLogin';
import MainScreenBeforeLogin from './screens/MainScreenBeforeLogin';
import Categories from './screens/Categories';
import { useUserContext } from './context/UserContext';

function App() {
  const {
    setIsAuthenticated,
    setCurrentUser,
    setCurrentUserToken,
  } = useUserContext();

const handleLogin = async (authData) => {
    try {
      const userResponse = await getUserById(authData.user_id);
      setCurrentUser(userResponse.data);
      setCurrentUserToken(authData.access_token);
      setIsAuthenticated(true);
    }
    catch(error) {
      console.error(error);
      setIsAuthenticated(false);
    }
};

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
        <Route path="/movie/:id" element={<MovieInformationScreen />} />
        <Route path="/movie/video/:id" element={<Screen6 />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/" element={<MainScreenBeforeLogin />} />
        <Route path="/main" element={<MainScreenAfterLogin />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  );
}

export default App;
