// src/components/CurrentWeather.jsx
import React from 'react';
import WeatherCard from './WeatherCard';

const CurrentWeather = ({ data }) => {
  const { name, main, weather, wind, sys, dt } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const date = new Date(dt * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="current-weather">
      <div className="location-info">
        <h2>
          {name}, {sys.country}
        </h2>
        <p className="date">{date}</p>
        <p className="weather-description">{weather[0].description}</p>
      </div>
      
      <div className="weather-details">
        <div className="temperature">
          <img src={iconUrl} alt={weather[0].description} />
          <span className="temp-value">{Math.round(main.temp)}</span>
          <span className="temp-unit">°C</span>
        </div>
        
        <div className="additional-info">
          <WeatherCard
            title="Feels Like"
            value={`${Math.round(main.feels_like)}°C`}
            icon="🌡️"
          />
          <WeatherCard
            title="Humidity"
            value={`${main.humidity}%`}
            icon="💧"
          />
          <WeatherCard
            title="Wind Speed"
            value={`${Math.round(wind.speed)} m/s`}
            icon="🌬️"
          />
          <WeatherCard
            title="Pressure"
            value={`${main.pressure} hPa`}
            icon="⏲️"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;