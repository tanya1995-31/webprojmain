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
    <div className="flex justify-end items-center py-3 bg-blue-500 text-white">
      <Link to="/about" className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-white hover:text-blue-500 transition-colors mr-4">About</Link>
      <Link to="/contactus" className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-white hover:text-blue-500 transition-colors mr-4">Contact Us</Link>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-white hover:text-blue-500 transition-colors">Log Out</button>
          <span className="mr-4 text-sm font-semibold">Welcome, {auth.user}</span>
        </>
      ) : (
        <>
          <Link to="/signup" className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-white hover:text-blue-500 transition-colors mr-4">Sign Up</Link>
          <Link to="/signin" className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-white hover:text-blue-500 transition-colors">Sign In</Link>
        </>
      )}
    </div>
  );
};

export default SecondHeader;
