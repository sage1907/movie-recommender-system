// CategorySectionForCategory.js
import React, { useState, useRef, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import '../css/CategorySectionForCategory.css';

const CategorySectionForCategory = ({ title, categories }) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
        if (containerRef.current) {
            setIsOverflowing(containerRef.current.scrollWidth > containerRef.current.clientWidth);
        }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, []);

    const handleScroll = (direction) => {
        const { current } = containerRef;
        const scrollAmount = direction === 'left' ? -current.clientWidth : current.clientWidth;
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <div className="category-section-2">
            <div className="category-header-2">
                <h2>{title}</h2>
            </div>
            <div className="carousel-container-2">
                {isOverflowing && (
                    <button className="arrow left-arrow" onClick={() => handleScroll('left')}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                )}
                <div className="category-section-cards">
                    {categories.map((category, index) => (
                        <CategoryCard key={index} title={category.title} image={category.image} />
                    ))}
                </div>
                {isOverflowing && (
                    <button className="arrow right-arrow" onClick={() => handleScroll('right')}>
                    <i className="fa-solid fa-chevron-right"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

export default CategorySectionForCategory;
