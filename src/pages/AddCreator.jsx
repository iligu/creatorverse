import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';
import { FaYoutube, FaTwitter, FaInstagram, FaArrowLeft } from 'react-icons/fa';

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    imageURL: '',
    description: '',
    youtube: '',
    twitter: '',
    instagram: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('creators')
        .insert([formData])
        .select();

      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error adding creator:', error);
      alert('Error adding creator. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <Link to="/" className="back-link">
        <FaArrowLeft /> Back to All Creators
      </Link>

      <div className="form-container">
        <h1 className="form-title">Add New Creator</h1>

        <form onSubmit={handleSubmit} className="creator-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageURL" className="form-label">Image</label>
            <span className="form-hint">
              Provide a link to an image of your creator. Be sure to include the http://
            </span>
            <input
              type="url"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              className="form-input"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <span className="form-hint">
              Provide a description of the creator. Who are they? What makes them interesting?
            </span>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              required
            />
          </div>

          <div className="social-media-section">
            <h2 className="social-media-title">Social Media Links</h2>
            <p className="social-media-hint">
              Provide at least one of the creator's social media links.
            </p>

            <div className="social-input-group">
              <div className="social-input-wrapper">
                <FaYoutube />
                <label htmlFor="youtube" className="form-label">YouTube</label>
              </div>
              <span className="form-hint">
                The creator's YouTube handle (without the @)
              </span>
              <input
                type="text"
                id="youtube"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className="form-input"
                placeholder="channelname"
              />

              <div className="social-input-wrapper">
                <FaTwitter />
                <label htmlFor="twitter" className="form-label">Twitter</label>
              </div>
              <span className="form-hint">
                The creator's Twitter handle (without the @)
              </span>
              <input
                type="text"
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="form-input"
                placeholder="username"
              />

              <div className="social-input-wrapper">
                <FaInstagram />
                <label htmlFor="instagram" className="form-label">Instagram</label>
              </div>
              <span className="form-hint">
                The creator's Instagram handle (without the @)
              </span>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="form-input"
                placeholder="username"
              />
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Adding...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCreator;