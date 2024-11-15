import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './ExitPage.css';

const ExitPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleExitClick = () => {
    navigate('/dashboard'); // Redirect to the Dashboard component
  };

  return (
    <div className="thank-you-page">
      <h1>Thank you for taking the test!</h1>
      <p>Your answers have been recorded.</p>
      <button className="btn" onClick={handleExitClick}>Exit</button>
    </div>
  );
};

export default ExitPage;
