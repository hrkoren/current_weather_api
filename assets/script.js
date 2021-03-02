let searchFormEl = $('#search-form');
let cityContainerEl = $('.cityContainer');
let cityNameEl = $('.cityName');
let searchBtn = $('#Search_button'); 
let cityListEl = $('#city-list');
const apiKey = 'a4fdb9683d6a1f4cdbbf60857995908b';

function handleFormSubmit(event) {
  event.preventDefault();

  var searchInputEl = $('input[name="city-search"]').val();
  if (!searchInputEl) {
    alert('Please enter a city');
    return;
  }
  cityContainerEl.replaceWith('<h4>' + searchInputEl + '</h4>');

  $('input[name="city-search"]').val('');
  // console.log(searchInputEl);
}

searchFormEl.on('submit', handleFormSubmit);
//NOTE: icon display next to city name that matches weather


//need to append to List of Searched Cities - not working!!
var printCities = function (name) {
  var listEl = $('<li>');
  var listDetail = name;
  listEl.addClass('list-group-item').text(listDetail);
  listEl.appendTo(cityListEl);
}

function cityWeather(cityNameEl) {
  
  fetch('http://api.openweathermap.org/data/2.5/weather?q=Pittsburgh&appid=a4fdb9683d6a1f4cdbbf60857995908b')   
  // fetch('http://api.openweathermap.org/data/2.5/weather?q=' + $(cityNameEl) + '&appid=' + $(apiKey))   
  .then(function(resp) { 
    return resp.json() 
  })
  .then(function(data) {
    getWeather(data);
  })
  .catch(function() {
    
  });
}

window.onload = function() {
  cityWeather();
}





function getWeather(weatherData) {
	var fahrenheit = Math.round(((parseFloat(weatherData.main.temp)-273.15)*1.8)+32); 
  // var weatherIcon = document.querySelector('#icon');
  // const {icon} = data.weather[0];
  // var iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";
	
	document.getElementById('description').innerHTML = weatherData.weather[0].description;
  // document.getElementById('weatherIcon').innerHTML = weatherIcon(iconUrl);
	document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
	document.getElementById('location').innerHTML = weatherData.name;
  document.getElementById('wind').innerHTML += weatherData.wind.speed;
  document.getElementById('humidity').innerHTML += weatherData.main.humidity;
  // document.getElementById('uv').innerHTML = weatherData.uvi; 
  // not seeing UV index in console but it's supposed to be uvi
}







