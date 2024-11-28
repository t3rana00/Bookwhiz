// src/pages/BookDetailsPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import HomeButton from '../components/HomeButton';

const BookDetailsPage = () => {
  const { id } = useParams();
  return (
    <div>
         <HomeButton />
      <h2>Book Details (ID: {id})</h2>
      {/* Later, add logic to fetch and display book details based on the ID */}
    </div>
  );
};

export default BookDetailsPage;
