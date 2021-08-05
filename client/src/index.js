
//importing the required libraries
import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
require('dotenv').config();

//creating a class Component Weather to manage the frontend
class Weather extends React.Component
{
  //constructor for initialising
  constructor(props)
  {
    super(props);
    
    this.state = 
    { 
      city    :"",  //for storing the city to be searched
      weather : [], //for storing the fetched weather for the selected city
      history : [], //for storing the search history retrieved from database
      showHis : 0   //for making the history visible or invisible
    };
  }
  
  //changing the state variable city to the user input
  changeState = (event) =>
  {
    this.setState({city: event.target.value});
  }

  //fetching the weather for the selected city
  getWeather = async (event) =>
  {
    event.preventDefault(); //preventing default form submission
    this.setState({showHis:0}); //making the history section as invisble
    var city = this.state.city;
    console.log(city);
    var response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER}`); //storing the weather in response variable
    this.setState({weather:response.data}); //changing the state variable weather to store the fetched response data
       
    await axios.post(`http://localhost:1000/weather`,response.data); //sending the fetched weather to the server for storing in database and waiting for confirmation
  }

  //displaying the history of searches
  showHistory = async () =>
  {
    console.log(`http://localhost:1000/history`);
    const response = await axios.get(`http://localhost:1000/history`); //storing the records fetched from database to response
    this.setState({history:response.data}); //changing the state variable history to store the response data
    this.setState({showHis: 1}); //to make the history section visible
  }   

  render()
  {
    return (
      <div>
      <form onSubmit = {this.getWeather}>
        <label htmlFor = "City">Enter City name</label>
        <input type = "text" id = "City" onChange={this.changeState}></input>
        <button type="submit">Submit</button>
      </form>

      {this.state.weather.name ?
      (
        <div>
        <h1>{this.state.weather.name}</h1>
        <h3>Current Temperature: {this.state.weather.main.temp}K</h3>
        <h3>Min Temp: {this.state.weather.main.temp_min}K</h3>
        <h3>Max Temp: {this.state.weather.main.temp_max}K</h3>
        <h3>Pressure: {this.state.weather.main.pressure}</h3>
        <h3>Humidity: {this.state.weather.main.humidity}</h3>
        <h3>Wind: Speed- {this.state.weather.wind.speed}, Degree- {this.state.weather.wind.deg}</h3>
        <h3>Visibility: {this.state.weather.visibility}</h3>
        </div>
      
      ):null}
      
      <button type="button" onClick={this.showHistory}>HISTORY</button>
      {this.state.showHis ? 
      (
        <>
        {this.state.history.length>0 ?
      (
        <>
        <h1>HISTORY</h1>
        {this.state.history.map((city) =>
        (
          <div>
          <h3>City: {city.Name}</h3>
          <div>Current Temperature: {city.CurTemp}K</div>
          <div>Min Temp: {city.MinTemp}K</div>
          <div>Max Temp: {city.MaxTemp}K</div>
          <div>Pressure: {city.Pressure}</div>
          <div>Humidity: {city.Humidity}</div>
          <div>Wind: Speed- {city.WindSpd}, Degree- {city.WindDeg}</div>
          <div>Visibility: {city.Visibility}</div>
          <br></br>
          <br></br>
          </div>
        ))}
        </>
      )
      : <div> HISTORY IS EMPTY </div>}
        
        </>

      ):null}
      </div>
    )
  }
}

ReactDOM.render(<Weather />, document.getElementById('root'));