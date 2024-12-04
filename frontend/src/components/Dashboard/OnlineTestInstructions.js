import React from 'react';
import useHistory, { useLocation,useNavigate } from 'react-router-dom'
import './OnlineTestInstructions.css';

function OnlineTestInstructions() {
  const navigate = useNavigate();
  const location = useLocation();
  const testId = location.state?.testId; // Retrieve test ID from state

  const handleStartTest = () => {
    if (testId) {
      navigate(`/test/${testId}`); // Redirect to test page with ID
    } else {
      alert('Test ID not found.');
    }
  };

  return (
    <div className='main'>
      <h2 className='head'>INSTRUCTIONS FOR THE TEST (MCQ)</h2>
      <div>
        <ol className='list'>
          <li>Read the instructions carefully before starting the test.</li>
          <li>You have 30 mins to complete the test.</li>
          <li>The test contains a total of 10 questions.</li>
          <li>Do not close/refresh/logout the browser once you have started the test.</li>
          <li>Ensure you have a stable internet connection, as once disconnected, you will not be able to restart the test.</li>
        </ol>
      </div>
      <div className='buttonGroup'>
        <button className='buttons' onClick={handleStartTest}>Start the test</button>
      </div>
    </div>
  );
}

export default OnlineTestInstructions;
