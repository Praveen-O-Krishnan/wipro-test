import React, { Component } from "react";
import WeatherApp from "./components/weatherApp";
import "./index.css";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1 className="text-center mt-3">Weather App</h1>
        <WeatherApp />
      </React.Fragment>
    );
  }
}

export default App;
