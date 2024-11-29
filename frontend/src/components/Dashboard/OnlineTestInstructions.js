import React from "react";
import { useNavigate } from "react-router-dom";
import "./OnlineTestInstructions.css";

function OnlineTestInstructions() {
  const navigate = useNavigate();

  // Function to start the test and switch to full-screen mode
  const startTest = () => {
    const element = document.documentElement; // Get the root HTML element

    // Request full-screen mode
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      /* For Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* For Chrome, Safari, and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* For IE/Edge */
      element.msRequestFullscreen();
    }

    // Navigate to the test page
    navigate("/test");
  };

  return (
    <div className="main">
      <h2 className="head">INSTRUCTIONS FOR THE TEST (MCQ)</h2>
      <div>
        <ol className="list">
          <li>Read the instructions carefully before starting the test.</li>
          <li>You have 30 mins to complete the test.</li>
          <li>The test contains a total of 10 questions.</li>
          <li>
            Do not close/refresh/logout the browser once you have started the
            test.
          </li>
          <li>
            Ensure you have a stable internet connection, as once disconnected,
            you will not be able to restart the test.
          </li>
        </ol>
      </div>
      <div className="buttonGroup">
        <button className="buttons" onClick={startTest}>
          Start the test
        </button>
      </div>
    </div>
  );
}

export default OnlineTestInstructions;
