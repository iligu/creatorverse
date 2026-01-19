import React from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaTwitter, FaInstagram, FaInfo, FaEdit } from 'react-icons/fa';

const Card = ({ creator }) => {
  return (
    <div className="creator-card">
      {creator.imageURL && (
        <img src={creator.imageURL} alt={creator.name} className="card-image" />
      )}
      
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{creator.name}</h3>
          <div className="card-actions">
            <Link to={`/creator/${creator.id}`} className="icon-btn" title="View Details">
              <FaInfo />
            </Link>
            <Link to={`/edit/${creator.id}`} className="icon-btn" title="Edit">
              <FaEdit />
            </Link>
          </div>
        </div>

        <p className="card-description">{creator.description}</p>

        <div className="social-links">
          {creator.youtube && (
            <a 
              href={`https://youtube.com/@${creator.youtube}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              title="YouTube"
            >
              <FaYoutube />
            </a>
          )}
          {creator.twitter && (
            <a 
              href={`https://twitter.com/${creator.twitter}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              title="Twitter"
            >
              <FaTwitter />
            </a>
          )}
          {creator.instagram && (
            <a 
              href={`https://instagram.com/${creator.instagram}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              title="Instagram"
            >
              <FaInstagram />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;