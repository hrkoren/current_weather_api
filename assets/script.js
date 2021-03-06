let searchFormEl = $('#search-form');
let cityInputEl = $('#city-search');
let cityContainerEl = $('#cityContainer');
let citySearchName = $('#city-search-name');
let cityNameEl = $('.cityName');
let searchBtn = $('.btn');
let cityListEl = $('.city-history');
let searchHistory = [];
const apiKey = 'a4fdb9683d6a1f4cdbbf60857995908b';

function handleFormSubmit(event) {
  event.preventDefault();

  var searchInputEl = $('input[name="city-search"]').val();
  if (!searchInputEl) {
    alert('Please enter a city');
    return;
  }
  cityWeather(searchInputEl);
  localStorage.setItem('city-history', JSON.stringify(searchInputEl));

  postSearchHistory();
}

function postSearchHistory(){
  let storedCity = JSON.parse(localStorage.getItem('city-history'));
  searchHistory = storedCity;

  for (var i = 0; i < searchHistory.length; i++) {
    // let dayDate = $('<div class="day_date">').text(data.list[i].dt_text);
      let citySearchHist = $('<ul class="city-history">').addClass('id', 'list-group');
      let searchHistoryList = $('<li>').addClass('id', 'list-group-item')
       + searchHistoryList.text(searchHistory[i]);
      cityListEl.append(citySearchHist);

      citySearchHist.append(searchHistoryList);
  }
}

searchFormEl.on('submit', handleFormSubmit);

function cityWeather(cityNameEl) {

  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityNameEl + '&appid=' + apiKey)
    .then(function (resp) {
      return resp.json()
    })
    .then(function (data) {
      getWeather(data);
    })
    .catch(function () {
    });
}

function getWeather(weatherData) {
  var fahrenheit = Math.round(((parseFloat(weatherData.main.temp) - 273.15) * 1.8) + 32);
  console.log(weatherData);

  $('#description').text(weatherData.weather[0].description);
  $('#icon').html(`<img src='http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png'>`);
  $('#temp').text(fahrenheit)
    + ($('.fa-fahrenheit'));
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

  }).then(function (resp) {
    return resp.json()
  })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.list.length; i++) {
        console.log(i);
        if (data.list[i].dt_txt.indexOf('03:00:00') !== -1) {
          // if (data.list[i].dt_txt.includes('03:00:00')) {
          console.log(data.list[i]);
          var fahrenheit = Math.round(((parseFloat(data.list[0].main.temp) - 273.15) * 1.8) + 32);

          let dayContainer = $('<div class="day" + (i+1) + ">');
          $('#five-day-box').append(dayContainer);

          let dayDate = $('<div class="day_date">').text(data.list[i].dt_text);
          let dayDesc = $('<div class="day_description">').text(data.list[i].weather.description);
          let icon = $(`<img src='http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png'>`);
          let dayTemp = $('<div class="day_temp">').text("Temp: " + fahrenheit);
          let dayHumidity = $('<div class="day_humidity">').text("Humidity: " + data.list[i].main.humidity + "%");

          dayContainer.append(dayDate, dayDesc, icon, dayTemp, dayHumidity);
      }
    }
  })

    .catch(function () {
    });
  }