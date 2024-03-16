import { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

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
    };

    // Check login status
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get('/api/verify', { withCredentials: true });
            const { isLoggedIn, username } = response.data;
            if (isLoggedIn) {
                setAuth({ user: username });
            } else {
                setAuth(null);
            }
        } catch (error) {
            console.error('Auth verification failed:', error);
            setAuth(null);
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
