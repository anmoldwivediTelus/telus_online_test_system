import React, { useState } from 'react';
import './RecruiterHomepage.css';
import UserList from './UserList';
import AdminQuestion from './AdminQuestion';
import CandidateResult from './CandidateResult';
import AdminTest from './AdminTest';
function RecruiterHomepage() {
  const [selectedOption, setSelectedOption] = useState('userlist');
  return (
    <div className="home-container">
      {/* Sidebar with options */}
      <div className="sidebar">
        <ul>
        <li 
            className={selectedOption === 'userlist' ? 'active' : ''} 
             onClick={() => setSelectedOption('userlist')}
          >
            Candidates
          </li>
          <li 
            className={selectedOption === 'tests' ? 'active' : ''} 
            onClick={() => setSelectedOption('tests')}
          >
            Tests
          </li>
          <li 
            className={selectedOption === 'questions' ? 'active' : ''} 
            onClick={() => setSelectedOption('questions')}
          >
            Questions
          </li>
          <li 
            className={selectedOption === 'result' ? 'active' : ''} 
            onClick={() => setSelectedOption('result')}
          >
            Candidate Result
          </li>
        </ul>
      </div>
      {/* Main content area */}
      <div className="main-content">
        {selectedOption === 'userlist' && <UserList />}
        {selectedOption === 'tests' && <AdminTest/>}
        {selectedOption === 'questions' && <AdminQuestion />}
        {selectedOption === 'result' && <CandidateResult />}
      </div>
    </div>
  );
}
export default RecruiterHomepage;