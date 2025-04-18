const API_KEY = "5796abbde9106b7da4febfae8c44c232"; // replace with your API key


async function checkWeahter(cityName) {

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    const response = await fetch(API_URL)
    let data = await response.json();

    console.log(data)
    const errorBox = document.querySelector('.error-msg');
    const weatherContainer = document.querySelector(".weather");
    if (response.status == 404) {
        console.log("City not found");
        errorBox.style.display = "block";
        weatherContainer.style.display = "none";
    }
    document.querySelector('#city').innerHTML = data.name;
    document.querySelector('#temp').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

    /* 
                         Official Icons Of Open WeatherMap

            const iconCode = data.weather[0].icon
            console.log(iconCode);
    
            const iconRes = fetch(`https://openweathermap.org/img/wn/${iconCode}@4x.png`)
            const icon = (await iconRes).url;
    
            document.querySelector('.weather-icon').src = icon;
            */


    const weatherIcon = document.querySelector('.weather-icon');
    const weatherName = data.weather[0].main.toLowerCase();
    if (data.weather[0].main == "Clear") {
        weatherIcon.src = "./icon/clear.png";
    } else if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "./icon/cloud.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "./icon/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "./icon/mist.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "./icon/rain.png";
    }

    weatherContainer.style.display = "block"
    errorBox.style.display = "none";


}

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button')

searchBtn.addEventListener('click', () => {
    const cityName = searchBox.value;
    checkWeahter(cityName);
})
