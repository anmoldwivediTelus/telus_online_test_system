import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./CandidateResult.css";
import axios from "axios";
import { API_BASE_URL } from "../../config";

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
    const userId = localStorage.getItem("userId");
  
    if (userId) {
      // Run both API calls concurrently using Promise.all
      Promise.all([
        axios.get(`${API_BASE_URL}/users/${userId}`),
        axios.get(`${API_BASE_URL}/results/${userId}`)
      ])
      .then(([userResponse, resultsResponse]) => {
        // Set the responses for user details and results
        setCandidateDetails(userResponse.data);
        setSectionsData(resultsResponse.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // You can handle the error here, for example:
        // setError(true); // set an error state if needed
      });
    } else {
      console.error('No user ID found in localStorage');
    }
  }, []);

  console.log(sectionsData)

  return (
    <div className="result-page">
      {/* Header Section */}
      <div className="header">
        {/* <h2>Candidate Details</h2> */}
        <p><strong>Name:</strong> {candidateDetails.name}</p>
        <p><strong>Experience:</strong> {candidateDetails.experience}</p>
        <p><strong>Skills:</strong> {candidateDetails.technology}</p>
      </div>

  {sectionsData.length > 0 ? (
                sectionsData.map((row, index) => <TableRow key={index} data={row} />)
              ) : (
                <div className="card-row">
  <div className="cardbox">
    <h4 className="card-title">Attempted  </h4>
      <p className="card-text">{sectionsData.attempted}</p>
   </div>


  <div className="cardbox">
    <h4 className="card-title">Correct</h4>
      <p className="card-text">{sectionsData.correct}</p>
  </div>

  <div className="cardbox">
  <h4 className="card-title">Incorrect</h4>
      <p className="card-text">{sectionsData.incorrect}</p>
</div>

  <div className="cardbox">
   <h4 className="card-title">Total Time Taken</h4>
      <p className="card-text">{Math.floor(sectionsData.totalTimeTaken/60)} mins {sectionsData.totalTimeTaken%60} seconds </p>
  </div>
 </div>
              )}

  




          {/* <table className="result-table">
            <thead>
              <tr>
                <th>Attempted</th>
                <th>Correct</th>
                <th>Incorrect</th>
                <th>Average Time / Ques</th>
              </tr>
            </thead>
            <tbody>
              {sectionsData.length > 0 ? (
                sectionsData.map((row, index) => <TableRow key={index} data={row} />)
              ) : (
                <tr>
                  <td colSpan="1" style={{ textAlign: "center" }}>{sectionsData.attempted}</td>
                  <td colSpan="1" style={{ textAlign: "center" }}>{sectionsData.correct}</td>
                  <td colSpan="1" style={{ textAlign: "center" }}>{sectionsData.incorrect}</td>
                  <td colSpan="1" style={{ textAlign: "center" }}>{sectionsData.averageTimePerQuestion
                  }</td>
                </tr>
              )}
            </tbody>
          </table> */}
        

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
        </div> */}
      
    </div>
  );
};

export default ResultPage;
