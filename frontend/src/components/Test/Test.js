import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Test.css";
import ti_logo from "../../assets/img/telus_logo_digital.svg";
import FinishDialog from "./FinishDialog";
import { IoMdTime } from "react-icons/io";

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

  // Toggle Mark for Review
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

  // Handle section change
  const handleSectionChange = (section) => {
    setCurrentSection(section);
    setCurrentQuestion((section - 1) * 10); // Set to the first question of the selected section
  };

  const handleFinishClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className="app">
      <header className="testheader">
        <img className="telus-logo" alt="Telus logo" src={ti_logo} />
        <div className="questionstabs nav nav-pills flex-column flex-sm-row">
          <div className="tab flex-sm-fill text-sm-center questionsTab">
            {" "}
            Questions: 40{" "}
          </div>
          <div className="tab flex-sm-fill text-sm-center answeredTab">
            {" "}
            Answered: {Object.keys(selectedOptions).length}{" "}
          </div>
          <div className="tab flex-sm-fill text-sm-center reviewTab">
            {" "}
            Marked for Review: {markedForReview.size}{" "}
          </div>
          <div className="tab flex-sm-fill text-sm-center skipTab">
            {" "}
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
