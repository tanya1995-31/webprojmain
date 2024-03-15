import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const SecondHeader = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const renderLinks = () => {
    if (isLoggedIn) {
      return (
        <>  
          <span className="button-style mr-4">Welcome, {localStorage.getItem('username')}</span>
          <button className="button-style" onClick={logout}>Log Out</button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/signup" className="button-style mr-4">Sign Up</Link>
          <Link to="/signin" className="button-style mr-4">Sign In</Link>
        </>
      );
    }
  };

  return (
    <div className="flex justify-end items-center">
      {renderLinks()}
      <Link to="/about" className="button-style mr-4">About</Link>
      <Link to="/contactus" className="button-style">Contact Us</Link>
    </div>
  );
};

export default SecondHeader;
