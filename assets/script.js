let citySearchEl = $('#search-form');
let searchInput = $('#search-input');
let cityContainerEl = $('.cityContainer');


var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var searchCity = searchInput.value.trim();
  
    if (searchCity) {
      getCityWeather(searchCity);
        console.log(searchCity);
      cityContainerEl.textContent = '';
      searchInputEl.value = '';
    } else {
      alert('Please enter a city');
    }
  };
  
  var buttonClickHandler = function (event) {
    
    var searchBtn = event.target.getAttribute('btn');
      
    if (searchBtn) {
      getCityWeather(cityName);
  
      cityContainerEl.textContent = '';
    }
  };

  var getCityWeather = function (cityName) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=a4fdb9683d6a1f4cdbbf60857995908b';
    // var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=a4fdb9683d6a1f4cdbbf60857995908b';
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            displayWeather(data, cityName);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Weather');
      });
  };
 
  var displayWeather = function (city, searchCity) {
    
    if (city.length === 0) {
      cityContainerEl.textContent = 'No cities found.';
      
      return;
    } else {
        cityName.textContent = '';
        console.log(cityName);
    }
}

    // citySearchTerm.textContent = searchCity;

    // ???.addEventListener('submit', formSubmitHandler);
    // ???.addEventListener('click', buttonClickHandler);