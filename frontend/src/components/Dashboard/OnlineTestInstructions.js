import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OnlineTestInstructions.css';
import { useParams } from "react-router"


function OnlineTestInstructions() {
  const navigate = useNavigate();
  const location = useLocation();
  const testId = location.state?.testId; // Retrieve test ID from state
  const userId = new URLSearchParams(location.search).get('userId'); // Get userId from query params
  const [userName, setUserName] = useState('');
  let params = useParams()
  
  console.log(params.userId)

  localStorage.setItem("userId", params.userId)
  localStorage.setItem("testId", params.id)

  

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:4000/api/users/${userId}`)
        .then(response => {
          setUserName(response.data.name);
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }, [userId]);

  const handleStartTest = () => {
    console.log(params.userId)
      navigate(`/test/${params.id}`); // Redirect to test page with ID
    
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
