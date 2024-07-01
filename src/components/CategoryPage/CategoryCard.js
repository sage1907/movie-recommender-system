import React from 'react';
import '../../css/CategoryCard.css';

const CategoryCard = ({ title, image }) => {
    return (
        <div className="category-card">
            <img src={image} alt={title} className="category-card-image" />
            <div className="category-card-title">{title}</div>
        </div>
    );
};

export default CategoryCard;
