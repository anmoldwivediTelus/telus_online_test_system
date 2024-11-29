import React, { useEffect } from "react";
import "./ExitPage.css";

const ExitPage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to a blank white screen by replacing the page content
      document.body.innerHTML = ""; // Clear the entire page content
      document.body.style.backgroundColor = "white"; // Set background to white
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div className="thank-you-page">
      <h1>Thank you for taking the test!</h1>
      <p>Your answers have been recorded.</p>
      <p>The screen will go blank in 5 seconds.</p>
    </div>
  );
};

export default ExitPage;
