import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Test.css";
import ti_logo from "../../assets/img/telus_logo_digital.svg";
import FinishDialog from "./FinishDialog";
import { IoMdTime } from "react-icons/io";
import WebcamRecorder from "./WebcamVideo";
import axios from "axios";
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
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fullscreenWarning, setFullscreenWarning] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      navigate("/exit"); // Redirect when time runs out
    }
  }, [timeLeft, navigate]);

  // Fetch questions from API
  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/questions/test/2"
        );
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

  // Full-screen logic
  useEffect(() => {
    const enterFullScreen = () => {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen().catch((err) => {
          console.error("Error enabling full-screen mode:", err.message);
        });
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenWarning(true);

        // Start a 10-second timer for redirection
        const timer = setTimeout(() => {
          if (!document.fullscreenElement) {
            navigate("/exit"); // Redirect if still not in full-screen
          }
        }, 10000);

        return () => clearTimeout(timer); // Cleanup timer
      } else {
        setFullscreenWarning(false); // Reset warning
      }
    };

    enterFullScreen();
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [navigate]);

  // Re-enter full-screen mode function
  const reEnterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element
        .requestFullscreen()
        .then(() => {
          setFullscreenWarning(false); // Reset the warning state
        })
        .catch((err) => {
          console.error("Error re-entering full-screen mode:", err.message);
        });
    }
  };

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

  // Mark for review toggle
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

  // Finish test logic
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
    console.log("Video saved:", videoData);
    // Add additional logic for saving or processing the video data
  };

  return (
    <div className="app">
      <header className="testheader">
      <div className="leftitem">
        <img className="telus-logo" alt="Telus logo" src={ti_logo} />
        </div>
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
         
        </div>
      </header>
      {fullscreenWarning && (
        <div className="fullscreen-warning-overlay">
          <div className="fullscreen-warning-box">
            <h2>Warning!</h2>
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
        {questionsData.length > 0 && (
          <main className="question-panel">
            {console.log(questionsData[currentQuestion])}
            <div className="wrapper">
            <div className="col-questions">

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

            <div className="col-video">
            <div className="test-page1">
            <WebcamRecorder onSaveToLocalStorage={handleRecordingSave} />
            </div>
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
              <div className="actionbuttons">
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