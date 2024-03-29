import { createContext, useState, useContext } from "react";
import axios from "../api/axios";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    // Check login status
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get('/api/verify', { withCredentials: true });
            const { isLoggedIn, username } = response.data;
            if (isLoggedIn) {
                setAuth({ user: username });
            } else {
                setAuth({});
            }
        } catch (error) {
            // Silent handling of unauthorized errors, updating state to reflect not logged in.
            if (error.response?.status === 401) {
                setAuth({});
            } else {
                // Log other errors for debugging purposes.
                console.error('Unexpected error during auth verification:', error);
            }
        }
    };

    // Logout function that also tells the server to clear the cookie
    const logout = async () => {
        try {
          // Make a POST request to the server to log the user out
          await axios.post('/api/logout', {}, { withCredentials: true });
          // Clear the authentication state
          setAuth({});
        } catch (error) {
          console.error('Logout failed:', error);
        }
        await checkLoginStatus();
    };
    
    return (
        <AuthContext.Provider value={{ auth, setAuth, logout, checkLoginStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
