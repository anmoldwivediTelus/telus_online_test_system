import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Test.css";
import ti_logo from "../../assets/img/telus_logo_digital.svg";
import FinishDialog from "./FinishDialog";
import { IoMdTime } from "react-icons/io";
import WebcamRecorder from "./WebcamVideo";

const questionsData = Array.from({ length: 40 }, (_, index) => ({
  section: Math.floor(index / 10) + 1,
  number: index + 1,
  question: `Guess the output of the following program (Question ${index + 1})`,
  code: `
#include <stdio.h>
int main() {
  int x = 10;
  float y = 10.0;
  if(x == y)
    printf("x and y are equal");
  else
    printf("x and y are not equal");
  return 0;
}
`,
  options: [
    "x and y are not equal",
    "x and y are equal",
    "Run time error",
    "Syntax error",
  ],
}));

function Test() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fullscreenWarning, setFullscreenWarning] = useState(false);

  useEffect(() => {
    // Function to handle full-screen exit
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        // If full-screen is exited, show the warning
        setFullscreenWarning(true);

        // Redirect to exit after 5 seconds if still not in full-screen
        const timer = setTimeout(() => {
          if (!document.fullscreenElement) {
            navigate("/exit");
          }
        }, 10000);

        return () => clearTimeout(timer);
      } else {
        // If the user re-enters full-screen, hide the warning
        setFullscreenWarning(false);
      }
    };

    // Enter full-screen mode when the component mounts
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }

    // Add listener for full-screen changes
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      // Cleanup listener when component unmounts
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [navigate]);

  useEffect(() => {
    // Timer logic
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      navigate("/exit"); // Redirect to exit page when time runs out
    }
  }, [timeLeft, navigate]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleOptionSelect = (option) => {
    setSelectedOptions((prev) => {
      const currentSelection = prev[currentQuestion] || [];
      if (currentSelection.includes(option)) {
        return {
          ...prev,
          [currentQuestion]: currentSelection.filter((opt) => opt !== option),
        };
      } else {
        return {
          ...prev,
          [currentQuestion]: [...currentSelection, option],
        };
      }
    });
  };

  const handleNext = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const toggleMarkForReview = () => {
    setMarkedForReview((prev) => {
      const updatedSet = new Set(prev);
      if (updatedSet.has(currentQuestion)) {
        updatedSet.delete(currentQuestion);
      } else {
        updatedSet.add(currentQuestion);
      }
      return updatedSet;
    });
  };

  const handleFinishClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    setCurrentQuestion((section - 1) * 10);
  };

  const handleRecordingSave = (videoData) => {
    console.log("Video saved to localStorage:", videoData);
  };

  // Function to re-enter full-screen mode
  const reEnterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  return (
    <div className="app">
      <header className="testheader">
        <img className="telus-logo" alt="Telus logo" src={ti_logo} />
        <div className="questionstabs nav nav-pills flex-column flex-sm-row">
          <div className="tab flex-sm-fill text-sm-center questionsTab">
            Questions: 40
          </div>
          <div className="tab flex-sm-fill text-sm-center answeredTab">
            Answered: {Object.keys(selectedOptions).length}
          </div>
          <div className="tab flex-sm-fill text-sm-center reviewTab">
            Marked for Review: {markedForReview.size}
          </div>
          <div className="tab flex-sm-fill text-sm-center skipTab">
            Skipped:{" "}
            {40 - Object.keys(selectedOptions).length - markedForReview.size}
          </div>
        </div>
        <div className="rightbox timer">
          <div className="timebox">
            <IoMdTime />
            {formatTime(timeLeft)}
          </div>
          <button className="finish-button" onClick={handleFinishClick}>
            Finish Test
          </button>
          <div className="test-page">
            <WebcamRecorder onSaveToLocalStorage={handleRecordingSave} />
          </div>
        </div>
      </header>
      {fullscreenWarning && (
        <div className="fullscreen-warning">
          <p>
            You have exited full-screen mode. Please re-enter full-screen mode
            within 10 seconds or you will be redirected.
          </p>
          <button
            className="fullscreen-reenter-button"
            onClick={reEnterFullScreen}
          >
            Re-enter Full-Screen
          </button>
        </div>
      )}
      <FinishDialog open={dialogOpen} handleClose={handleClose} />
      <div className="content">
        <aside className="sidebar testSidebar">
          <h3>Sections:</h3>
          <div className="sections">
            {[1, 2, 3, 4].map((section) => (
              <button
                key={section}
                className={`section-button ${
                  currentSection === section ? "active" : ""
                }`}
                onClick={() => handleSectionChange(section)}
              >
                Section {section}
              </button>
            ))}
          </div>
          <h3>Questions:</h3>
          <div className="question-numbers">
            {questionsData
              .filter((q) => q.section === currentSection)
              .map((q) => (
                <div
                  key={q.number}
                  className={`question-number ${
                    (selectedOptions[q.number - 1] || []).length > 0
                      ? "answered"
                      : ""
                  } ${markedForReview.has(q.number - 1) ? "review" : ""} ${
                    currentQuestion === q.number - 1 ? "active" : ""
                  }`}
                  onClick={() => setCurrentQuestion(q.number - 1)}
                >
                  {q.number}
                </div>
              ))}
          </div>
        </aside>
        <main className="question-panel">
          <h2>{questionsData[currentQuestion].question}</h2>
          <pre className="code-block">
            {questionsData[currentQuestion].code}
          </pre>
          <div className="options">
            {questionsData[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                className={`option-button ${
                  (selectedOptions[currentQuestion] || []).includes(option)
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {String.fromCharCode(65 + idx)}. {option}
              </button>
            ))}
          </div>
          <div className="actions">
            <label className="reviewcheckbox">
              <input
                type="checkbox"
                checked={markedForReview.has(currentQuestion)}
                onChange={toggleMarkForReview}
              />
              <span className="checkmark"></span>
              <span>Mark for review</span>
              <span>
                {" "}
                | Options selected:{" "}
                {(selectedOptions[currentQuestion] || []).length}
              </span>
            </label>
            <div>
              <button
                className="button"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                &laquo; Previous
              </button>
              <button
                className="button"
                onClick={handleNext}
                disabled={currentQuestion === questionsData.length - 1}
              >
                Next &raquo;
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Test;
