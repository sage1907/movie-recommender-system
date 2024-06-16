import React from 'react';
import '../css/Categories.css';
import Sidebar from './Sidebar';

const Categories = () => {
  return (
    <div className="categories">
    <Sidebar />
      <h1>Categories</h1>
      <p>Browse content by category.</p>
    </div>
  );
};

export default Categories;
