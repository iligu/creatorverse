import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { FaYoutube, FaTwitter, FaInstagram, FaArrowLeft } from 'react-icons/fa';

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreator();
  }, [id]);

  const fetchCreator = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCreator(data);
    } catch (error) {
      console.error('Error fetching creator:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${creator.name}?`)) {
      try {
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id);

        if (error) throw error;
        navigate('/');
      } catch (error) {
        console.error('Error deleting creator:', error);
        alert('Error deleting creator. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="view-creator-page">
        <div className="loading">Loading creator...</div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="view-creator-page">
        <div className="empty-state">
          <h2>Creator not found</h2>
          <Link to="/" className="hero-btn" style={{ marginTop: '2rem' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="view-creator-page">
      <Link to="/" className="back-link">
        <FaArrowLeft /> Back to All Creators
      </Link>

      <div className="view-creator-container">
        <div>
          {creator.imageURL && (
            <img 
              src={creator.imageURL} 
              alt={creator.name} 
              className="creator-image-large"
            />
          )}
        </div>

        <div className="creator-details">
          <h1 className="creator-name-large">{creator.name}</h1>
          <p className="creator-description-large">{creator.description}</p>

          <div className="social-section">
            {creator.youtube && (
              <a 
                href={`https://youtube.com/@${creator.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-item"
              >
                <FaYoutube /> @{creator.youtube}
              </a>
            )}
            {creator.twitter && (
              <a 
                href={`https://twitter.com/${creator.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-item"
              >
                <FaTwitter /> @{creator.twitter}
              </a>
            )}
            {creator.instagram && (
              <a 
                href={`https://instagram.com/${creator.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-item"
              >
                <FaInstagram /> @{creator.instagram}
              </a>
            )}
          </div>

          <div className="action-buttons">
            <Link to={`/edit/${creator.id}`}>
              <button className="btn btn-primary">Edit</button>
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCreator;