import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./CandidateResult.css";

// Reusable Table Row Component
const TableRow = ({ data }) => (
  <tr>
    <td>{data.category}</td>
    <td>{data.attempted}</td>
    <td>{data.correct}</td>
    <td>{data.mistakes}</td>
    <td>{data.totalTime}</td>
    <td>
      {data.avgTime}
      <br />
      <span className="faster-percent">{data.fasterPercent}</span>
    </td>
  </tr>
);

const ResultPage = () => {
  const [candidateDetails, setCandidateDetails] = useState({
    name: "Fetching...",
    experience: "Fetching...",
    skills: "Fetching...",
  });

  const [sectionsData, setSectionsData] = useState([]);
  const [chartData, setChartData] = useState({
    score: 0,
    correct: 0,
    mistakes: 0,
    communityAverage: 0,
  });

  useEffect(() => {
    // Simulated data fetching
    setTimeout(() => {
      setCandidateDetails({
        name: "John Doe",
        experience: "3 years",
        skills: "React, Node.js, JavaScript, HTML, CSS",
      });

      const fetchedData = [
        {
          category: "Section-1",
          attempted: "47 out of 100",
          correct: 28,
          mistakes: 19,
          totalTime: "1 hr, 54 mins, 21 secs",
          avgTime: "2 mins, 26 secs",
          fasterPercent: "87.9% candidates were faster",
        },
        {
          category: "Section-2",
          attempted: "11 out of 15",
          correct: 5,
          mistakes: 6,
          totalTime: "37 mins, 23 secs",
          avgTime: "3 mins, 24 secs",
          fasterPercent: "95.3% candidates were faster",
        },
        {
          category: "Section-3",
          attempted: "1 out of 15",
          correct: 1,
          mistakes: 0,
          totalTime: "2 mins, 7 secs",
          avgTime: "2 mins, 7 secs",
          fasterPercent: "35.9% candidates were faster",
        },
        {
          category: "Section-4",
          attempted: "9 out of 15",
          correct: 6,
          mistakes: 3,
          totalTime: "20 mins, 20 secs",
          avgTime: "2 mins, 16 secs",
          fasterPercent: "91.2% candidates were faster",
        },
      ];

      setSectionsData(fetchedData);

      const totalCorrect = fetchedData.reduce((sum, item) => sum + item.correct, 0);
      const totalMistakes = fetchedData.reduce((sum, item) => sum + item.mistakes, 0);
      const totalQuestions = fetchedData.reduce(
        (sum, item) => sum + parseInt(item.attempted.split(" out of ")[1]),
        0
      );

      setChartData({
        score: Math.round((totalCorrect / totalQuestions) * 100),
        correct: totalCorrect,
        mistakes: totalMistakes,
        communityAverage: 74.2,
      });
    }, 2000); // Simulated delay
  }, []);

  return (
    <div className="result-page">
      {/* Header Section */}
      <div className="header">
        <h2>Candidate Details</h2>
        <p><strong>Name:</strong> {candidateDetails.name}</p>
        <p><strong>Experience:</strong> {candidateDetails.experience}</p>
        <p><strong>Skills:</strong> {candidateDetails.skills}</p>
      </div>

      {/* Content Section */}
      <div className="layout">
        {/* Table */}
        <div className="table-container">
          <table className="result-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Attempted</th>
                <th>Correct</th>
                <th>Incorrect</th>
                <th>Total Time Taken</th>
                <th>Average Time / Ques</th>
              </tr>
            </thead>
            <tbody>
              {sectionsData.length > 0 ? (
                sectionsData.map((row, index) => <TableRow key={index} data={row} />)
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>Fetching Data...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pictorial Representation */}
        {/* <div className="chart-container">
          <CircularProgressbar
            value={chartData.score}
            text={`${chartData.score}%`}
            styles={buildStyles({
              textColor: "rgb(76,41,112)", // Deep purple
              pathColor: "rgb(76,41,112)", // Purple
              trailColor: "rgb(76,194,233)", // Light blue
            })}
          />
          <div className="chart-labels">
            <div style={{ color: "rgb(76,41,112)" }}>
              <span>●</span> Correct
              <p>{chartData.correct} questions</p>
            </div>
            <div style={{ color: "rgb(76,194,233)" }}>
              <span>●</span> Mistakes
              <p>{chartData.mistakes} questions</p>
            </div>
          </div>
          <div className="progress-container">
            <p>Community Average is {chartData.communityAverage}%</p>
            <div className="progress-bar">
              <div
                className="progress-bar-filled"
                style={{
                  width: `${chartData.communityAverage}%`,
                  backgroundColor: "rgb(76,41,112)",
                }}
              ></div>
            </div>
          </div>
        </div>
      */}
      </div>
    </div>
  );
};

export default ResultPage;
