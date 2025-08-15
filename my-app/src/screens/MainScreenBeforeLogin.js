import React, { useEffect } from "react";
import { useUserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import {ReactComponent as NetflixLogo} from '../assets/netflix-logo-no-background.svg';
import './MainScreenBeforeLogin.css'

const MainScreenBeforeLogin = () => {
    const { currentUserToken, isAuthenticated } = useUserContext();
    const navigate = useNavigate();

    // Fetch random video, user info, and categories when the component mounts
    useEffect(() => {
        if(isAuthenticated && currentUserToken) {
            navigate('/main');
        }
    }, [isAuthenticated]);

    return (
        <div className='main-welcome-screen-container full-height'>
        <div className='upper-row-welcome-screen'>
            <NetflixLogo className='welcome-netflix-logo' />
            {/* <img src={netflixLogo} alt="Netflix Logo" className="netflix-logo" /> */}
        </div>
        <div className='main-container-welcome-screen'>
            <button onClick={() => navigate('/login')} className='login-button'>Login</button>
            <button onClick={() => navigate('/register')}  className='login-button'>Register</button>
        </div>
    </div>
    );
};

export default MainScreenBeforeLogin;
