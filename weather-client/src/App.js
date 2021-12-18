import "./App.css";
import React, { useEffect } from "react";
import axios from "axios";
function App() {
  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: { q: "London", appid: "8dc9ba99c4e5fe28f4dc20edbc1848c0" },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div className="App"></div>;
}

export default App;
