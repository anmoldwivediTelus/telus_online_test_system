import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FinishDialog.css';

const FinishDialog = ({ open, handleClose }) => {
  const navigate = useNavigate();

  // Define the navigation logic here
  const handleExit = () => {
    navigate('/exit'); // Navigate to the ExitPage when "Exit" is clicked
  };

  if (!open) return null; // Only render if open is true

  return (
    <div className="finishDialogOverlay">
      <div className="finishDialog">
        <h2 className="dialogTitle">Finish Test</h2>
        <div className="dialogContent">
          <p className="dialogText">
            Are you sure you want to finish the test? You won't be able to go back.
          </p>
          <p className="dialogText">
            Once you click on "Exit," your test will be submitted, and you won't be able to continue or modify your answers.
          </p>
        </div>
        <div className="dialogActions">
          <button onClick={handleClose} className="button exitButton">
            Back
          </button>
          <button onClick={handleExit} className="button exitButton">
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishDialog;
