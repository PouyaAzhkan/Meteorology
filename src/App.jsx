import "./App.css";
import { useEffect, useState } from "react";
import { Weather } from "./components/Weather";

const App = () => {
  const [location, setLocation] = useState(() => {
     return localStorage.getItem("location") || ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState([]);
  console.log(weather);

  const convertToFlag = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  useEffect(() => {
    const controller = new AbortController() 

    const getWeather = async (location) => {
      try {
        setLoading(true);
        // 1) Getting location (geocoding)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`, 
          {signal: controller.signal}
        );
        const geoData = await geoRes.json();
        console.log(geoData);

        if (!geoData.results) throw new Error("Location not found");

        const { latitude, longitude, timezone, name, country_code } =
          geoData.results.at(0);
        setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

        // 2) Getting actual weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();
        setWeather(weatherData.daily);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (location.length < 2) return setWeather([]);

    if (location) {
      localStorage.setItem("location", location)
    }

    getWeather(location)

    return () => { 
      controller.abort()
    }
  }, [location]);


  return (
    <div className="app">
      <h1>Meteorology</h1>
      <div>
        <input
          type="text"
          placeholder="Search from location..."
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>
      {loading && <p className="loader">Loading...</p>}
      {weather.weathercode && (
        <Weather weather={weather} locationData={displayLocation} />
      )}
    </div>
  );
};

export { App };
