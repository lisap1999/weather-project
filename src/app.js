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

function getCurrent(response) {

    let currentTemp = document.querySelector("#today-temp");
    currentTemp.innerHTML = `<b>${Math.round(response.data.main.temp)}℃`;
    celTemp = Math.round(response.data.main.temp);
    let description = document.querySelector("#current-des");
    description.innerHTML = `${response.data.weather[0].description}`;
    console.log(response);
    let heading = document.querySelector("#place");
    heading.innerHTML = response.data.name;
    let humid = document.querySelector("#second-data");
    humid.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    let todayIcon = document.querySelector("img");
    let iconUrl = (`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    todayIcon.setAttribute("src", iconUrl);
    let apiKey = "e2a35def79247fa91a2b82c7838e47a9";
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&units=metric&appid=${apiKey}`;
    axios.get(forecastUrl).then(forecast);

}

function place(event) {
    let search = document.querySelector("#locationSearch");
    event.preventDefault();
    search = (search.value).trim();
    let apiKey = "e2a35def79247fa91a2b82c7838e47a9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(getCurrent);

}

function showPosition(location) {
    let apiKey = "e2a35def79247fa91a2b82c7838e47a9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(getCurrent);

}

function geoLocation(event) {
    navigator.geolocation.getCurrentPosition(showPosition);

}

let celTemp = null;



function convert(event) {

    let fer = document.querySelector("#today-temp");
    fer.innerHTML = `${Math.round(celTemp * 9 / 5 + 32)}℉`;

}

let form = document.querySelector("#search-form");
form.addEventListener("submit", place);
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let now = new Date();
let today = document.querySelector("#today-card");
today.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${now.getMinutes()}`;
let first = document.querySelector("#first-day");
if (now.getDate() + 1 > 31) {
    first.innerHTML = `${now.getDate()-31}/${now.getMonth()}`;
}
first.innerHTML = `${now.getDate()+1}/${now.getMonth()}`;
let second = document.querySelector("#second-day");
second.innerHTML = `${now.getDate() + 2}/${now.getMonth()}`;
let third = document.querySelector("#third-day");
third.innerHTML = `${now.getDate() + 3}/${now.getMonth()}`;
let forth = document.querySelector("#forth-day");
forth.innerHTML = `${now.getDate() + 4}/${now.getMonth()}`;
let geo = document.querySelector("#geo-location");
geo.addEventListener("click", geoLocation);

let ferButton = document.querySelector("#fer");
ferButton.addEventListener("click", convert);