import React, { useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState([]);

  const api = {
    key: "5264f20f4b01443398cee3a3b201b2ad",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          setErrors([]);
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 404) {
            setErrors(["City not found"]);
          } else {
            setErrors(["Couldn't get the data"]);
          }
        });
      setLocation("");
    }
  };

  return (
    <div
      className={
        typeof data.main != "undefined"
          ? data.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <Navbar />
      <div className="search text-center py-3">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {errors.length > 0 && (
        <div className="alert alert-danger text-center">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
      <div className="weatherContainer max-w-full m-auto flex flex-col justify-between">
        <div className="top w-full">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom flex flex-wrap text-center justify-evenly w-full">
            <div className="feels">
              {data.main ? (
                <p className="font-weight-bold">
                  {data.main.feels_like.toFixed()}°C
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="font-weight-bold">{data.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="font-weight-bold">
                  {data.wind.speed.toFixed()} MPH
                </p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
