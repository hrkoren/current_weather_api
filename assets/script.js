let searchFormEl = $('#search-form');
let cityContainerEl = $('.cityContainer');
let cityNameEl = $('.cityName');
let searchBtn = document.getElementById('#Search_button'); 

function handleFormSubmit(event) {
  event.preventDefault();

  var searchInputEl = $('input[name="city-search"]').val();
  if (!searchInputEl) {
    alert('Please enter a city');
    return;
  }
  cityContainerEl.replaceWith('<h4>' + searchInputEl + '</h4>');

  $('input[name="city-search"]').val('');
  console.log(searchInputEl);
}

searchFormEl.on('submit', handleFormSubmit);

//NOTE: icon display next to city name that matches weather



  // var getCityWeather = function (cityName) {
  //   var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=a4fdb9683d6a1f4cdbbf60857995908b';
  //   // var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=a4fdb9683d6a1f4cdbbf60857995908b';
  //   fetch(apiUrl)
  //     .then(function (response) {
  //       if (response.ok) {
  //         console.log(response);
  //         response.json().then(function (data) {
  //           console.log(data);
  //           displayWeather(data, cityName);
  //         });
  //       } else {
  //         alert('Error: ' + response.statusText);
  //       }
  //     })
  //     .catch(function (error) {
  //       alert('Unable to connect to Weather');
  //     });
  // };
 
//   var displayWeather = function (city, searchCity) {
    
//     if (city.length === 0) {
//       cityContainerEl.textContent = 'No cities found.';
      
//       return;
//     } else {
//         cityName.textContent = '';
//         console.log(cityName);
//     }
// }
