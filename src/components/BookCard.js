// src/components/BookCard.js
import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img
        src={book.coverImage || 'https://via.placeholder.com/150'}
        alt={`${book.title} cover`}
      />
      <h3>{book.title}</h3>
      <p>by {book.author}</p>
      <p>{book.reviewSnippet}</p>
    </div>
  );
};

export default BookCard;
