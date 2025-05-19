// src/components/WeatherCard.jsx
import React from 'react';

const WeatherCard = ({ title, value, icon }) => {
  return (
    <div className="weather-card">
      <span className="weather-card-icon">{icon}</span>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
};

export default WeatherCard;