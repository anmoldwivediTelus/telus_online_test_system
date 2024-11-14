import React from "react";
import './Card.css';
const content=[
    {
        title:'All Available Test List',
    },
    {
        title:'Leader Board',

    },
    {
        title:'Test Result '
    },
];  

const Card=()=>{
    return(
        <div className="card-container">
            {content.map((item)=>(
                <div className="card"> 
                <div className="card--title">
                    <h2>{item.title}</h2>

                </div>
                </div>
            ))}
            
        </div>
    );
};

export default Card;