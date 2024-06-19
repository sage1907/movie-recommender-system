// CategorySectionForCategory.js
import React from 'react';
import CategoryCard from './CategoryCard';
import '../css/CategorySectionForCategory.css';

const CategorySectionForCategory = ({ title, categories }) => {
    return (
        <div className="category-section">
            <h2>{title}</h2>
            <div className="category-section-cards">
                {categories.map((category, index) => (
                    <CategoryCard key={index} title={category.title} image={category.image} />
                ))}
            </div>
        </div>
    );
};

export default CategorySectionForCategory;
