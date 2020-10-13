function forecast(response) {
    let firstTemp = document.querySelector("#first-temp");
    firstTemp.innerHTML = `${Math.round(response.data.list[0].main.temp_min)}/${Math.round(response.data.list[0].main.temp_max)}℃`;
    let secondTemp = document.querySelector("#second-temp");
    secondTemp.innerHTML = `${Math.round(response.data.list[1].main.temp_min)}/${Math.round(response.data.list[1].main.temp_max)}℃`;
    let thirdTemp = document.querySelector("#third-temp");
    thirdTemp.innerHTML = `${Math.round(response.data.list[2].main.temp_min)}/${Math.round(response.data.list[2].main.temp_max)}℃`;
    let forthTemp = document.querySelector("#forth-temp");
    forthTemp.innerHTML = `${Math.round(response.data.list[3].main.temp_min)}/${Math.round(response.data.list[3].main.temp_max)}℃`;
}

function getCurrent(response) {
    console.log(response);
    let currentTemp = document.querySelector("#today-temp");
    currentTemp.innerHTML = `${Math.round(response.data.main.temp)}℃`;
    let description = document.querySelector("#current-des");
    description.innerHTML = `${response.data.weather[0].description}`;
    console.log(response);
    let heading = document.querySelector("#place");
    heading.innerHTML = response.data.name;
    let humid = document.querySelector("#second-data");
    humid.innerHTML = `Humidity: ${response.data.main.humidity}%`;
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


let form = document.querySelector("#search-form");
form.addEventListener("submit", place);
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let now = new Date();
let today = document.querySelector("#today-card");
today.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${now.getMinutes()}`;
let first = document.querySelector("#first-day");
first.innerHTML = days[now.getDay() + 1];
let second = document.querySelector("#second-day");
second.innerHTML = days[now.getDay() + 2];
let third = document.querySelector("#third-day");
third.innerHTML = days[now.getDay() + 3];
let forth = document.querySelector("#forth-day");
forth.innerHTML = days[now.getDay() + 4];
let geo = document.querySelector("#geo-location");
geo.addEventListener("click", geoLocation);