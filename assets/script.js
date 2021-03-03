let searchFormEl = $('#search-form');
let cityInputEl = $('#city-search');
let cityContainerEl = $('#cityContainer');
let citySearchName = $('#city-search-name');
let cityNameEl = $('.cityName');
let searchBtn = $('.btn'); 
let cityListEl = $('#city-list');
const apiKey = 'a4fdb9683d6a1f4cdbbf60857995908b';

function handleFormSubmit(event) {
  event.preventDefault();

  var searchInputEl = $('input[name="city-search"]').val();
  if (!searchInputEl) {
    alert('Please enter a city');
    return;
  }
  cityWeather(searchInputEl);
}

searchFormEl.on('submit', handleFormSubmit);



function cityWeather(cityNameEl) {
  
  // fetch('http://api.openweathermap.org/data/2.5/weather?q=Pittsburgh&appid=a4fdb9683d6a1f4cdbbf60857995908b')   
  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityNameEl + '&appid=' + apiKey)   
  .then(function(resp) { 
    return resp.json() 
  })
  .then(function(data) {
    getWeather(data);
  })
  .catch(function() {
  });
}

function getWeather(weatherData) {
	var fahrenheit = Math.round(((parseFloat(weatherData.main.temp)-273.15)*1.8)+32); 
  console.log(weatherData);
  // var weatherIcon = document.querySelector('#icon');
  // const icon = data.weather[0];
  // var iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";
	
	$('#description').text(weatherData.weather[0].description);
  // document.getElementById('weatherIcon').innerHTML = weatherData.weather.icon(iconUrl);
	$('#temp').text(fahrenheit + ' &deg');
	$('#location').text(weatherData.name);
  $('#wind').text(weatherData.wind.speed);
  $('#humidity').text(weatherData.main.humidity);
  // document.getElementById('uv').innerHTML = weatherData.uvi; 
  // not seeing UV index in console but it's supposed to be uvi
  getForecastData(weatherData.name);

}

function getForecastData(cityName) {
  let headers = new Headers();

  return fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + apiKey, {
    method: 'GET',
    headers: headers
  }).then(function(resp) { 
    return resp.json() 
  })
  .then(function(data) {
    console.log(data);
    for (var i= 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt.indexOf('15:00:00') !== -1) {
        console.log(data.list[i]);
      }
     
    }
  })
  .catch(function() {
  });
}



// //need to append to List of Searched Cities - not working!!
// var printCities = function (name) {
//   var listEl = $('<li>');
//   var listDetail = name;
//   listEl.addClass('list-group-item').text(listDetail);
//   listEl.appendTo(cityListEl);
// }



