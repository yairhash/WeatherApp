import React from "react";
import "./index.css"

const api = {
  key:"a24c3cf9b40318c238b50ad7bfd62444",
  basse:"https://api.openweathermap.org/data/2.5/"
}



function App() {

  const [query,setQuery] = React.useState('')
  const [weather,setWeather] = React.useState ({})
  
    function search(event){
      if(event.key==='Enter'){
        fetch(`${api.basse}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(data=>{ 
          if(data.message == "city not found"){
            alert("City was not found")
          }else{
            setWeather(data)
            setQuery('')
            console.log(data)
          }         
        })
      }
    }

  
  function handleChange(event){
    setQuery(event.target.value)
  }

  function getDate(){
    const d = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const day = days[d.getDay()]
    const date = d.getDate()
    const month = months[d.getMonth()] 
    const year = d.getFullYear()
    return `${day} ${date} ${month} ${year}`
  }



  

  return (
    <div className={(typeof weather.main != "undefined")? ((weather.main.temp >16)? "app-warm":"app"):"app" }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={handleChange}
            onKeyPress={search}
            value={query}
          /> 
        </div>
        {(typeof weather.main != "undefined")?(
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div> 
              <div className="date">{getDate()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)} ℃ <br></br>
                <span>Min temp: {Math.round(weather.main.temp_min)}℃ </span> 
                <span>Max temp: {Math.round(weather.main.temp_max)}℃ </span>
              </div> 
              <div className="weather">
                <span>{weather.weather[0].description}</span>

                <span className="icon"><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/></span>
              </div>
            </div>
          </div>
        ):(
          <div className="front-page">
            <h1 className="page-title">WEATHER APP</h1>
          </div>
        )}
      </main>
    </div>    
  );
}

export default App;
