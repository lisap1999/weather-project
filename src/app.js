function getCurrent(response) {
    let currentTemp = document.querySelector("#today-temp");
    currentTemp.innerHTML = `${Math.round(response.data.main.temp)}℃`;
    let description = document.querySelector("#current-des");
    description.innerHTML = `${response.data.weather[0].description}`;
    console.log(response);
    let heading = document.querySelector("#place");
    heading.innerHTML = response.data.name;


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
today.innerHTML = `${days[now.getDay()]} <br /> ${now.getHours()}:${now.getMinutes()}`;
let geo = document.querySelector("#geo-location");
geo.addEventListener("click", geoLocation);