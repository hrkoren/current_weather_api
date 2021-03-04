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

	$('#description').text(weatherData.weather[0].description);
  $('#icon').html(`<img src='http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png'>`);
	$('#temp').text(fahrenheit)
    +($('.fa-fahrenheit'));
	$('#location').text(weatherData.name);
  $('#wind').text(weatherData.wind.speed);
  $('#humidity').text(weatherData.main.humidity);
  // document.getElementById('uv').innerHTML = weatherData.uvi; 
  // not seeing UV index in console but it's supposed to be uvi
  getForecastData(weatherData.name);

}

function getForecastData(cityName) {
 
  return fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + apiKey, {
    method: 'GET',
    
  }).then(function(resp) { 
    return resp.json() 
  })
  .then(function(data) {
    console.log(data);
    for (var i= 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt.indexOf('12:00:00') !== -1) {
        console.log(data.list[i]);
      }
      var fahrenheit = Math.round(((parseFloat(weatherData.main.temp)-273.15)*1.8)+32); 
      
      $('.day_date').text(list[0].dt_text);
      $('.day_description').text(weatherData.weather[0].description);
      $('#icon').html(`<img src='http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png'>`);
      $('.day_temp').text(fahrenheit);
      $('.day_humidity').text(weatherData.main.humidity);
    }
  })

  .catch(function() {
  });
}
 
