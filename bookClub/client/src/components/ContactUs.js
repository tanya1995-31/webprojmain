import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed and imported for HTTP requests

const ContactUs = () => {
  const members = [
    { id: 1, name: "Ran Polac", email: "ranpolac@gmail.com" },
    { id: 2, name: "Omri Shalev", email: "omrishalev@gmail.com" },
    { id: 3, name: "Tanya Gendelman", email: "tanya@gmail.com" },
    { id: 4, name: "Almog Kadosh", email: "almog@gmail.com" }
  ];

  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/message', { 
        userName,
        message,
        time: new Date(),
      });

      setIsSubmitted(true);
      setMessage('');
      setUserName('');
      setTimeout(() => setIsSubmitted(false), 5000); // Reset submission status after 5 seconds
    } catch (error) {
      console.error("Failed to submit message:", error);
    }
  };

  return (
    <div className="App">
      <section>
        <h1>Contact Us</h1>
        <div className="members-info ">
          {members.map((member) => (
            <div key={member.id} className="member-info">
              <p>{member.name} - {member.email}</p>
            </div>
          ))}
        </div>
        {isSubmitted && <div className="submission-success">Thank you for your message!</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Your Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name..."
            className="form-input"
          />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            className="form-textarea"
          ></textarea>
          <button type="submit" className="button-style">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
