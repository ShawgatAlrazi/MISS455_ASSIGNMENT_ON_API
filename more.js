
function connect() {
    var searchTerm = document.getElementById("searchBox").value;
    document.getElementById("searchBox").value = "";
    let url = `https://restcountries.com/v3.1/name/${searchTerm}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayCountries(data));
}


function displayCountries(countries) {
    var container = document.getElementById("container");
    container.textContent = ""; 

    countries.forEach(country => {
        var countryDiv = document.createElement("div");
        countryDiv.classList.add("innerStyle");

        countryDiv.innerHTML = `
            <p>Country Name: <b>${country.name.common}</b></p>
            <button class="more-details-btn" onclick="showMoreDetails('${country.name.common}')">More Details</button>
        `;

        container.appendChild(countryDiv);
    });
}


function showMoreDetails(countryName) {
  
    localStorage.setItem('selectedCountry', countryName);

    window.location.href = 'country-details.html';
}


function displayCountryDetails() {
    var countryName = localStorage.getItem('selectedCountry');
    var detailsContainer = document.getElementById("details-container");
    var countryinfodiv=document.createElement("div")

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(res => res.json())
        .then(data => {
            var country = data[0];
          
             
            countryinfodiv.innerHTML = `
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Capital: ${country.capital}</p>
            `;

        });

        countryinfodiv.classList.add("countrystyle")

        detailsContainer.appendChild(countryinfodiv);       
}

function searchWeather() {

    const apiKey = '15d62855a8cde5311ed5b82e995e2fd3'; 
    var searchInput = localStorage.getItem('selectedCountry');
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}`;
   
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weather-container');
    weatherDataDiv.innerHTML = '';
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15); 
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const body = document.body;
    const weatherCondition = data.weather[0].main.toLowerCase();
    console.log(weatherCondition);
    
    const weatherInfo = document.createElement('div');
    weatherInfo.innerHTML = `
        <h1>${cityName}</h1>
        <h3>Temperature: <span class="text-orange">${temperature}°C</span></h3>
        <h3>Weather: <span class="text-orange">${weatherDescription}</span></h3>
     
        <h3>Humidity: <span class="text-orange">${humidity}</span></h3>
        <h3>windSpeed: <span class="text-orange">${windSpeed}</span></h3>
       
    `;
    weatherInfo.classList.add("weather_style")

    weatherDataDiv.appendChild(weatherInfo);
}

function initializePage() {
    displayCountryDetails();
    searchWeather();
}


