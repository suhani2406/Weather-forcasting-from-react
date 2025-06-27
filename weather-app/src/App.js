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
  const API_KEY = "aa3609b50a9c3b9d3930e3b686d39c57";
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();

      if (weatherData.cod !== 200) {
        throw new Error(weatherData.message || 'Failed to fetch weather data');
      }

      setWeatherData(weatherData);

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

  const getBackgroundGradient = (condition) => {
    if (!condition) return '#0f2027';
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'linear-gradient(135deg, #2980b9, #6dd5fa, #ffffff)';
      case 'clouds':
        return 'linear-gradient(135deg, #bdc3c7, #2c3e50)';
      case 'rain':
      case 'drizzle':
        return 'linear-gradient(135deg, #2c3e50, #4ca1af)';
      case 'thunderstorm':
        return 'linear-gradient(135deg, #000000, #434343)';
      case 'snow':
        return 'linear-gradient(135deg, #e0eafc, #cfdef3)';
      default:
        return 'linear-gradient(135deg, #373B44, #4286f4)';
    }
  };

  return (
    <div
      className="app"
      style={{
        background: weatherData ? getBackgroundGradient(weatherData.weather[0].main) : '#0f2027',
        color: '#fff',
        minHeight: '100vh',
        padding: '2rem',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
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
