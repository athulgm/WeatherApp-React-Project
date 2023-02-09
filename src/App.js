import './App.css';
import { useState } from 'react';
import { fetchWeather } from './api';
import WeatherCard from './components/WeatherCard';
import Gweather from './components/Gweather';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
    
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const weather = await fetchWeather(city, setError);
      setWeather(weather);
    } catch (error) {
      setError("Location not found");
    }
  };

  return (
    <div className="App">
      <h1 className='app_heading'>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {error ? (
        <p className='error'>{error}</p>
      ) : (
        <>
        <div className='main-container'>
        <WeatherCard weather={weather} />
        <Gweather />
        </div>
        </>
      )}
    </div>
  );
}

export default App;