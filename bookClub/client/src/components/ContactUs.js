import React from 'react';
import Header from './Header';

const ContactUs = () => {
  const members = [
    { name: "Ran Polac", email: "ranpolac@gmail.com" },
    { name: "Omri Shalev", email: "omrishalev@gmail.com" },
    { name: "Tanya Gendelman", email: "tanya@gmail.com" },
    { name: "Almog Kadosh", email: "almog@gmail.com" }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Header header='Contact Us' />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {members.map((member, index) => (
          <div key={index} style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ marginTop: '0', marginBottom: '10px', fontSize: '40px', color: 'blue' }}>{member.name}</h3>
            <p style={{ marginTop: '0', fontSize: '24px', color: 'green' }}>Email: {member.email}</p>
          </div>
        ))}
      </div>
      {/* Your contact form and other content can go here */}
    </div>
  );
};

export default ContactUs;