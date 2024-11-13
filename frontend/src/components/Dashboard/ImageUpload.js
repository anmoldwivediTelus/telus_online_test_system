import React, { useState, useRef } from "react";
import uploadImage from '../../assets/img/uploadImage.jpg'
import "./ImageUpload.css";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file)
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
console.log(image)
  return (
    <div className="image-upload-container">
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {image ? (
            <img src={URL.createObjectURL(image)} alt="upload image" className="img-display-after" />
          ) : (
            <img src={uploadImage} alt="upload image" className="img-display-before" />
          )}

          <input
            id="image-upload-input"
            type="file"
            onChange={handleImageChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </div>
      </div>
  );
}

export default ImageUpload;