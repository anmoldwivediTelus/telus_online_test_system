import React, { useState } from "react";
import Courses from './AllAvailableTest'
import './Card.css';
const content=[
    {
        title:'All Available Test List',
    },
    {
        title:'Leader Board',
    },
    {
        title:'Test Result'
    },
];  



const Card=({handleClick})=>{
    return(
        <div className="card-container1">
            {content.map((item)=>(
                <div key={item.title} className="card" onClick={()=>handleClick(item.title)}> 
                <div className="card--title">
                    <h2>{item.title}</h2>

                </div>
                </div>
            ))}
            
        </div>
    );
};

export default Card;