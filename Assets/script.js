let apiKey = 'a5ceee039d9340faa7953b042ac20168';
let cityInput = document.querySelector("#search");
let searchBtn = document.querySelector("#search-btn");
let tempEl = document.getElementById("temperature");
let humidityEl = document.getElementById("humidity");
let windEl = document.getElementById("wind");
let forecastDiv = document.getElementById("forecast");
let weatherDashboard = document.getElementById("city");
let cardIcon = document.querySelector(".card-icon");
let cardTemp = document.querySelector(".card-temp");
let cardHumidity = document.querySelector(".card-humidity");
let cardWind = document.querySelector(".card-wind");
let cardDate = document.querySelector(".card-date");
let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let dateCall = new Date();
let date = month[dateCall.getMonth()] + "/" + dateCall.getDate() + "/" + dateCall.getFullYear();

function weatherFunction(city){
    let apiParams = new URLSearchParams({
        key:apiKey,
        city,
        units: "I"
    })

    let currentweatherAPI = 
    "https://api.weatherbit.io/v2.0/current?"+apiParams;
        fetch(currentweatherAPI)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            currentWeather(data)
            console.log(data);
        });

    let currentWeather = function(current){
        let weatherIcon = document.createElement("img");
            weatherIcon.src = "./assets/icons/" + current.data[0].weather.icon + ".png";
        let city = document.getElementById("city");
        city.textContent=current.data[0].city + "" + date;

        tempEl.textContent = current.data[0].temp + "°F";
        humidityEl.textContent = current.data[0].rh + "%";
        windEl.textContent = current.data[0].wind_spd + "MPH";
        city.appendChild(weatherIcon);
    }

    let forecastweatherAPI = 
    "https://api.weatherbit.io/v2.0/forecast/daily?"+apiParams;

    fetch(forecastweatherAPI)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        forecastWeather(data)
        console.log(data);
    });

    let forecastWeather = function(forecast) {
        for(i=1; i<6; i++) {
            cardDate[i-1].textContent = forecast.data[i].datetime;
            cardIcon[i-1].src = "./assets/icons/" + forecastdata[i].weather.icon + ".png";
            cardTemp[i-1].textContent = "Temperature:" + forecast.data[i].temp;
            cardHumidity[i-1].textContent = "Humidity:" + forecast.data[i].rh + "%";
            cardWind[i-1].textContent = "Wind:" + forecast.data[i].wind_spd + "MPH";
        }
    }

    // let forecastWeather = function(forecast) {
    //     for (let i=1; i<6; i++) {
    //         let icon = document.getElementById("icon"+[i]);
    //         let cardTitle = document.getElementById("date"+[i]);
    //         let forecastTemp = document.getElementById("temperature"+[i]);
    //         let forecastHumidity = document.getElementById("humidity"+[i]);
    //         let forecastWind = document.getElementById("wind"+[i]);

    //         cardTitle.textContent = "Forecast:" + forecast.data[i].valid_date;
    //         forecastTemp.textContent = "Temperature:" + forecast.data[i].temp + "°F";
    //         forecastHumidity.textContent = "Humidity:" + forecast.data[i].rh + "%";
    //         forecastWind.textContent = "Wind:" + forecast.data[i].wind_spd + "MPH";
    //     }
    }

searchBtn.addEventListener('click', function() {
    let city = cityInput.value;
    weatherFunction(city);

    let saveSection = document.getElementById('cities');
    let liEl = document.createElement("li");
    let searchSaveBtn = document.createElement("button");

    saveSection.append(liEl);
    liEl.append(searchSaveBtn);

    searchSaveBtn.textContent = cityInput.value;
    sarchSaveBtn = addEventListener('click', function() {
        weatherFunction(city);
    })
})