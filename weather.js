const weatherDiv = document.querySelector(".weather");
const weatherIcon = document.getElementById("weather-icon");
const weatherDegree = document.querySelector(".weather-degree");
const weatherCity = document.querySelector(".weather-city");

async function fetchStuff(url) {
  const file = await fetch(url);
  const result = await file.json();
  return result;
}

async function fetchLocation(lat, lon) {
  const locationObj = await fetchStuff(
    `https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/search/?lattlong=${lat},${lon}`
  );
  const city = locationObj[0].title,
    woeid = locationObj[0].woeid;
  return [city, woeid];
}

async function fetchWeather(woeid) {
  const weatherObj = await fetchStuff(
    `https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/${woeid}/`
  );
  const temperature = weatherObj.consolidated_weather[0].the_temp,
    weatherAbbr = weatherObj.consolidated_weather[0].weather_state_abbr,
    country = weatherObj.parent.title;
  return [temperature, weatherAbbr, country];
}

async function handleSuccess(position) {
  let lat, lon;
  // if lat, lon data does not exist, save new data
  if (localStorage.getItem("coords") === null) {
    [lat, lon] = [position.coords.latitude, position.coords.longitude];
    saveCoords(lat, lon);
  }
  // else if lat, lon data already in lc, bring it
  else {
    [lat, lon] = JSON.parse(localStorage.getItem("coords"));
  }

  // get city and woeid with lat, lon data
  const [city, woeid] = await fetchLocation(lat, lon);
  // use woeid to get temp, abbreviated weather status and country
  const [temperature, weatherAbbr, country] = await fetchWeather(woeid);
  // get weather image based on weatherAbbr
  const weatherIconUrl = `https://www.metaweather.com//static/img/weather/png/${weatherAbbr}.png`;

  // display appropriate infos
  weatherIcon.src = weatherIconUrl;
  weatherDegree.innerHTML = temperature.toFixed(2) + "&deg;";
  weatherCity.innerText = city + ", " + country;

  toggleHidden();
}

function handleError() {
  console.log("Error");
}

function saveCoords(lat, lon) {
  const coords = [lat, lon];
  localStorage.setItem("coords", JSON.stringify(coords));
}

function saveLocation(location) {
  localStorage.setItem("location", location);
}

function toggleHidden() {
  weatherDiv.classList.toggle("hidden");
}

function weatherInit() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  } else {
    console.log("navigator not supported");
  }
}

window.addEventListener("load", weatherInit);
