import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  console.log(data);

  // Create a new Date object for the current date and time
  var currentDate = new Date();

  // Define months array
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get day, month, year, hour, and minute
  var day = currentDate.getDate();
  var month = months[currentDate.getMonth()];
  var year = currentDate.getFullYear();
  var hour = currentDate.getHours();
  var minute = currentDate.getMinutes();

  // Format the date string
  var formattedDate =
    day +
    " " +
    month +
    " " +
    year +
    " " +
    hour +
    ":" +
    (minute < 10 ? "0" : "") +
    minute;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9cc77cc19bc2899c20255383b4552b6f`;

  async function searchLocation(event) {
    if (event.key === "Enter") {
      // Handle the Enter key press
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLocation("");
    }
  }

  return (
    <>
      <div className="app">
        <div className="search">
        <h1>Check Your Weather</h1>
        <p>Enter a city name to get started.</p>
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Search By City"
            onKeyDown={searchLocation}
          />
        </div>
        <div className="container">

        {data.cod == 200?
          <div className="top">
            <div className="location">
              <h1>{data.name}</h1>
            </div>
            <p>Today</p>
            <div className="temp">
              {data.main ? (
                <h1>{(data.main.temp - 273.15).toFixed(1)}°C</h1>
              ) : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
            {data.main?
              <p>Now it seems like the temperature will range between {(data.main.temp_min - 273.15).toFixed(1)}°C and {(data.main.temp_max - 273.15).toFixed(1)}°C</p>:null
          }
          </div>:<p>{data.message}</p>
        }


          {data.name != undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{(data.main.feels_like - 273.15).toFixed(1)}°C</p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed}MPH</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
