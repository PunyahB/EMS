'use strict';

/**
 * navbar toggle
 */

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
});

/**
 * toggle the navbar when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}

/**
 * back to top & header
 */

const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * Air Quality Monitoring System
*/

const app = {
  init: () => {
    document
      .getElementById('btnGet')
      .addEventListener('click', app.fetchAirPollution);
    document
      .getElementById('btnCurrent')
      .addEventListener('click', app.getLocation);
    console.log('App initialized'); // Check if the app initializes properly
  },

  fetchAirPollution: () => {
    // Fetch the air pollution data using latitude and longitude
    let lat = document.getElementById('latitude').value;
    let lon = document.getElementById('longitude').value;
    let key = '84b63b20bbf7476b74fff192b43b7b0d'; // Your OpenWeather API key

    console.log(`Latitude: ${lat}, Longitude: ${lon}`); // Check if lat/lon values are correct

    if (lat && lon) {
      let url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`;
      console.log(`Fetching data from: ${url}`); // Check if the URL is correct

      fetch(url)
        .then(response => {
          console.log('API responded'); // To check if API responded
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data fetched successfully:', data); // Print the fetched data to the console
        })
        .catch(error => {
          console.error('Error fetching air pollution data:', error);
        });
    } else {
      console.log('Please provide latitude and longitude.');
    }
  },

  getLocation: () => {
    console.log('Getting current location...');
    navigator.geolocation.getCurrentPosition(app.ftw, app.wtf);
  },

  ftw: (position) => {
    console.log('Location fetched successfully:', position); // To see if the location is being fetched
    document.getElementById('latitude').value = position.coords.latitude;
    document.getElementById('longitude').value = position.coords.longitude;
  },

  wtf: (err) => {
    console.error('Geolocation error:', err);
  },
};

app.init();

  





