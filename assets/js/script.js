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

const apiKey = '84b63b20bbf7476b74fff192b43b7b0d'; // Your OpenWeatherMap API key

        // Function to get live location and fetch air quality dat
function getLiveLocationAndAirQuality() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Display user's latitude and longitude
                    document.getElementById('latitude').textContent = latitude;
                    document.getElementById('longitude').textContent = longitude;

                    // Construct the OpenWeatherMap API URL using latitude and longitude
                    const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

                    // Fetch air quality data from OpenWeatherMap API
                    try {
                        const response = await fetch(apiUrl);
                        const data = await response.json();
                        displayAirQualityData(data);
                    } catch (error) {
                        console.error('Error fetching air quality data:', error);
                    }
                }, error => {
                    console.error('Error getting location:', error);
                });
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        }

        // Function to display air quality data
function displayAirQualityData(data) {
            const aqiElement = document.getElementById('aqi');
            const pm25Element = document.getElementById('pm25');
            const pm10Element = document.getElementById('pm10');
            const coElement = document.getElementById('co');
            const o3Element = document.getElementById('o3');
            const no2Element = document.getElementById('no2');

            if (data && data.list && data.list.length > 0) {
                const airData = data.list[0];
                aqiElement.textContent = airData.main.aqi;
                pm25Element.textContent = airData.components.pm2_5;
                pm10Element.textContent = airData.components.pm10;
                coElement.textContent = airData.components.co;
                o3Element.textContent = airData.components.o3;
                no2Element.textContent = airData.components.no2;
            } else {
                aqiElement.textContent = 'Data not available';
                pm25Element.textContent = 'Data not available';
                pm10Element.textContent = 'Data not available';
                coElement.textContent = 'Data not available';
                o3Element.textContent = 'Data not available';
                no2Element.textContent = 'Data not available';
            }
        }

        // Add event listener to the button
document.getElementById('get-air-quality-btn').addEventListener('click', getLiveLocationAndAirQuality);


