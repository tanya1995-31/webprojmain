import React from 'react';
import Header from './Header';
import RanP from '../images/RanP.jpg';
import Omri from '../images/Omri.jpg';
import Tanya from '../images/Tanya.jpg';
import Almog from '../images/Almog.jpg';

const About = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <Header header='About Us'/>
      <p style={{ marginTop: '20px', fontSize: '35px', lineHeight: '1.5' }}>
        Welcome to our Book Club! We are a team of passionate software engineering students dedicated to creating the best place for your online books.
      </p>
      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '36px', color: '#007bff', marginBottom: '20px' }}>Meet Our Team</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <div style={{ marginBottom: '20px', flexBasis: '25%' }}>
              <img src={Omri} alt="Omri Shalev" style={{ width: '200px', borderRadius: '50%', marginBottom: '10px' }} />
              <p><strong>Omri Shalev</strong></p>
              <p>Email: omri.shalev@example.com</p>
              <p>Founder & Developer</p>
            </div>
            <div style={{ marginBottom: '20px', flexBasis: '25%' }}>
              <img src={Tanya} alt="Tanya Gendelman" style={{ width: '200px', borderRadius: '50%', marginBottom: '10px' }} />
              <p><strong>Tanya Gendelman</strong></p>
              <p>Email: tanya.gendelman@example.com</p>
              <p>Founder & Project Manager</p>
            </div>
            <div style={{ marginBottom: '20px', flexBasis: '25%' }}>
              <img src={Almog} alt="Almog Kadosh" style={{ width: '200px', borderRadius: '50%', marginBottom: '10px' }} />
              <p><strong>Almog Kadosh</strong></p>
              <p>Email: almog.kadosh@example.com</p>
              <p>Founder & Lead Designer</p>
            </div>
            <div style={{ marginBottom: '20px', flexBasis: '25%' }}>
              <img src={RanP} alt="Ran Polac" style={{ width: '200px', borderRadius: '50%', marginBottom: '10px' }} />
              <p><strong>Ran Polac</strong></p>
              <p>Email: ran.polac@example.com</p>
              <p>Founder & Developer</p>
            </div>
          </div>
          <p style={{ marginTop: '50px', fontSize: '30px', lineHeight: '1.5' }}>
            We are students passionate about software engineering and dedicated to creating innovative solutions. Our team strives to provide the best online book experience for our users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;