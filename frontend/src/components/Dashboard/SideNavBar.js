import React, { useState } from 'react';
import './SideNavBar.css';
import { FaTachometerAlt, FaUser, FaClipboardList, FaPen } from 'react-icons/fa'; // Add icons for your sidebar items
import CandidateProfile from './CandidateProfile';
import OnlineTestInstructions from './OnlineTestInstructions';
import Dashboard from './Dashboard';
import UpdateProfile from './UpdateProfile';
function SideNavBar() {
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false); // State to handle collapse

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle the collapsed state
  };

  return (
    <div className="home-container">
      {/* Sidebar with options */}
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Button to toggle collapse */}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? '☰' : '☰ '} {/* Toggle button text */}
        </button>

        <ul>
          <li 
            className={selectedOption === 'dashboard' ? 'active' : ''} 
            onClick={() => setSelectedOption('dashboard')}
          >
            {isCollapsed ? <FaTachometerAlt /> : 'Dashboard'}
          </li>
          <li 
            className={selectedOption === 'profile' ? 'active' : ''} 
            onClick={() => setSelectedOption('profile')}
          >
            {isCollapsed ? <FaUser /> : 'Candidate Profile'}
          </li>
          <li 
            className={selectedOption === 'test' ? 'active' : ''} 
            onClick={() => setSelectedOption('test')}
          >
            {isCollapsed ? <FaClipboardList /> : 'Online Test'}
          </li>
          <li 
            className={selectedOption === 'updateprofile' ? 'active' : ''} 
            onClick={() => setSelectedOption('updateprofile')}
          >
            {isCollapsed ? <FaPen /> : 'Update Profile'}
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="main-content">
        {selectedOption === 'profile' && <CandidateProfile />}
        {selectedOption === 'test' && <OnlineTestInstructions />}
        {selectedOption === 'dashboard' && <Dashboard />}
        {selectedOption === 'updateprofile' && <UpdateProfile />}
      </div>
    </div>
  );
}

export default SideNavBar;
