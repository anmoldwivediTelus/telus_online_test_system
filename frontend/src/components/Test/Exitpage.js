import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './ExitPage.css';

const ExitPage = () => {
  return (
    <div className="thank-you-page">
      <h1>Thank you for taking the test!</h1>
      <p>Your answers have been recorded.</p>
      <button className="btn">Exit</button>
    </div>
  );
};

export default ExitPage;
