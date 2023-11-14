import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(city, state) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${process.env.API_KEY}`;

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      try {

        if (request.status !== 200) {
          throw new Error(`Error ${request.status}: ${request.statusText}`);
        }
        const response = JSON.parse(request.responseText);
        printElements(response, city, state);
      } catch (error) {
        printError(error, city, state);
      }
    }
  };

  request.open("GET", url, true);
  request.send();
}

function tempConvert(kelvin) {
  let fahrenheit = (1.8 * (kelvin - 273) + 32).toFixed(1);
  return fahrenheit;
}

// UI Logic

function printElements(apiResponse, city, state) {
  let kelvin = apiResponse.main.temp;
  let fahrenheit = tempConvert(kelvin);
  document.querySelector('#showResponse').innerText = `The humidity in ${city}, ${state} is ${apiResponse.main.humidity}%. 
  The temperature is ${fahrenheit} degrees. The weather is ${apiResponse.weather[0].description}, and the visibility is ${apiResponse.visibility}`;
}



function printError(error, city, state) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}, ${state}: ${error.message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#city').value;
  const state = document.querySelector('#state').value;
  document.querySelector('#city').value = null;
  document.querySelector('#state').value = null;
  getWeather(city, state);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});