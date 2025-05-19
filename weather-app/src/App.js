import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';

function App() {
 const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState('London');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;  //API idhar se change 
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();
      
      if (weatherData.cod !== 200) {
        throw new Error(weatherData.message || 'Failed to fetch weather data');
      }
      
      setWeatherData(weatherData);
      
      // Fetch forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      
      if (forecastData.cod !== '200') {
        throw new Error(forecastData.message || 'Failed to fetch forecast data');
      }
      
      setForecastData(forecastData);
      setLocation(city);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(location);
  }, [location]);

  const handleSearch = (searchTerm) => {
    fetchWeatherData(searchTerm);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-title">Weather Forecast</h1>
        <SearchBar onSearch={handleSearch} />
        
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        
        {weatherData && !loading && !error && (
          <>
            <CurrentWeather data={weatherData} />
            {forecastData && <Forecast data={forecastData} />}
          </>
        )}
      </div>
    </div>
  );
}


export default App;