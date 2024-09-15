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

const key = '84b63b20bbf7476b74fff192b43b7b0d'; // Your OpenWeatherMap API key

const app = {
  init: () => {
    document
      .getElementById('btnGet')
      .addEventListener('click', app.fetchAirPollution);
    document
      .getElementById('btnCurrent')
      .addEventListener('click', app.getLocation);
  },

  fetchAirPollution: (ev) => {
    // Use latitude and longitude to fetch the air pollution data
    let lat = document.getElementById('latitude').value;
    let lon = document.getElementById('longitude').value;
    let key = '06cc7efd0e5386068ec3c390bcfd0183';
    
    let url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`;
    
    // Fetch the air pollution data
    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        app.showAirPollution(data);
      })
      .catch(console.error);
  },

  getLocation: (ev) => {
    let opts = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 300000, // 5 minutes
    };
    navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
  },

  ftw: (position) => {
    // Got position
    document.getElementById('latitude').value =
      position.coords.latitude.toFixed(2);
    document.getElementById('longitude').value =
      position.coords.longitude.toFixed(2);
  },

  wtf: (err) => {
    // Geolocation failed
    console.error(err);
  },

  showAirPollution: (resp) => {
    // Display the air pollution data
    console.log(resp);
    
    let pollutionData = resp.list[0]; // Get the first (and only) item from the list
    let airQuality = pollutionData.main.aqi;
    let co = pollutionData.components.co;
    let no2 = pollutionData.components.no2;
    let o3 = pollutionData.components.o3;
    let pm25 = pollutionData.components.pm2_5;
    let pm10 = pollutionData.components.pm10;

    // Display data in HTML
    document.getElementById('aqi').textContent = airQuality;
    document.getElementById('pm25').textContent = pm25;
    document.getElementById('pm10').textContent = pm10;
    document.getElementById('co').textContent = co;
    document.getElementById('no2').textContent = no2;
    document.getElementById('o3').textContent = o3;
  },
};

app.init();






