import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPasswordValid } from '../utils/validation';
import { handleInputChange, handleImageChange as handleImageChangeUtil } from '../utils/formHandlers';
import axios from 'axios';

const useRegisterForm = () => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        phone: '',
        password: '',
        confirmPassword: '',
        image: null,
        imageForUpload: null
    });
    const fields = Object.keys(formData).filter(formKey => !formKey.includes('image')).map(formKey => (
        {
            id: formKey,
            label: formKey.replace(/([a-z])([A-Z])/g, '$1 $2')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            type: formKey.toLowerCase().includes('password') ? 'password' : 'text'
        }
    ));
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
                navigate('/login');
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password, confirmPassword, image, imageForUpload, firstName, lastName, phone } = formData;

        if (!username) {
            setError('Username is required.');
            return;
        }

        if (!password) {
            setError('Password is required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        if (!isPasswordValid(password)) {
            setError('Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.');
            return;
        }

        if (!image) {
            setError('Image is required.');
            return;
        }

        // if (users.some(user => user.username === username)) {
        //     setError('Username already exists.');
        //     return;
        // }

        const newUser = { username, password, name: `${firstName} ${lastName}`, phone, uploaded_picture: imageForUpload };
        const registerFormData = new FormData();
        Object.keys(newUser).forEach(k => registerFormData.append(k, newUser[k]));
        try {
            const response = await axios.post(`${API_URL}/users`, registerFormData);
            setSuccess(true);
        }
        catch(error) {
            console.error(error.response?.data?.error || error);
            setError(error.response?.data?.error || 'Unkown error');
            return;
        }
        setSuccess(true);
        setError('');
    };

    return {
        fields,
        formData,
        error,
        success,
        handleInputChange: (e) => handleInputChange(e, formData, setFormData),
        handleImageChange: (e) => handleImageChangeUtil(e, formData, setFormData, setError),
        handleSubmit
    };
};

export default useRegisterForm;
