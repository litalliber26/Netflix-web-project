import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserToken, setCurrentUserToken] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true); // State for theme

    return (
      <UserContext.Provider value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
        currentUserToken,
        setCurrentUserToken,
        isDarkMode,
        setIsDarkMode
      }}>
        {children}
      </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);