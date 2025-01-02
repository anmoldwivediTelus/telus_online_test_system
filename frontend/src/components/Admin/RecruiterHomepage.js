import React, { useState } from 'react';
import './RecruiterHomepage.css';
import UserList from './UserList';
import AdminQuestion from './AdminQuestion';
import CandidateResult from './CandidateResult';
import AdminTest from './AdminTest';
import down from '../../assets/img/down.png'
import up from '../../assets/img/arrow-up.png'

function RecruiterHomepage() {
  const [selectedOption, setSelectedOption] = useState('userlist');
  const [testNames, setTestNames] = useState([]); // State to store test names
  const [isExpanded, setIsExpanded] = useState(false); // State to track expand/collapse
  const [selectedTestName, setSelectedTestName] = useState('All'); // Store the selected test name

   // Function to update testNames
   const handleUpdateTestNames = (testNamesFromQuestions) => {
    setTestNames(['All', ...testNamesFromQuestions]); // Add 'All' as the first option
  };

   

  const handleExpandCollapse = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="home-container">
      {/* Sidebar with options */}
      <div className="sidebarRecruiter">
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
             className={`questab ${selectedOption === 'questions' ? 'active' : ''}`} 
             onClick={() => {

              setSelectedOption('questions');

              handleExpandCollapse();
            }}
          >
            Tests/Assessment
            <button onClick={handleExpandCollapse}>
              {isExpanded ? <img className="arrowimg" src={up} /> : <img className="arrowimg" src={down} />}
            </button>
            {isExpanded && (
              <ul className='sub-menu'>
                {testNames.map((testName, index) => (
                  <li key={index}
                       onClick={() => setSelectedTestName(testName)} // Set the selected test name
              >{testName}</li>
                ))}
              </ul>
            )}
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
        {selectedOption === 'questions' &&  <AdminQuestion onUpdateTestNames={handleUpdateTestNames}
              selectedTestName={selectedTestName} // Pass selected test name
            />}      
          {selectedOption === 'result' && <CandidateResult />}
      </div>
    </div>
  );
}
export default RecruiterHomepage;