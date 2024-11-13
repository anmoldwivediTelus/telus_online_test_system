import React, { useRef, useState } from "react";
import "./CandidateProfile.css";
import ImageUpload from "./ImageUpload";

const CandidateProfile = () => {
 
  return (
    <div className="main__profile">
      <div className="profile">
        <h2>Profile</h2>
      </div>
      {<ImageUpload/>}
      <div className="details">
        <p className="name">Firstname Lastname</p>
        <span>email</span>
        <p className="position">Position applied for</p>
        <span>Experience</span>
      </div>
    </div>
  );
};

export default CandidateProfile;