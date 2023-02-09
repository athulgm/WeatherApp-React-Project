import React, { useState, useEffect } from "react";

function Gweather() {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (Object.keys(location).length === 0) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_OPENWEATHER_APPID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });
  }, [location]);

  return (
    <div>
      {Object.keys(weather).length === 0 ? (
        <p>Loading weather...please enable location on the browser.</p>
      ) : (
        <>
          <div className="weather-card">
            <p>Weather based on Location:</p>
            <div className="card-header">
              <div>
                <p className="weather-city">
                  {weather ? weather.name + " " + weather.sys.country : "-"}
                </p>
                <p className="weather-description">
                  {weather ? weather.weather[0].description : "-"}
                </p>
              </div>
            </div>

            <div className="card-body">
              <h2 className="weather-temp">
                {weather ? Math.round(weather.main?.temp - 273.15) : ""}°C
              </h2>
              <div className="weather-details">
                <div className="parameters">
                  <span className="param-label">Details </span>
                </div>
                <div className="parameters">
                  <span className="param-label">Feels Like: </span>
                  <span className="param-val">
                    {weather
                      ? (weather.main?.feels_like - 273.15).toFixed(2)
                      : "-"}{" "}
                    °C
                  </span>
                </div>
                <div className="parameters">
                  <span className="param-label">Humidity: </span>
                  <span className="param-val">
                    {weather ? weather.main?.humidity : "-"} %
                  </span>
                </div>
                <div className="parameters">
                  <span className="param-label">Pressure: </span>
                  <span className="param-val">
                    {weather ? weather.main?.pressure : "-"} hPs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Gweather;
