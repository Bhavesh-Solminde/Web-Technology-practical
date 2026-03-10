const apiKey = "bd86a303f0a4429cb4554321261003";

function getWeather(){

let city = document.getElementById("cityInput").value;

let url =
"http://api.weatherapi.com/v1/current.json?key=" +
apiKey +
"&q=" +
city +
"&aqi=no";

fetch(url)

.then(response => response.json())

.then(data => {

let weather = data.current.condition.text.toLowerCase();

document.getElementById("city").innerHTML = data.location.name + ", " + data.location.country;

document.getElementById("region").innerHTML = data.location.region;

document.getElementById("localtime").innerHTML = "🕐 Local Time: " + data.location.localtime;

document.getElementById("temp").innerHTML = data.current.temp_c + " °C  /  " + data.current.temp_f + " °F";

document.getElementById("feelslike").innerHTML = "Feels like: " + data.current.feelslike_c + " °C";

document.getElementById("desc").innerHTML = data.current.condition.text;

document.getElementById("humidity").innerHTML = data.current.humidity + "%";

document.getElementById("wind").innerHTML = data.current.wind_kph + " km/h";

document.getElementById("winddir").innerHTML = data.current.wind_dir + " (" + data.current.wind_degree + "°)";

document.getElementById("gust").innerHTML = data.current.gust_kph + " km/h";

document.getElementById("pressure").innerHTML = data.current.pressure_mb + " mb";

document.getElementById("precip").innerHTML = data.current.precip_mm + " mm";

document.getElementById("cloud").innerHTML = data.current.cloud + "%";

document.getElementById("visibility").innerHTML = data.current.vis_km + " km";

document.getElementById("dewpoint").innerHTML = data.current.dewpoint_c + " °C";

document.getElementById("uv").innerHTML = data.current.uv;

document.getElementById("heatindex").innerHTML = data.current.heatindex_c + " °C";

document.getElementById("windchill").innerHTML = data.current.windchill_c + " °C";

/* Weather Icon */

document.getElementById("icon").src =
"https:" + data.current.condition.icon;


/* Dynamic Background */

let body = document.getElementById("body");

/* Remove previous weather classes */

body.classList.remove("clear","clouds","rain","snow","thunderstorm");

/* Detect weather condition */

if(weather.includes("cloud"))
{
body.classList.add("clouds");
}

else if(weather.includes("rain") || weather.includes("drizzle"))
{
body.classList.add("rain");
}

else if(weather.includes("snow") || weather.includes("ice"))
{
body.classList.add("snow");
}

else if(weather.includes("thunder") || weather.includes("storm"))
{
body.classList.add("thunderstorm");
}

else
{
body.classList.add("clear");
}

})

.catch(() => {
alert("City not found");
});

}