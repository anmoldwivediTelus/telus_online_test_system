import React, { useState } from 'react';
import './SideNavBar.css';
import CandidateProfile from './CandidateProfile';
import OnlineTestInstructions from './OnlineTestInstructions';

function SideNavBar() {
  const [selectedOption, setSelectedOption] = useState('profile');

  return (
    <div className="home-container">
      {/* Sidebar with options */}
      <div className="sidebar">
        <ul>
        <li 
            className={selectedOption === 'dashboard' ? 'active' : ''} 
            // onClick={() => setSelectedOption('profile')}
          >
            Dashboard
          </li>
          <li 
            className={selectedOption === 'profile' ? 'active' : ''} 
            onClick={() => setSelectedOption('profile')}
          >
            Candidate Profile
          </li>
          <li 
            className={selectedOption === 'test' ? 'active' : ''} 
            onClick={() => setSelectedOption('test')}
          >
            Online Test
          </li>
          <li 
            className={selectedOption === 'updateprofile' ? 'active' : ''} 
            // onClick={() => setSelectedOption('profile')}
          >
            Update Profile
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="main-content">
        {selectedOption === 'profile' ? (
          <CandidateProfile />
        ) : (
          <OnlineTestInstructions />
        )}
      </div>
    </div>
  );
}

export default SideNavBar;
