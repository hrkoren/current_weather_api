let searchFormEl = $('#search-form');
let cityContainerEl = $('.cityContainer');
let cityNameEl = $('.cityName');
let searchBtn = $('#Search_button'); 
let cityListEl = $('#city-list');

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
  //fetch with cityNameEl causes an error
    // fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityNameEl + '&appid=a4fdb9683d6a1f4cdbbf60857995908b') 
     fetch('http://api.openweathermap.org/data/2.5/weather?q=Pittsburgh&appid=a4fdb9683d6a1f4cdbbf60857995908b')   
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
	
	document.getElementById('description').innerHTML = weatherData.weather[0].description;
	document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
	document.getElementById('location').innerHTML = weatherData.name;
}







