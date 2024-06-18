import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../css/Details.css';

const Details = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
    <div className="details" style={{ backgroundImage: `url(${showDetails.image})` }}>
            <div className="details-sidebar">
                <Sidebar />
            </div>
            <div className="details-content">
                <div className="details-info">
                    <div className="details-title">
                        <h1>{showDetails.title}</h1>
                        <i title="Add to favorites"
                            className={`fa-heart ${isFavorite ? 'fas' : 'far'} heart-icon`}
                            onClick={toggleFavorite}
                        ></i>
                    </div>
                    <p>{showDetails.year} • {showDetails.language} • {showDetails.rating}</p>
                    <p>{showDetails.description}</p>
                    <div className="details-genres">
                        {showDetails.tags.map((tag, index) => (
                            <span key={index} className="genre">{tag}</span>
                        ))}
                    </div>
                    <button className="subscribe-button"><i className="fas fa-play"></i> Watch Now</button>
                    <button className="add-button" title="Add to watchlist"><i className="fas fa-plus"></i></button>
                </div>
            </div>
        </div>
  );
};

export default Details;