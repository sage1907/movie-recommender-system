import React from 'react';
import '../css/CategorySection.css';

const CategorySection = ({ title, children }) => {
  return (
    <div className="category-section">
      <h2>{title}</h2>
      <div className="shows-container">
        {children}
      </div>
    </div>
  );
};

export default CategorySection;




