import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem('token') || null, // Retrieve token from localStorage
  });

  // Automatically log the user in if a token is present
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, you could decode the token here to extract the user details
      setAuth((prevAuth) => ({
        ...prevAuth,
        token,
      }));
    }
  }, []);

  const login = (userData) => {
    setAuth({
      user: userData.user,
      token: userData.token,
    });
    localStorage.setItem('token', userData.token); // Store token in localStorage
  };

  const logout = () => {
    setAuth({
      user: null,
      token: null,
    });
    localStorage.removeItem('token'); // Clear token from localStorage
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
