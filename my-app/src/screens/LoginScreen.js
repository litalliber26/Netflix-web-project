import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import netflixLogo from '../assets/netflix-logo.png';
import './LoginScreen.css';
import useLoginForm from '../hooks/useLoginForm';
 
function LoginScreen({onLogin}) {
    const { formData, error, success, handleInputChange, handleSubmit } = useLoginForm(onLogin);

  return (
    <div className='main-login-screen-container'>
        <div className='upper-row'>
            <img src={netflixLogo} alt="Netflix Logo" className="netflix-logo" />
        </div>
        <div className='main-container'>
            <div className='login-container'>
                <h1 className='login-title'>Login</h1>
                {error ? <div className='login-error-container'>{error}</div> : null}
                <form className='login-form' onSubmit={handleSubmit}>
                <div className='login-input-field'>
                    <label htmlFor='userName'>username</label>
                    <input className='login-input-field-input' 
                    type='text' 
                    id='username' 
                    value={formData.username}
                    onChange={handleInputChange} />
                </div>
                <div className='login-input-field'>
                    <label htmlFor='password'>password</label>
                    <input className='login-input-field-input' 
                    type='password' 
                    id='password' 
                    value={formData.password} 
                    onChange={handleInputChange} />
                </div>
                <button type='submit' className='login-button'>Login</button>
                </form>
                <div className="action-text signup-text">
                        <span className='signup-gray-text'>Don't have an account?</span> <Link to="/register"><span className='signup-bold-text'>Sign up</span></Link>
                </div>
            </div>  
        </div>
    </div>
  );
}

export default LoginScreen;
