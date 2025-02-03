import React, { useState } from 'react';

// Importing images
import image1 from '../components/assets/1.webp';
import image2 from '../components/assets/2.webp';
import image3 from '../components/assets/3.webp';

const ImagePopup = ({ imageSrc, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content">
        <img src={imageSrc} alt="Popup" />
      </div>
    </div>
  );
};

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const handleImageClick = (src) => {
    setImageSrc(src);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setImageSrc('');
  };

  return (
    <div>
      <h1>Image Popup Example</h1>
      <div className="image-gallery">
        <img
          src={image1}
          alt="Image 1"
          onClick={() => handleImageClick(image1)}
        />
        <img
          src={image2}
          alt="Image 2"
          onClick={() => handleImageClick(image2)}
        />
        <img
          src={image3}
          alt="Image 3"
          onClick={() => handleImageClick(image3)}
        />
      </div>

      {isPopupOpen && <ImagePopup imageSrc={imageSrc} onClose={handleClosePopup} />}
    </div>
  );
};

export default App;
