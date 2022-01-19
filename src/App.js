import React, { useState, useEffect } from "react";
import logo from "./logo.png";

function App() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("jaipur");
  const [wind, setWind] = useState(null);
  const [weather, setWeather] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=31d8dbd502d8401b4531b833d67965cf`;
      const response = await fetch(url);
      const resJson = await response.json();
      console.log(resJson);

      setCity(resJson.main);
      setWind(resJson.wind);
      setWeather(resJson.weather[0]);
      setUrl(
        `http://openweathermap.org/img/wn/${resJson.weather[0].icon}@2x.png`
      );
    };

    fetchApi();
  }, [search]);

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center ">
          <img className="logo" alt="trueweather" src={logo} />
          <h2 className="text-center app-name">
            True
            <small className="text-muted">Weather</small>
          </h2>
          <div className="col-12 col-sm-12 col-xs-12">
            <div className="card p-4">
              <div className="d-flex text-center">
                <h3 className="flex-grow-1">{search}</h3>
              </div>
              <div className="d-flex flex-column temp mt-5 mb-3">
                {!city ? (
                  <h1> - </h1>
                ) : (
                  <h1 className="mb-0 font-weight-bold" id="heading">
                    {city.temp}
                    &nbsp;°C
                  </h1>
                )}
                {!weather ? (
                  <span> </span>
                ) : (
                  <span className="small grey"> {weather.main} </span>
                )}
              </div>
              <div className="d-flex">
                <div className="temp-details flex-grow-1">
                  <p className="my-1">
                    {" "}
                    <img alt="trueweather" src="https://i.imgur.com/B9kqOzp.png" height="17px" />
                    {!wind ? (
                      <span> - </span>
                    ) : (
                      <span> {(wind.speed * 3.6).toFixed(2)} km/hr</span>
                    )}
                  </p>
                  <p className="my-1">
                    {" "}
                    <i className="fa fa-tint mr-2" aria-hidden="true"></i>{" "}
                    {!city ? <span> </span> : <span> {city.humidity} % </span>}
                  </p>
                </div>
                <div>
                  {!weather ? <span> </span> : <img alt="trueweather" src={url} width="100px" />}
                </div>
              </div>

              <div className="input-city">
                <input
                  className="form-control form-control-sm"
                  type="search"
                  placeholder="Enter City"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
