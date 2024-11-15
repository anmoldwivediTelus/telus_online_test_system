// Dashboard.js
import React, { useState } from 'react';
import Card from './Card';
import Courses from './AllAvailableTest'
import LeaderBoard from './LeaderBoard'
import TestResult from './TestResult'

function Dashboard() {

  const [menu, setMenu]=useState('All Available Test List')
  function handleClick(item){
    setMenu(item)
}
  return (
    <div className="dashboard-content">
      <Card handleClick={handleClick}/>
      { menu === "All Available Test List" && <Courses/>}
      { menu === "Leader Board" && <LeaderBoard/>}
      { menu === "Test Result" && <TestResult/>}
    </div>
  );
}

export default Dashboard;
