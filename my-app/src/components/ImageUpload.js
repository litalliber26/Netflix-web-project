import React from 'react';
import './ImageUpload.css';

const ImageUpload = ({ image, handleImageChange }) => (
  <div className='signup_login_image-upload'>
    <label className='signup_login_upload-button-container' htmlFor="file-input">
      <div className="signup_login_upload-button">
        {image ? <img src={image} alt="Selected" className="rounded-circle signup_login_upload-button-image" />   :  <i className="bi bi-plus-lg"></i> }
      </div>
      <small className="signup_login_form-text">Add Image</small>
    </label>
    <input  
    type="file" 
    id="file-input" 
    className="signup_login_file-input" 
    onChange={handleImageChange} 
    required />
  </div>
);

export default ImageUpload;
