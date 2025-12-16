import React from 'react';

const Card = ({ children, className = '', onClick, hover = true }) => {
  return (
    <div 
      className={`glass-card p-6 ${hover ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;