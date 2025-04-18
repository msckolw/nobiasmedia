import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Home.css';

const API_URL = 'http://localhost:5002/api';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${API_URL}/news`);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Our News Portal</h1>
        <p>Stay updated with the latest news and stories</p>
      </section>

      <section className="latest-news">
        <h2>Latest News</h2>
        {loading ? (
          <div className="loading">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="no-articles">No articles found.</div>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <div key={article._id} className="article-card">
                <div className="article-image">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200';
                    }}
                  />
                </div>
                <div className="article-content">
                  <span className="article-category">{article.category}</span>
                  <h3>{article.title}</h3>
                  <p className="article-summary">{article.summary}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home; 