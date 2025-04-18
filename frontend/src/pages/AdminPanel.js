import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';

const API_URL = 'http://localhost:5002/api';

const categories = [
  'Politics',
  'Sports',
  'Technology',
  'Business',
  'Entertainment',
  'Health',
  'Science',
  'World'
];

const AdminPanel = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    imageUrl: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      console.log('Fetching articles from:', `${API_URL}/news`);
      const response = await axios.get(`${API_URL}/news`);
      console.log('Received articles:', response.data);
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to load articles. Please try again later.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set canvas dimensions to max 800px while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          const maxWidth = 800;
          
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress image
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl);
        };
      };
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        setPreviewUrl(compressedImage);
        setFormData(prevState => ({
          ...prevState,
          imageUrl: compressedImage
        }));
      } catch (error) {
        console.error('Error compressing image:', error);
        setError('Failed to process image. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Validate required fields
      if (!formData.title || !formData.summary || !formData.content || !formData.category) {
        setError('Please fill in all required fields');
        return;
      }

      // Format the article data according to the News model
      const articleData = {
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        category: formData.category,
        imageUrl: formData.imageUrl || 'https://via.placeholder.com/300x200',
        createdAt: new Date().toISOString()
      };

      console.log('Submitting article data:', JSON.stringify(articleData, null, 2));

      // Send the request with proper headers
      const response = await axios.post(`${API_URL}/news`, articleData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Server response:', response.data);
      
      if (response.data) {
        // Reset form
        setFormData({
          title: '',
          summary: '',
          content: '',
          category: '',
          imageUrl: ''
        });
        setPreviewUrl('');
        
        // Refresh articles list
        await fetchArticles();
        
        // Show success message
        alert('Article added successfully!');
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response?.data?.message) {
        setError(`Server error: ${error.response.data.message}`);
      } else if (error.response?.status === 400) {
        setError('Invalid data format. Please check your input and try again.');
      } else {
        setError('Failed to add article. Please try again.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log('Deleting article:', id);
      await axios.delete(`${API_URL}/news/${id}`);
      console.log('Article deleted successfully');
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      setError('Failed to delete article');
    }
  };

  if (loading) {
    return <div className="loading">Loading articles...</div>;
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="admin-content">
        <div className="form-section">
          <h2>Add New Article</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Summary</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="category-select"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {previewUrl && (
                <div className="image-preview">
                  <img src={previewUrl} alt="Preview" />
                </div>
              )}
            </div>
            
            <button type="submit" className="submit-btn">Add Article</button>
          </form>
        </div>
        
        <div className="articles-section">
          <h2>Manage Articles</h2>
          <div className="articles-list">
            {articles.length > 0 ? (
              articles.map(article => (
                <div key={article._id} className="article-card">
                  <div className="article-image">
                    <img src={article.imageUrl} alt={article.title} />
                  </div>
                  <div className="article-details">
                    <h3>{article.title}</h3>
                    <p className="summary">{article.summary}</p>
                    <p className="category">Category: {article.category}</p>
                    <button 
                      onClick={() => handleDelete(article._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-articles">
                <p>No articles found. Add some articles to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 