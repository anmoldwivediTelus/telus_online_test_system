import React from 'react'
import { useEffect, useState } from 'react';
import { IoMdTime } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Timer({handleFinishClick }) {

    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(3600);
      // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      // Redirect to exit page when time runs out
      navigate("/exit");
    }
  }, [timeLeft, navigate]);

  // Format time as mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="rightbox timer">
          <div className="timebox">
            <IoMdTime />
            {formatTime(timeLeft)}
          </div>
          <button className="finish-button" onClick={handleFinishClick}>
            Finish Test
          </button>
        </div>
  )
}

export default Timer