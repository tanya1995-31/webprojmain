import React, { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth) : null;
    });

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const response = await fetch('/api/verify', {
                method: 'GET',
                credentials: 'include' // This sends any HTTP-only cookies back to the server
            });
    
            if (!response.ok) {
                throw new Error('Not logged in');
            }
    
            const data = await response.json();
            if (data.isLoggedIn) {
                setAuth(data.user);
            } else {
                setAuth(null);
            }
        } catch (error) {
            console.error('Error during auth verification:', error);
            setAuth(null);
        }
    };
    
    // Function to update favorite books in the global context
    const updateFavoriteBooks = (newFavoriteBooks) => {
        if (auth) {
            setAuth({...auth,favoriteBooks: newFavoriteBooks});
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/logout', { 
                method: 'POST', 
                credentials: 'include' 
            });
            setAuth(null);
            localStorage.removeItem('auth'); // Remove auth from local storage
            Cookies.remove('isLoggedIn'); // Remove isLoggedIn cookie
            Cookies.remove('username'); // Remove username cookie
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    
    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout, checkLoginStatus, updateFavoriteBooks }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
