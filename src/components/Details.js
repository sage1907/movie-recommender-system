import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../css/Details.css';

const Details = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`/api/content/${id}`);
        const data = await response.json();
        setShowDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching show details:', error);
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!showDetails) {
    return <div>Error: Show details not found</div>;
  }

  return (
    <div className="details">
      <div className="details-sidebar">
        <Sidebar />
      </div>
      <div className="details-content">
        <img src={showDetails.image} alt={showDetails.title} className="details-image" />
        <div className="details-info">
          <h1>{showDetails.title}</h1>
          <p>{showDetails.year} • {showDetails.duration} • {showDetails.language} • {showDetails.rating}</p>
          <p>{showDetails.description}</p>
          <div className="details-genres">
            {showDetails.tags.map((tag, index) => (
              <span key={index} className="genre">{tag}</span>
            ))}
          </div>
          <button className="subscribe-button"><i className="fas fa-play"></i>Watch Now</button>
          <button className="add-button" title='Add to watchlist'><i className="fas fa-add"></i></button>
        </div>
      </div>
    </div>
  );
};

export default Details;






// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import '../css/Details.css';

// const Details = () => {
//   const { id } = useParams();
//   const [content, setContent] = useState(null);

//   useEffect(() => {
//     const fetchContentDetails = async () => {
//       try {
//         const response = await fetch(`/api/content/${id}`);
//         const data = await response.json();
//         setContent(data);
//       } catch (error) {
//         console.error('Error fetching content details:', error);
//       }
//     };

//     fetchContentDetails();
//   }, [id]);

//   if (!content) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="details">
//       <div className="details-header">
//         <img src={content.image} alt={content.title} />
//         <div className="details-info">
//           <h1>{content.title}</h1>
//           <p>{content.description}</p>
//           <button className="subscribe-button">Subscribe to Watch</button>
//           <button className="add-button">+</button>
//         </div>
//       </div>
//       <div className="details-meta">
//         <span>{content.year}</span>
//         <span>{content.duration}</span>
//         <span>{content.language}</span>
//         <span>{content.rating}</span>
//       </div>
//       <div className="details-tags">
//         {content.tags.map(tag => (
//           <span key={tag} className="tag">{tag}</span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Details;

