const API_KEY = "5796abbde9106b7da4febfae8c44c232"; // Your API key here

function timeConvertor(UnixTimeStamp) {
    const date = new Date(UnixTimeStamp * 1000);

    // console.log(date.toString());
    return date.toString();
}

const errorBox = document.querySelector('.error-msg');
const weatherContainer = document.querySelector(".weather");
const loader = document.querySelector('.loader');


async function checkWeahter(cityName) {
    loader.style.display = "block"
    errorBox.style.display = "none"
    weatherContainer.style.display = "none"

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    const response = await fetch(API_URL)
    // console.log(API_URL);

    let data = await response.json();

    // console.log(data)

    if (response.status == 404) {
        // console.log("City not found");
        errorBox.style.display = "block";
        weatherContainer.style.display = "none";
        loader.style.display = "none"
    }
    const date = new Date();
    const timeNow = date.toLocaleTimeString();

    document.querySelector('#city').innerHTML = data.name;
    document.querySelector('#temp').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
    document.querySelector('.weather-type').innerHTML = data.weather[0].main;
    document.querySelector('.weather-time').innerHTML = timeNow;

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
    loader.style.display = "none"

}

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button')

searchBtn.addEventListener('click', () => {
    const cityName = searchBox.value;
    if (cityName == '') {
        errorBox.style.display = "block"
        weatherContainer.style.display = "none"
        errorBox.innerHTML = "Please enter a city name";
        errorBox.classList.add("error-msg-class")
    } else {
        checkWeahter(cityName);
    }
})

searchBox.addEventListener('keyup', (e) => {
    e.preventDefault()
    if (e.keyCode === 13) {
        const cityName = searchBox.value;
        if (cityName == '') {
            errorBox.style.display = "block"
            weatherContainer.style.display = "none"
            errorBox.innerHTML = "Please enter a city name";
            errorBox.classList.add("error-msg-class")
        } else {
            checkWeahter(cityName);
        }
    }
})



async function getUserWeather(lat, lon, cityName) {
    loader.style.display = "block"
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=5796abbde9106b7da4febfae8c44c232`)
    let data = await response.json();

    // console.log(data)

    if (response.status == 404) {
        // console.log("City not found");
        errorBox.style.display = "block";
        weatherContainer.style.display = "none";
    }
    const date = new Date();
    const timeNow = date.toLocaleTimeString();
    let weatherData = data.current;
    // console.log(weatherData);

    document.querySelector('#city').innerHTML = cityName;
    document.querySelector('#temp').innerHTML = Math.round(weatherData.temp) + "°C";
    document.querySelector('.humidity').innerHTML = weatherData.humidity + "%";
    document.querySelector('.wind').innerHTML = weatherData.wind_speed + " km/h";
    document.querySelector('.weather-type').innerHTML = weatherData.weather[0].main;
    document.querySelector('.weather-time').innerHTML = timeNow;


    const weatherIcon = document.querySelector('.weather-icon');
    const weatherName = weatherData.weather[0].main.toLowerCase();
    if (weatherData.weather[0].main == "Clear") {
        weatherIcon.src = "./icon/clear.png";
    } else if (weatherData.weather[0].main == "Clouds") {
        weatherIcon.src = "./icon/cloud.png";
    } else if (weatherData.weather[0].main == "Drizzle") {
        weatherIcon.src = "./icon/drizzle.png";
    } else if (weatherData.weather[0].main == "Mist") {
        weatherIcon.src = "./icon/mist.png";
    } else if (weatherData.weather[0].main == "Rain") {
        weatherIcon.src = "./icon/rain.png";
    }

    weatherContainer.style.display = "block"
    errorBox.style.display = "none";
    loader.style.display = "none"
}

let cachedIP;
async function fetchUserIp() {
    try {
        if (cachedIP) {
            return cachedIP;
        }
        const GEO_API_KEY = "b8568cb9afc64fad861a69edbddb2658";
        // Getting Ip adress of User
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        cachedIP = ipData.ip;
        // console.log(cachedIP);

        // Getting Location of User
        const Locationresponse = await fetch(`https://api.geoapify.com/v1/ipinfo?&ip=${cachedIP}&apiKey=${GEO_API_KEY}`);
        const LocationData = await Locationresponse.json();
        // console.log(LocationData)

        const requiredLocation = {
            ip: LocationData.ip,
            city: LocationData.city?.name || "Khanpur",
            countryCode: LocationData.country?.iso_code || "PK",
            location: {
                latitude: LocationData.location?.latitude || 28.6849,
                longitude: LocationData.location?.longitude || 70.3381
            },
        }

        return requiredLocation;
        // console.table(requiredLocation)

    } catch (error) {
        console.log(`Error during fetching ip adresss ${error}`);

    }
}


window.onload = async function () {
    loader.style.display = "block"
    const userIpData = await fetchUserIp();
    const latitude = userIpData.location.latitude;
    const longitude = userIpData.location.longitude;
    const cityName = userIpData.city
    getUserWeather(latitude, longitude, cityName)
    loader.style.display = "none"
}