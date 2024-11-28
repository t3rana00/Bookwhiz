// src/components/HomeButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <button onClick={handleHomeClick} style={{ margin: '10px', padding: '10px' }}>
      Home
    </button>
  );
};

export default HomeButton;
