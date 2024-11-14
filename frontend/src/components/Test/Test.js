import React, { useState, useEffect } from 'react';
import "./Test.css"
import ti_logo from '../../assets/img/telus_logo_digital.svg';
import FinishDialog from './FinishDialog';

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
  options: ['x and y are not equal', 'x and y are equal', 'Run time error', 'Syntax error'],
}));

function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [testFinished, setTestFinished] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);


  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTestFinished(true);
    }
  }, [timeLeft]);

  const handleFinishClick = () => {
    setDialogOpen(true); // Open the dialog
  };
  const handleClose = () => {
    setDialogOpen(false); // Close the dialog without exiting
  };
  const handleExit = () => {
    // Handle the exit logic, such as submitting the test or navigating away
    setDialogOpen(false);
    console.log("Test finished");
  };

  // Format time as mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
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
    setMarkedForReview((prev) =>
      prev.has(currentQuestion)
        ? new Set([...prev].filter((q) => q !== currentQuestion))
        : new Set(prev).add(currentQuestion)
    );
  };

  // Handle section change
  const handleSectionChange = (section) => {
    setCurrentSection(section);
    setCurrentQuestion((section - 1) * 10); // Set to the first question of the selected section
  };

  // Finish test handler
  // const handleFinish = () => {
  //   setTestFinished(true);
  // };

  // if (testFinished) {
  //   return (
  //     <div className="thank-you-page">
  //       <h1>Thank you for taking the test!</h1>
  //       <p>Your answers have been recorded.</p>
  //       <button className='btn'>Exit</button>
  //     </div>
  //   );
  // }

  return (
    <div className="app">
      <header className="header">
        {/* <img className="telus-logo" alt="Telus logo" src={ti_logo} /> */}
        <div>Telus Digital Examination</div>
        <div>
          Questions: 40 | Answered: {Object.keys(selectedOptions).length} | Marked for Review: {markedForReview.size} | Skipped: {40 - Object.keys(selectedOptions).length - markedForReview.size}
        </div>
        <div className="timer">{formatTime(timeLeft)}</div>
        <button className="finish-button" onClick={handleFinishClick}>Finish</button>
      </header>
      <FinishDialog open={dialogOpen} handleClose={handleClose} handleExit={handleExit} />
      <div className="content">
        <aside className="sidebar">
          <h3>Sections:</h3>
          <div className="sections">
            {[1, 2, 3, 4].map((section) => (
              <button
                key={section}
                className={`section-button ${currentSection === section ? 'active' : ''}`}
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
              .map((q, index) => (
                <div
                  key={q.number}
                  className={`question-number ${
                    selectedOptions[q.number - 1] ? 'answered' : ''
                  } ${markedForReview.has(q.number - 1) ? 'review' : ''} ${currentQuestion === q.number - 1 ? 'active' : ''}`}
                  onClick={() => setCurrentQuestion(q.number - 1)}
                >
                  {q.number}
                </div>
              ))}
          </div>
        </aside>

        <main className="question-panel">
          <h2>{questionsData[currentQuestion].question}</h2>
          <pre className="code-block">{questionsData[currentQuestion].code}</pre>
          <div className="options">
            {questionsData[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                className={`option-button ${
                  selectedOptions[currentQuestion] === option ? 'selected' : ''
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {String.fromCharCode(65 + idx)}. {option}
              </button>
            ))}
          </div>
          <div className="actions">
            <label>
              <input
                type="checkbox"
                checked={markedForReview.has(currentQuestion)}
                onChange={toggleMarkForReview}
              />
              <span>Mark for review</span>
            </label>
            <div>
              <button className="button" onClick={handlePrevious} disabled={currentQuestion === 0}>&laquo; Previous</button>
              <button className="button" onClick={handleNext} disabled={currentQuestion === questionsData.length - 1}>Next &raquo;</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Test;
