import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/ShowCard.css';

const ShowCard = ({ show }) => {
  return (
    <div className="show-card">
      <Link to={`/details/${show._id}`} className="show-card-link" >
        <img src={show.thumbnailUrl} alt={show.title} />
        <div className="show-title">{show.title}</div>
      </Link>
    </div>
  );
};

export default ShowCard;
