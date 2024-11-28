// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookList from '../components/BookList';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('the lord of the rings');
  const [myList, setMyList] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${searchQuery}`
      );
      const booksData = response.data.docs.map((book, index) => ({
        id: index,
        title: book.title,
        author: book.author_name ? book.author_name[0] : 'Unknown Author',
        coverImage: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
        reviewSnippet: 'Open Library Book Description',
      }));
      setBooks(booksData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(query);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(query);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const addToMyList = (book) => {
    setMyList((prevList) => [...prevList, book]);
  };

  return (
    <div>
      <h1>Book Reviews</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
        />
        <button type="submit">Search</button>
      </form>
      <div className="button-group" style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => handleNavigate('/my-list')} 
          style={{ 
            marginRight: '10px', 
            backgroundColor: '#FF6347', 
            color: '#FFFFFF', 
            padding: '10px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          My List
        </button>
        <button 
          onClick={() => handleNavigate('/groups')} 
          style={{ 
            marginRight: '10px', 
            backgroundColor: '#32CD32', 
            color: '#FFFFFF', 
            padding: '10px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          Groups
        </button>
        <button 
          onClick={() => handleNavigate('/favorites')} 
          style={{ 
            marginRight: '10px', 
            backgroundColor: '#1E90FF', 
            color: '#FFFFFF', 
            padding: '10px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          Favorites
        </button>
        <button 
          onClick={() => handleNavigate('/recommendations')} 
          style={{ 
            marginRight: '10px', 
            backgroundColor: '#FFD700', 
            color: '#FFFFFF', 
            padding: '10px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          Recommendations
        </button>
      </div>
      {loading && <p>Loading books...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <BookList books={books} addToMyList={addToMyList} style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}/>
      )}
    </div>
  );
};

export default HomePage;
