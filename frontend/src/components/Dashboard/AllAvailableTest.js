import React, { useState } from 'react';
import { FaReact, FaJs, FaNode, FaAngular, FaJava, FaPython } from 'react-icons/fa';
import './AllAvailableTest.css';

const CourseCard = ({ title, Icon, iconColor,description }) => {
  return (
    <div className="course-card">
      <Icon size={48} color={iconColor} />
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-buttons">
        <button className="start-button">Start</button>
        {/* <button className="finish-button">Finish</button> */}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const allCourses = [
    { title: 'React', Icon: FaReact, iconColor: '#61dafb', description:'Solve React problems online on Telus Digital Online Test Platform. Answer MCQs exercises and write code for over 200 C++ coding challenges.' },
    { title: 'JavaScript', Icon: FaJs, iconColor: '#f7df1e',description:'Solve JavaScript problems online on Telus Digital Online Test Platform. Answer MCQs exercises and write code for over 200 C++ coding challenges.'  },
    { title: 'NodeJS', Icon: FaNode, iconColor: '#6',description:'Solve NodeJS problems online on Telus Digital Online Test Platform. Answer MCQs exercises and write code for over 200 C++ coding challenges.' },
    { title: 'Angular', Icon: FaAngular, iconColor: '#dd0031',description:'Solve Angular problems online on Telus Digital Online Test Platform. Answer MCQs exercises and write code for over 200 C++ coding challenges.'  },
    { title: 'Java', Icon: FaJava, iconColor: '#007396' ,description:'Solve Java problems online on Telus Digital Online Test Platform. Answer MCQs exercises and write code for over 200 C++ coding challenges.' },
    { title: 'Python', Icon: FaPython, iconColor: '#3776ab',description:'Solve Python problems online on Telus Digital Online Test Platform. Answer MCQs exercises and write code for over 200 C++ coding challenges.'  },
    { title: 'C++', Icon: FaReact, iconColor: '#00599C',description:'Solve C++ problems online on Telus Digital Online Test Platform. Answer MCQs exercises and write code for over 200 C++ coding challenges.'  }, // Example additional course
    { title: 'Ruby', Icon: FaReact, iconColor: '#CC342D',description:'Solve Ruby problems online on Telus Digital Online Test Platform. Answer MCQs exercises and write code for over 200 C++ coding challenges.'  }, 
    { title: 'Go', Icon: FaReact, iconColor: '#00ADD8',description:'Solve Go problems online on Telus Digital Online Test Platform. Answer MCQs exercises and write code for over 200 C++ coding challenges.'  },   
  ];

  const [visibleCourses, setVisibleCourses] = useState(6); 
  const handleShowMore = () => {
    setVisibleCourses((prevCount) => prevCount + 3); 
  };

  return (
   
        <div className="tests-section">
          {/* <h1>All Available Tests</h1> */}
          <div className="card-container">
            {allCourses.slice(0, visibleCourses).map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                Icon={course.Icon}
                iconColor={course.iconColor}
                description={course.description}
              />
            ))}
          </div>
          {visibleCourses < allCourses.length && (
            <div className='morebutton'>
            <button className="show-more-button" onClick={handleShowMore}>
              Show More
            </button>
            </div>
          )}
        </div>
  );
};

export default Dashboard;
