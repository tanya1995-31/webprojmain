import React from 'react';
import Header from './Header';

const About = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <Header header='About us'/>
      <p style={{ marginTop: '20px', fontSize: '50px' }}>
        Welcome to our website! We are a dedicated team passionate about creating innovative solutions for our clients. 
        Our mission is to deliver high-quality products that exceed expectations and provide exceptional service.
      </p>
      <p style={{ marginTop: '20px', fontSize: '100px', color: 'red' }}>
        Meet our team:
      </p>
      <ul style={{ fontSize: '30px', textAlign: 'left', margin: '0 auto', maxWidth: '600px', padding: '0' }}>
        <li>Ran Polac - Founder & Developer</li>
        <li>Omri Shalev - Lead Designer</li>
        <li>Tanya Gendelman - Marketing Specialist</li>
        <li>Almog Kadosh - Project Manager</li>
      </ul>
    </div>
  );
};

export default About;