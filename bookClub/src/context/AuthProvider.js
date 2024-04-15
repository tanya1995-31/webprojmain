import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        console.log("Checking login status...");
        try {
            const response = await fetch('/api/verify', {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }
            const data = await response.json();
            if (data.isLoggedIn) {
                setAuth(data.user);  // Ensure this is the user object as expected elsewhere
            } else {
                setAuth(null);
            }
        } catch (error) {
            console.error('Error during auth verification:', error);
            setAuth(null);
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/logout', { 
                method: 'POST', 
                credentials: 'include' 
            });
            setAuth(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    
    return (
        <AuthContext.Provider value={{ auth, setAuth, logout, checkLoginStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
