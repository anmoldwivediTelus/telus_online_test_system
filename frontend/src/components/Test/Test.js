//Latest Code Thursday
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Test.css";
import ti_logo from "../../assets/img/telus_logo_digital.svg";
import FinishDialog from "./FinishDialog";
import { IoMdTime } from "react-icons/io";
import WebcamRecorder from "./WebcamVideo";
import axios from "axios";

function Test() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fullscreenWarning, setFullscreenWarning] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skippedQuestions, setSkippedQuestions] = useState(0);

  const params = useParams();

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      handleFinishClick()
      navigate("/exit"); // Redirect when time runs out
    }
  }, [timeLeft, navigate]);

  // Fetch questions from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/questions/test/${params.id}`
        );
        setQuestionsData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

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
        const timer = setTimeout(() => {
          if (!document.fullscreenElement) {
            handleFinishClick()
            navigate("/exit");
          }
        }, 90000);
        return () => clearTimeout(timer);
      } else {
        setFullscreenWarning(false);
      }
    };

    enterFullScreen();
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [navigate]);

  const reEnterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element
        .requestFullscreen()
        .then(() => {
          setFullscreenWarning(false);
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

  const handleOptionSelect = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questionsData.length - 1) {
      if (!selectedOptions[currentQuestion] && !markedForReview.has(currentQuestion)) {
        setSkippedQuestions((prev) => prev + 1);
      }
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

    const totalTimeTaken = 1800 - timeLeft;
    const answers = Object.keys(selectedOptions).reduce((acc, key) => {
      const questionNumber = parseInt(key) + 1;
      const selectedAnswer = selectedOptions[key];
      acc[questionNumber] = selectedAnswer;
      return acc;
    }, {});

    const testData = {
      userId: localStorage.getItem("userId"),
      testId: localStorage.getItem("testId"),
      answers: answers,
      totalTimeTaken: totalTimeTaken,
    };

    axios.post("http://localhost:4000/api/results", testData);
    navigate("/exit");
  };

  const answeredQuestionsCount = Object.keys(selectedOptions).filter(
    (key) => !markedForReview.has(parseInt(key))
  ).length;

  return (
    <div className="app">
      <header className="testheader">
        <div className="leftitem">
          <img className="telus-logo" alt="Telus logo" src={ti_logo} />
        </div>
        <div className="questionstabs nav nav-pills flex-column flex-sm-row">
          <div className="tab flex-sm-fill text-sm-center questionsTab">
            Questions: {questionsData.length}
          </div>
          <div className="tab flex-sm-fill text-sm-center answeredTab">
            Answered: {answeredQuestionsCount}
          </div>
          <div className="tab flex-sm-fill text-sm-center reviewTab">
            Marked for Review: {markedForReview.size}
          </div>
          <div className="tab flex-sm-fill text-sm-center skipTab">
            Skipped: {skippedQuestions}
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

      <FinishDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} />

      <div className="content">
        <aside className="sidebar testSidebar">
          <h3>Questions:</h3>
          {questionsData.length > 0 && (
            <div className="question-numbers">
              {questionsData.map((q, index) => (
                <div
                  key={q.id}
                  className={`question-number ${
                    selectedOptions[index] ? "answered" : ""
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
            <div className="wrapper">
              <div className="col-questions">
                <h2>{questionsData[currentQuestion].questionText}</h2>
                <pre className="code-block">
                  {questionsData[currentQuestion].code}
                </pre>
                <div className="options">
                  <ul>
                    {Object.values(questionsData[currentQuestion].options).map(
                      (option, idx) => (
                        <li key={idx} className="option-button">
                          <label>
                            <input
                              type="radio"
                              name={`question-${currentQuestion}`}
                              checked={
                                selectedOptions[currentQuestion] === option
                              }
                              onChange={() => handleOptionSelect(option)}
                            />
                            <span className="answercheckmark"></span>
                            {option}
                          </label>
                        </li>
                      )
                    )}
                  </ul>
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
                  | Option selected: {selectedOptions[currentQuestion] || "None"}
                </span>
              </label>
              <div className="actionbuttons">
                {currentQuestion > 0 && (
                  <button className="button" onClick={handlePrevious}>
                    &laquo; Previous
                  </button>
                )}
                {currentQuestion < questionsData.length - 1 && (
                  <button className="button" onClick={handleNext}>
                    Next &raquo;
                  </button>
                )}
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default Test;
