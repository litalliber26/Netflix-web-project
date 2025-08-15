import React, {useState} from 'react';
import './AdminCategoryById.css';
import {
  getCategoryById
} from '../services/adminService';
import { useUserContext } from '../context/UserContext';
import CategoryCard from './CategoryCard';


const AdminCategoryById = () => {
    const [categoryId, setCategoryId] = useState(null);
    const [error, setError] = useState('');
    const [category, setCategory] = useState(null);
  
    const { currentUserToken, currentUser, isDarkMode, setIsDarkMode } = useUserContext();
    const handle = async () => {
      const categoryByIdResult = await getCategoryById(categoryId, currentUserToken)
      setCategory(categoryByIdResult.data);
    };
    return (
      <div>
        <input type='text' onChange={(e) => setCategoryId(e.target.value)} value={categoryId} />
        <button onClick={handle}>Get</button>
        {
          category ? 
          (<CategoryCard category={category} />) : null
        }
      </div>
    );
};
  
  export default AdminCategoryById;