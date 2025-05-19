// src/components/Forecast.jsx
import React from 'react';
import WeatherCard from './WeatherCard';

const Forecast = ({ data }) => {
  // Group forecast by day
  const dailyForecast = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Get the next 5 days (excluding today)
  const forecastDays = Object.keys(dailyForecast).slice(1, 6);

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-days">
        {forecastDays.map((day) => {
          const dayData = dailyForecast[day][0]; // Take midday forecast for simplicity
          const date = new Date(dayData.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
          });
          const iconUrl = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;

          return (
            <div key={day} className="forecast-day">
              <p className="day-name">{date}</p>
              <img src={iconUrl} alt={dayData.weather[0].description} />
              <div className="day-temps">
                <span className="temp-max">
                  {Math.round(dayData.main.temp_max)}°
                </span>
                <span className="temp-min">
                  {Math.round(dayData.main.temp_min)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;