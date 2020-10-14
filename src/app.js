let celTemp = null;
let locationName = null;
let windSpeed = null;

//shows forecast for the next 4 days

function forecast(response) {
    let firstTemp = document.querySelector("#first-temp");
    firstTemp.innerHTML = `${Math.round(response.data.list[0].main.temp_min)}° / <b>${Math.round(response.data.list[0].main.temp_max)}°`;
    let firstIcon = document.querySelector("#first-icon");
    let iconUrlF = (`https://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`);
    firstIcon.setAttribute("src", iconUrlF);

    let secondTemp = document.querySelector("#second-temp");
    secondTemp.innerHTML = `${Math.round(response.data.list[1].main.temp_min)}° / <b>${Math.round(response.data.list[1].main.temp_max)}°`;
    let secondIcon = document.querySelector("#second-icon");
    let iconUrlS = (`https://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png`);
    secondIcon.setAttribute("src", iconUrlS);

    let thirdTemp = document.querySelector("#third-temp");
    thirdTemp.innerHTML = `${Math.round(response.data.list[2].main.temp_min)}° / <b>${Math.round(response.data.list[2].main.temp_max)}°`;

    let thirdIcon = document.querySelector("#third-icon");
    let iconUrlT = (`https://openweathermap.org/img/wn/${response.data.list[2].weather[0].icon}@2x.png`);
    thirdIcon.setAttribute("src", iconUrlT);

    let forthTemp = document.querySelector("#forth-temp");
    forthTemp.innerHTML = `${Math.round(response.data.list[3].main.temp_min)}° /<b> ${Math.round(response.data.list[3].main.temp_max)}°`;

    let forthIcon = document.querySelector("#forth-icon");
    let iconUrlR = (`https://openweathermap.org/img/wn/${response.data.list[3].weather[0].icon}@2x.png`);
    forthIcon.setAttribute("src", iconUrlR);
}

//shows the current temperature+changes the heading of today's main card

function getCurrent(response) {
    console.log(response);
    let currentTemp = document.querySelector("#today-temp");
    currentTemp.innerHTML = `<b>${Math.round(response.data.main.temp)}℃`;
    celTemp = Math.round(response.data.main.temp);
    let description = document.querySelector("#current-des");
    description.innerHTML = `${response.data.weather[0].description}`;
    let heading = document.querySelector("#place");
    heading.innerHTML = response.data.name;
    locationName = response.data.name;
    let humid = document.querySelector("#humid");
    humid.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    let speed = document.querySelector("#wind");
    speed.innerHTML = `Wind speed: ${response.data.wind.speed} km/h`;
    windSpeed = response.data.wind.speed;
    let todayIcon = document.querySelector("img");
    let iconUrl = (`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    todayIcon.setAttribute("src", iconUrl);
    let apiKey = "e2a35def79247fa91a2b82c7838e47a9";
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&units=metric&appid=${apiKey}`;
    axios.get(forecastUrl).then(forecast);
}

//stores the location searched for 

function place(event) {
    let search = document.querySelector("#locationSearch");
    event.preventDefault();
    search = (search.value).trim();
    let apiKey = "e2a35def79247fa91a2b82c7838e47a9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(getCurrent);

}
//gets the weather for geolocation

function showPosition(location) {
    let apiKey = "e2a35def79247fa91a2b82c7838e47a9";
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(getCurrent);

}
//what happens when geolocation button is clicked

function geoLocation(event) {
    navigator.geolocation.getCurrentPosition(showPosition);
}

//unit conversion

function convert(event) {
    let fer = document.querySelector("#today-temp");
    fer.innerHTML = `<b>${Math.round(celTemp * 9 / 5 + 32)}℉`;
    let wind = document.querySelector("#wind");
    wind.innerHTML = `wind speed: ${windSpeed*0.6} mph`;
    let apiKey = "e2a35def79247fa91a2b82c7838e47a9";
    forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&units=imperial&appid=${apiKey}`;
    axios.get(forecastUrl).then(forecast);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", place);
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let now = new Date();
let today = document.querySelector("#today-card");
today.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${now.getMinutes()}`;
if ((now.getDay() + 1) >= 7) {
    let forth = document.querySelector("#first-day");
    forth.innerHTML = days[now.getDay() + 1 - 7];
} else {
    let first = document.querySelector("#first-day");
    first.innerHTML = days[now.getDay() + 1];
}
if ((now.getDay() + 2) >= 7) {
    let forth = document.querySelector("#second-day");
    forth.innerHTML = days[now.getDay() + 2 - 7];
} else {
    let second = document.querySelector("#second-day");
    second.innerHTML = days[now.getDay() + 2];
}
if ((now.getDay() + 3) >= 7) {
    let forth = document.querySelector("#third-day");
    forth.innerHTML = days[now.getDay() + 3 - 7];
} else {
    let third = document.querySelector("#third-day");
    third.innerHTML = days[now.getDay() + 3];
}
if ((now.getDay() + 4) >= 7) {
    let forth = document.querySelector("#forth-day");
    forth.innerHTML = days[now.getDay() + 4 - 7];
} else {
    let forth = document.querySelector("#forth-day");
    forth.innerHTML = days[now.getDay() + 4];
}

let geo = document.querySelector("#geo-location");
geo.addEventListener("click", geoLocation);

let ferButton = document.querySelector("#fer");
ferButton.addEventListener("click", convert);

let celbutton = document.querySelector("#cel");
celbutton.addEventListener("click", place);