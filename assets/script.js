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
  searchHistory.push(searchInputEl);
  localStorage.setItem('city-history', JSON.stringify(searchHistory));
  var searchCityBtn = $('<button>').text(searchInputEl);
  searchCityBtn.on('click', (event) => {
    cityWeather($(event.target).text());

  })
  cityListEl.append(searchCityBtn);
}

function postSearchHistory() {
  let storedCity = JSON.parse(localStorage.getItem('city-history'));
  searchHistory = storedCity;

  for (var i = 0; i < searchHistory.length; i++) {

    var searchCityBtn = $('<button class="cityBtn">').text(searchHistory[i]);
    searchCityBtn.on('click', (event) => {
      cityWeather($(event.target).text());
    })
    cityListEl.append(searchCityBtn);
  }
  postSearchHistory();
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

  let lat = weatherData.coord.lat;
  let lon = weatherData.coord.lon;

  getForecastData(weatherData.name);
  UVindex(lat, lon);
}

function getForecastData(cityName) {

  return fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + apiKey, {
    method: 'GET',

  }).then(function (resp) {
    return resp.json()
  })
    .then(function (data) {
      console.log(data);
      $('#five-day-box').html('');
      for (var i = 0; i < data.list.length; i++) {
        console.log(i);
        if (data.list[i].dt_txt.indexOf('03:00:00') !== -1) {
          console.log(data.list[i]);
          var fahrenheit = Math.round(((parseFloat(data.list[0].main.temp) - 273.15) * 1.8) + 32);

          let dayContainer = $('<div class="day" + (i+1) + ">');
          $('#five-day-box').append(dayContainer);

          let dayDate = $('<div class="day_date">').text(new Date(data.list[i].dt_txt).toLocaleDateString());
          let dayDesc = $('<div class="day_description">').text(data.list[i].weather[0].description);
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

function UVindex(lat, lon) {
  console.log(lat, lon);
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey + '&cnt=1')
    .then(function (resp) {
      return resp.json()
    })
    .then(function (data) {
      // getUVindex(data);
      console.log(data);

      let UVIndex = $('#uv').text(data.current.uvi);
      let uvi = data.current.uvi
      if (uvi > 2 && uvi < 6) {
        $('#uv').removeClass('green');
        $('#uv').addClass('yellow');
      }
      else if (uvi > 5 && uvi < 8) {
        $('#uv').removeClass('green');
        $('#uv').addClass('orange');
      }
      else if (uvi > 8) {
        $('#uv').removeClass('green');
        $('#uv').addClass('red');
      };

      UVIndex.append(data);

    })
    .catch(function () {
    });
}
