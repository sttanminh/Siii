import React, { useState } from 'react';
import './App.css';

import catWallpaper from './catwallpaper.webp'; 
import catImage from './cat.png'; 
import yescat from './yescat.png'


function App() {
  const [noPosition, setNoPosition] = useState(null);
  const [noClickCount, setNoClickCount] = useState(0); // Track the number of times 'No' is clicked
  const [showPopup, setShowPopup] = useState(false); // Manage the visibility of the popup
  const [isHovering, setIsHovering] = useState(false); // New state to track hovering status
  const [showYesPopup, setShowYesPopup] = useState(false); // Manage the visibility of the yes popup


  

  const handleYesClick = () => {
    setShowYesPopup(true); // Show the yes popup
  };
  
  const handleNoClick = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);
  
    if (newCount <= 3) {
      // Prior to the fourth click, update position randomly
      const newPos = {
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      };
      setNoPosition(newPos);
    }
  
    if (newCount === 3) {
      setShowPopup(true); // Show the popup on the third click
    }
  
    if (newCount >= 4) {
      setIsHovering(true); // Start exit animation after the fourth click
    }
  };
  

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="App" style={{
      backgroundImage: `url(${catWallpaper})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      minWidth: '100vw',
    }}>
      <header className="App-header">
        <p>Do you wanna be my Valentine?</p>
        <div className="button-container">
          <button onClick={handleYesClick}>Yes</button> {/* Updated to include onClick event */}
          <button
            style={{
              position: noClickCount >= 1 ? 'absolute' : 'static',
              top: noPosition ? noPosition.top : 'auto',
              left: noPosition ? noPosition.left : 'auto',
            }}
            className={isHovering ? "no-exiting" : ""}
            onClick={handleNoClick}
          >
            No
          </button>
        </div>
        {showPopup && (
          <div className="overlay">
            <div className="popup">
              <div className="popup-content">
                <img src={catImage} alt="Popup Content" style={{ height: 'auto' }} />
                <button className="skip-ad" onClick={handleClosePopup}>Skip Ad</button>
              </div>
            </div>
          </div>
        )}
        {showYesPopup && ( // New popup for "Yes"
          <div className="overlay">
            <div className="popup">
              <div className="popup-content">
                <img src={yescat} alt="Yes Cat" style={{ height: 'auto' }} />
                {/* No "Skip Ad" button as per requirements */}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

