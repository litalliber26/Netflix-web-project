import React from 'react';
import netflixLogo from '../assets/netflix-logo.png';
import './RegisterScreen.css';
import useRegisterForm from '../hooks/useRegisterForm';
import ImageUpload from '../components/ImageUpload';

function RegisterScreen() {
    const { fields, formData, error, success, handleInputChange, handleImageChange, handleSubmit } = useRegisterForm();

  return (
    <div className='main-register-screen-container'>
        <div className='upper-row'>
            <img src={netflixLogo} alt="Netflix Logo" className="netflix-logo" />
        </div>
        <div className='main-container'>
            <div className='register-container'>
                <h1 className='login-title'>Register</h1>
                {error ? <div className='login-error-container'>{error}</div> : null}
                <form className='login-form' onSubmit={handleSubmit}>
                {fields.map(field => (
                            <div className='login-input-field' key={field.id}>
                            <label htmlFor={field.id}>{field.label}</label>
                            <input className='login-input-field-input' 
                            type={field.type} 
                            id={field.id} 
                            value={formData[field.id]}
                            onChange={handleInputChange} />
                        </div>
                        ))}
                  <ImageUpload 
                            image={formData.image} 
                            handleImageChange={handleImageChange}
                            className="signup_login_image-upload"
                        />
                <button type='submit' className='login-button'>Register</button>
                </form>
            </div>  
        </div>
    </div>
  );
}

export default RegisterScreen;
