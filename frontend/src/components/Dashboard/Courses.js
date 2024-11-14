import React, { useState } from 'react';
import { FaReact, FaJs, FaNode, FaAngular, FaJava, FaPython } from 'react-icons/fa';
import './Courses.css';

const CourseCard = ({ title, Icon, iconColor }) => {
  return (
    <div className="course-card">
      <Icon size={48} color={iconColor} />
      <h3>{title}</h3>
      <div className="card-buttons">
        <button className="start-button">Start</button>
        {/* <button className="finish-button">Finish</button> */}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const allCourses = [
    { title: 'React', Icon: FaReact, iconColor: '#61dafb' },
    { title: 'JavaScript', Icon: FaJs, iconColor: '#f7df1e' },
    { title: 'NodeJS', Icon: FaNode, iconColor: '#68a063' },
    { title: 'Angular', Icon: FaAngular, iconColor: '#dd0031' },
    { title: 'Java', Icon: FaJava, iconColor: '#007396' },
    { title: 'Python', Icon: FaPython, iconColor: '#3776ab' },
    { title: 'C++', Icon: FaReact, iconColor: '#00599C' }, // Example additional course
    { title: 'Ruby', Icon: FaReact, iconColor: '#CC342D' }, 
    { title: 'Go', Icon: FaReact, iconColor: '#00ADD8' },   
  ];

  const [visibleCourses, setVisibleCourses] = useState(6); 
  const handleShowMore = () => {
    setVisibleCourses((prevCount) => prevCount + 3); 
  };

  return (
   
        <div className="tests-section">
          <h1>All Available Tests</h1>
          <div className="card-container">
            {allCourses.slice(0, visibleCourses).map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                Icon={course.Icon}
                iconColor={course.iconColor}
              />
            ))}
          </div>
          {visibleCourses < allCourses.length && (
            <button className="show-more-button" onClick={handleShowMore}>
              Show More
            </button>
          )}
        </div>
  );
};

export default Dashboard;
