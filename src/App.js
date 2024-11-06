import React, { useState } from "react";
import "./App.css";
import backgroundVideo from "C:/Users/Lenovo/OneDrive/Desktop/react/NEWAPP/wheatherapp/src/videos/10651122-hd_1920_1080_30fps.mp4"; 

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (cityName) => {
    try {
      const apiKey = "eef9e31a451decda1c929f1271bff549"; // Replace with your API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      console.log("-----------data cod");
      console.log(data.cod);

      if (data.cod === 200) {
        setWeatherData(data);
        setError(null); // Clear any previous errors
      } else {
        setError(data.message);
        setWeatherData(null); // Clear weather data if there's an error
      }
    } catch (err) {
      setError("Failed to fetch weather data");
      setWeatherData(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city) {
      fetchWeatherData(city);
    }
  };

  return (
    <div className="App">
       <video
        autoPlay
        loop
        muted
        className="background-video"
        src={backgroundVideo}
        type="video/mp4"
      />
        
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <div className="content">
        <h1>Weather App</h1>
        <div className="search-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
            onChange={(e) => setCity(e.target.value)}
          
        />
        <button type="submit">Get Weather</button>
        </form>
        </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div className="contenttext">
          {/* Destructuring weatherData */}
          <h2>
            Weather in {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>
            Coordinates: Longitude {weatherData.coord.lon}, Latitude{" "}
            {weatherData.coord.lat}
          </p>
          <p>
            Weather: {weatherData.weather[0].main} -{" "}
              {weatherData.weather[0].description}
              
              <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="weather-icon"
            />
            </p>
              
            <br></br>
          <p>
            Temperature: {weatherData.main.temp}°C (Feels like:{" "}
            {weatherData.main.feels_like}°C)
          </p>
          <p>
            Min Temperature: {weatherData.main.temp_min}°C, Max Temperature:{" "}
            {weatherData.main.temp_max}°C
          </p>
          <p>Pressure: {weatherData.main.pressure} hPa</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>
            Wind: {weatherData.wind.speed} m/s, Direction:{" "}
            {weatherData.wind.deg}°
          </p>
          <p>Cloudiness: {weatherData.clouds.all}%</p>
          <p>
            Sunrise:{" "}
            {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>
            Sunset:{" "}
            {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </p>
            
          </div>
         
        )}
          </div>
      
        </div>
      
  );
};

export default App;