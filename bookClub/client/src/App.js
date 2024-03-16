import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import About from './components/About';
import ContactUs from './components/ContactUs';
import { AuthProvider } from './context/AuthProvider'; // Import the AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<ContactUs />} />
            {/*<Route path="/books/:title/:author/:imgSrc" element={<ViewBook />} />*/}

            {/* Add other routes as needed */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
