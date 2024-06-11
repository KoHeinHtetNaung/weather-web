const apikey = "b701660723bf1f01f245229d42d6186e";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");


formEl.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
})

async function getWeatherData(cityValue) {
  try {
     const response = await fetch(
       `http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
     );
      
     if(!response.ok) {
      throw new Error ("Network error has happened..")
     }

     const data = await response.json(); //change to json format
     
     // take to object 
     const temperature = Math.round(data.main.temp); //round 2.8 = 3, 2.3 = 2
     const description = data.weather[0].description;
     const icon = data.weather[0].icon;
     const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}`,
      `Wind speed: ${data.wind.speed}`,
     ]

     weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="">`;
     weatherDataEl.querySelector(
       ".temperature"
     ).textContent = `${temperature}°C`;
     weatherDataEl.querySelector(".description").textContent = `${description}`;
     weatherDataEl.querySelector(".details").innerHTML = details.map(
       (detail) => `<div>${detail}</div>`
     ).join();
  } catch (error) {
    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML ="";
    weatherDataEl.querySelector(
      ".temperature"
    ).textContent ="";
    weatherDataEl.querySelector(".description").textContent =
      "An error has happened, please try again later...";
    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}

