import React from "react";
import "./styles.css";
import Weather from "./component/Weather";
import rainy from "./images/rainy.png";
import sunny from "./images/sunny.png";
import sunnyrainy from "./images/sunnyrainy.png";
import clouds from "./images/clouds.png";

const API_KEY = "ea7ae2984415955e45a37f6e9b3a0847";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      sky: "",
      town: "Belgrade",
      temperature: "",
      minTemp: "",
      maxTemp: "",
      search: ""
    };
  }

  checksWeather(sky) {
    if (sky === "Clouds") {
      return clouds;
    } else if (sky === "Rain") {
      return rainy;
    } else if (sky === "Clear") {
      return sunny;
    }
  }

  turnToCelsius(temp) {
    let result = Math.round(temp - 273);
    return result;
  }

  handleChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  onSearch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        this.state.town
      }&appid=${API_KEY}`
    )
      .then(results => {
        return results.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          sky: data.weather[0].main,
          temperature: this.turnToCelsius(data.main.temp),
          town: this.state.search,
          minTemp: this.turnToCelsius(data.main.temp_min),
          maxTemp: this.turnToCelsius(data.main.temp_max)
        });
      });
  };

  render() {
    return (
      <div className="input">
        <input
          value={this.state.search}
          placeholder="search..."
          onChange={this.handleChange}
        />
        <button onClick={this.onSearch}>search</button>
        <div>
          <Weather
            city={this.state.town}
            img={this.checksWeather(this.state.sky)}
            temperature={this.state.temperature}
            min={this.state.minTemp}
            max={this.state.maxTemp}
          />
        </div>
      </div>
    );
  }
}

export default App;
