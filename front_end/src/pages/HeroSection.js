import React from 'react';
import '../styles/HeroSection.css';
import image from '../components/assets/phones.png'

const App = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>nGomna</h1>
        <p>The Citizens closer to the Government!.</p>
      </div>
      <div className="hero-image">
        <img src= {image} alt="Hero" />
      </div>
    </div>
  );
}

export default App;
