import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../components/Card';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCreators(data || []);
    } catch (error) {
      console.error('Error fetching creators:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="hero">
        <h1>Creatorverse</h1>
        <p className="hero-subtitle">Discover the stars of content creation</p>
        <div className="hero-buttons">
          <a href="#creators" className="hero-btn">View All Creators</a>
          <Link to="/add" className="hero-btn">Add a Creator</Link>
        </div>
      </section>

      <section id="creators" className="creators-section">
        {loading ? (
          <div className="loading">Loading creators from the cosmos...</div>
        ) : creators.length === 0 ? (
          <div className="empty-state">
            <h2 className="empty-state-title">The Galaxy Awaits</h2>
            <p>Be the first to add a content creator to the Creatorverse!</p>
            <Link to="/add" className="hero-btn" style={{ marginTop: '2rem' }}>
              Launch Your First Creator
            </Link>
          </div>
        ) : (
          <>
            <h2 className="section-title">Featured Creators</h2>
            <div className="creators-grid">
              {creators.map((creator) => (
                <Card key={creator.id} creator={creator} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ShowCreators;