import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const SecondHeader = () => {
  const { auth, logout } = useContext(AuthContext);
  const isLoggedIn = !!auth?.user; // Check if the user object is present to confirm login
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/'); // Redirect to home after logout
  };

  return (
    <div className="flex justify-end items-center">
        <Link to="/about" className="button-style mr-4">About</Link>
        <Link to="/contactus" className="button-style">Contact Us</Link>
        {isLoggedIn ? (
            <>
                <button className="button-style" onClick={handleLogout}>Log Out</button>
                <span className="welcome-message">Welcome, {auth.user}</span>
            </>
        ) : (
            <>
                <Link to="/signup" className="button-style mr-4">Sign Up</Link>
                <Link to="/signin" className="button-style">Sign In</Link>
            </>
        )}
    </div>
  );
};

export default SecondHeader;
