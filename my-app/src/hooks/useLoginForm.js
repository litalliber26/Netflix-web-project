import { useState } from 'react';
import { handleInputChange } from '../utils/formHandlers';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const useLoginForm = (onLogin) => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = formData;

        if (!username || !password) {
            setError('Username and password are required.');
            setSuccess('');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/tokens`, {username, password});
            setSuccess('Login successful!');
            if(onLogin) {
                await onLogin(response.data);
            }
            navigate('/main');
        }
        catch(error) {
            console.error(error.response.data.error);
            setError(error.response.data.error);
            return;
        }
    };

    return {
        formData,
        error,
        success,
        handleInputChange: (e) => handleInputChange(e, formData, setFormData),
        handleSubmit
    };
};

export default useLoginForm;
