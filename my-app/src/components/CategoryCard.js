import React from 'react';
import './CategoryCard.css'
const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <p className="category-card-id">Id: {category._id}</p>
      <p className="category-card-name">Category: {category.name}</p>
      <p className="category-card-status">Promoted: {category.promoted ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default CategoryCard;