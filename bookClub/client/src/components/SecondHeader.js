import React from 'react'
import { Link } from 'react-router-dom'; 

const SecondHeader = () => {
  return (
    <div className="flex justify-end items-center"> 
        <Link to="/signup" className="button-style mr-4">Sign Up</Link>
        <Link to="/signin" className="button-style mr-4">Sign In</Link>
        <Link to="/about" className="button-style mr-4">About</Link>
        <Link to="/contactus" className="button-style">Contact Us</Link>
     </div>  )
}

export default SecondHeader