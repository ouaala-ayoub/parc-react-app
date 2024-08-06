import React, { createContext, useState, useEffect, useContext } from "react";
import Loader from "../components/Loader";

// Create an AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Create an AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // `null` means no user is logged in
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user")); // Or fetch from API
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Error checking authentication", error);
      } finally {
        setLoading(false); // Stop loading after checking
      }
    };

    checkAuth();
  }, []);

  // Log in function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage or API
  };

  // Log out function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove from localStorage or API
  };

  // Check if the user is logged in
  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {loading ? <Loader></Loader> : children}
    </AuthContext.Provider>
  );
};
