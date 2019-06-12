import React, { Component } from "react";
import axios from "axios";

const apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&units=metric&APPID=71d1f6939165706dd2fea5ac2d240e3f";

class WeatherApp extends Component {
  state = {
    data: { cityName: "" },
    weatherStatus: {
      name: "",
      main: {
        humidity: "",
        pressure: "",
        temp: "",
        temp_max: "",
        temp_min: ""
      },
      weather: [],
      wind: {
        speed: ""
      }
    }
  };

  getWeather = async () => {
    const city = this.state.data.cityName;
    console.log(city);

    try {
      const { data: weatherStatus } = await axios.get(
        apiEndpoint + city + apiKey
      );
      console.log(weatherStatus);
      this.setState({ weatherStatus });
    } catch (ex) {
      alert("Something failed or not entered proper city");
    }
  };

  handleChange = e => {
    const data = { ...this.state.cityName };
    data.cityName = e.currentTarget.value;
    this.setState({ data });
  };

  renderResults() {
    if (this.state.weatherStatus.name === "") return null;

    return (
      <div className="result-container m-2 p-3">
        <div>City: {this.state.weatherStatus.name}</div>
        <div>Temperature: {this.state.weatherStatus.main.temp}</div>
        <div>Min.Temperature {this.state.weatherStatus.main.temp_min}</div>
        <div>Max.Temperature {this.state.weatherStatus.main.temp_max}</div>
        <div>Humidity: {this.state.weatherStatus.main.humidity}</div>
        <div>Wind Speed: {this.state.weatherStatus.wind.speed}</div>

        <div className="weather-mini-box">
          <h3 className="weather-mini-box-head">Weather</h3>
          {this.state.weatherStatus.weather.map(item => {
            return (
              <ul key={item.id}>
                <li>{item.description}</li>
              </ul>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    console.log();
    return (
      <div className="container">
        <div className="weather-box border border-light p-4 mt-5 shadow-sm">
          Enter City:{" "}
          <input
            type="text"
            value={this.state.cityName}
            onChange={this.handleChange}
          />
          <button
            className="m-2 btn btn-primary btn-sm"
            onClick={this.getWeather}
          >
            Show Weather
          </button>
        </div>
        <div>{this.renderResults()}</div>
      </div>
    );
  }
}

export default WeatherApp;
