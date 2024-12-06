import React, {useState} from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './ExitPage.css';
import axios from 'axios';

const ExitPage = () => {
  const [data, setData] = useState(null);
  // const [updatedData, setUpdatedData] = useState(null);  // You will need to manage `updatedData`

  // Fetch user data on component mount
  useEffect(() => {
    axios.get("http://localhost:4000/api/users/3")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array, so it runs only on mount

  const updatedData={...data, isTestDone: true}

  // Update user data if updatedData is set
  useEffect(() => {
    if (updatedData) {
      axios.put(`http://localhost:4000/api/users/3`, updatedData)
        .then((response) => {
          console.log("Data updated successfully:", response.data.user.id);
          // Optionally, you can update the data in state with the new response
          setUserIndex(response.data.user.id)
          setData(response.data);
        })
        .catch((error) => console.error("Error updating data:", error));
    }
  }, []);




  return (
    <div className="thank-you-page">
      <h1>Thank you for taking the test!</h1>
      <p>Your answers have been recorded.</p>
      <button className="btn exitbtn">Exit</button>
    </div>
  );
};

export default ExitPage;
