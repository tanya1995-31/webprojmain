import React, { useState } from 'react';
import Header from './Header';

const ContactUs = ({isDarkMode}) => {
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
      await fetch('http://localhost:5000/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          userName,
          message,
          time: new Date(),
        })
      });

      setIsSubmitted(true);
      setMessage('');
      setUserName('');
      setTimeout(() => setIsSubmitted(false), 5000); // Reset submission status after 5 seconds
    } catch (error) {
      console.error("Failed to submit message:", error);
    }
  };

    // Styles
  const memberContainerStyle = `p-2 rounded-md border ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`;
  const memberTextStyle = `font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`;
  const memberEmailStyle = `text-blue-500 ${isDarkMode ? 'dark:text-blue-400' : ''}`;
  const inputStyle = `block w-full px-4 py-2 rounded-md mb-4 border ${isDarkMode ? 'bg-gray-600 text-white border-gray-600' : 'text-gray-700 border-gray-300'}`;
  const buttonStyle = `w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300`;

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center py-12`}>
      <Header header='Contact Us' isDarkMode={isDarkMode}/>
      <section className="w-full max-w-2xl px-6">
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className={`${memberContainerStyle} flex justify-between items-center`}>
              <p className={memberTextStyle}>{member.name}</p>
              <p className={memberEmailStyle}>{member.email}</p>
            </div>
          ))}
        </div>
        {isSubmitted && (
          <div className={`bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-6 ${isDarkMode ? 'dark:bg-green-700 dark:border-green-900 dark:text-green-200' : ''}`} role="alert">
            Thank you for your message!
          </div>
        )}
        <form onSubmit={handleSubmit} className={`mt-6 p-8 rounded-lg shadow-md border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
          <label htmlFor="userName" className={memberTextStyle}>Your Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name..."
            className={inputStyle}
          />
          <label htmlFor="message" className={memberTextStyle}>Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            className={inputStyle}
          ></textarea>
          <button type="submit" className={buttonStyle}>
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
