import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Test.css";
import ti_logo from "../../assets/img/telus_logo_digital.svg";
import FinishDialog from "./FinishDialog";
import { IoMdTime } from "react-icons/io";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import WebcamRecorder from "./WebcamVideo";
// Generate sample questions with 40 items, divided into 4 sections
const questionsData = Array.from({ length: 40 }, (_, index) => ({
  section: Math.floor(index / 10) + 1, // Calculate section (1 to 4)
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
  const [questionsData, setQuestionsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 
  // // Timer logic
  // useEffect(() => {
  //   if (timeLeft > 0) {
  //     const timer = setInterval(() => {
  //       setTimeLeft((prevTime) => prevTime - 1);
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   } else {
  //     // Redirect to exit page when time runs out
  //     navigate("/exit");
  //   }
  // }, [timeLeft, navigate]);
  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {

        const response = await axios.get(`http://localhost:4000/api/questions/test/${id}`);

        setQuestionsData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // Format time as mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Handle option selection for multiple options
  const handleOptionSelect = (option) => {
    setSelectedOptions((prev) => {
      const currentSelection = prev[currentQuestion] || [];
      if (currentSelection.includes(option)) {
        // If already selected, remove it
        return {
          ...prev,
          [currentQuestion]: currentSelection.filter((opt) => opt !== option),
        };
      } else {
        // Otherwise, add it
        return {
          ...prev,
          [currentQuestion]: [...currentSelection, option],
        };
      }
    });
  };
  // Handle Next and Previous buttons
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
          {/* <h3>Sections:</h3>
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
          </div> */}
          <h3>Questions:</h3>
          {questionsData.length > 0 && (
            <div className="question-numbers">
              {questionsData
                //.filter((q) => q.section === currentSection)
                .map((q, index) => (
                  <div
                    key={q.id}
                    className={`question-number ${
                      (selectedOptions[index] || []).length > 0
                        ? "answered"
                        : ""
                    } ${markedForReview.has(index) ? "review" : ""} ${
                      currentQuestion === index ? "active" : ""
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </div>
                ))}
            </div>
          )}
        </aside>
        {questionsData.length > 0 &&
        <main className="question-panel">
          {console.log(questionsData[currentQuestion])}
         <div className="wrapper">
          <h2>{questionsData[currentQuestion].questionText}</h2>
          <pre className="code-block">
            {questionsData[currentQuestion].code}
          </pre>
          <div className="options">
          <ul>
            {console.log(selectedOptions[currentQuestion])}
            {Object.values(questionsData[currentQuestion].options).map((option, idx) => (
              <li
                key={idx}
                className={`option-button ${
                  (selectedOptions[currentQuestion] || []).includes(option)
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                 <input
                type="checkbox" />
                  <span className="answercheckmark"></span> {option}
              </li>
            ))}
            </ul>
          </div>
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
        )}
      </div>
    </div>
  );
}

export default Test;
