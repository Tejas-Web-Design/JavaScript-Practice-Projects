const apiKey = "f8de9f3f527bc4ca28f6c2a2f82d4389";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city +   `&appid=${apiKey}`);

    if(response.status == 404){
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    }else {
         var data = await response.json();
    


    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "℃";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr ";

     const condition = data.weather[0].main;
    if (condition === "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (condition === "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (condition === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (condition === "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if (condition === "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (condition === "Snow") {
        weatherIcon.src = "images/snow.png";
    } else {
        weatherIcon.src = "images/default.png"; // fallback for Haze/Smoke etc.
    }

    document.querySelector(".weather").style.display = "block"; 
    document.querySelector(".error").style.display = "none";
    }
   


}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

