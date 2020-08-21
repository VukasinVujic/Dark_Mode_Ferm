import React, { useEffect, useState } from "react";

import "./App.css";

const App = () => {
  const [rain, setRain] = useState("day-mode");

  const wordsForRain = {
    // only Thunderstorm with these IDs have rain
    Thunderstorm: [200, 201, 202, 230, 231, 232],
    // Drizzle IDs are all rain
    Drizzle: [],
    // Rain IDs are all rain
    Rain: [],
    // only Snow with these IDs have rain
    Snow: [611, 612, 613, 615, 616, 621, 622],
  };
  const checkIfRain = ({ id, main }) => {
    const { Thunderstorm, Snow } = wordsForRain;
    let isRain = false;
    if (main === "Thunderstorm") {
      isRain = Thunderstorm.includes(id);
    } else if (main === "Rain") {
      isRain = true;
    } else if (main === "Drizzle") {
      isRain = true;
    } else if (main === "Snow") {
      isRain = Snow.includes(id);
    }
    return isRain;
  };
  const getRain = () => {
    return rain;
  };

  const turnToDarkOrNot = (currentWeather) => {
    let isRain = false;
    if (currentWeather.length) {
      // I am doing for loop because in some cases in json response
      // you get more than one object in weather array
      for (var i = 0; i < currentWeather.length; i++) {
        if (checkIfRain(currentWeather[i])) {
          console.log("Rain Rain Rain");
          isRain = true;
        }
      }
    } else {
      console.log("It is not raining");
      isRain = false;
    }
    return colorToDark(isRain);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=Novi%20Sad&appid=abb0aae5262dc68ed66664634715c4a8"
        // "http://api.openweathermap.org/data/2.5/weather?q=Flatts&appid=abb0aae5262dc68ed66664634715c4a8"
        // "http://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=abb0aae5262dc68ed66664634715c4a8"
      );

      const json = await res.json();
      setRain(turnToDarkOrNot(json.weather));
    };
    fetchData();
  }, []);

  const colorToDark = (arg) => {
    return arg ? "dark-mode" : "day-mode";
  };

  return (
    <div>
      <div className="title-picture">
        <h1>Novi Sad weather</h1>
        <img
          src={`./${rain === "dark-mode" ? "nightMoon.png" : "dayMoon.png"}`}
          alt=""
        />
      </div>
      <div className="container">
        <p>
          some text some text some text some text some text some textsome text
          some text some textsome text some text some textsome text some text
          some text
        </p>
        <p>
          some text some text some text some text some text some textsome text
          some text some textsome text some text some textsome text some text
          some text
        </p>
      </div>
      <div className="input-fields">
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
      </div>
      <div className="button-style">
        <div className="button-rigth">
          <button className="save-button">Save</button>
          <button className="submit-button">Submit</button>
        </div>
      </div>

      <script>{(document.body.classList = [`${getRain()}`])}</script>
    </div>
  );
};

export default App;
