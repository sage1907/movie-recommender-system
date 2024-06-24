import React, { useState, useRef, useEffect } from 'react';
import '../css/CategorySection.css';

const CategorySection = ({ title, children }) => {
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
    <div className="category-section">
      <div className="category-header">
        <h2>{title}</h2>
      </div>
      <div className="carousel-container">
        {isOverflowing && (
          <button className="arrow left-arrow" onClick={() => handleScroll('left')}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        )}
        <div className="shows-container" ref={containerRef}>
          {children}
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

export default CategorySection;
