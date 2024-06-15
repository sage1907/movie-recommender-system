// import React from 'react';
// import ShowCard from './ShowCard';
// import './css/CategorySection.css';

// const CategorySection = ({ title, shows }) => {
//   return (
//     <div className="category-section">
//       <h2>{title}</h2>
//       <div className="shows-container">
//         {shows.map((show, index) => (
//           <ShowCard key={index} show={show} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategorySection;

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




