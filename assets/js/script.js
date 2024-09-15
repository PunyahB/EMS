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

async function fetchAQIData() {
    const apiUrl = 'http://api.airvisual.com/v2/nearest_city?key=50725d61-a07b-4a46-afd6-f032252061b6';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching AQI data:', error);
        return null;
    }
}

function displayAQIData(data) {
    const aqiDataElement = document.getElementById('aqi-data');
    if (data && data.status === 'success') {
        const { city, state, country } = data.data;
        const { aqius, aqicn } = data.data.current.pollution;
        const { tp, hu } = data.data.current.weather;
        const timestamp = new Date(data.data.current.weather.ts).toLocaleString();

        aqiDataElement.innerHTML = `
            <div class="aqi-data">Location: <span class="aqi-value">${city}, ${state}, ${country}</span></div>
            <div class="aqi-data">AQI (US): <span class="aqi-value">${aqius}</span></div>
            <div class="aqi-data">AQI (CN): <span class="aqi-value">${aqicn}</span></div>
            <div class="aqi-data">Temperature: <span class="aqi-value">${tp}°C</span></div>
            <div class="aqi-data">Humidity: <span class="aqi-value">${hu}%</span></div>
            <div class="aqi-data">Last Updated: <span class="aqi-value">${timestamp}</span></div>
        `;
    } else {
        aqiDataElement.innerHTML = '<p>Failed to load AQI data. Please try again later.</p>';
    }
}

// Fetch and display AQI data when the page loads
window.addEventListener('load', async () => {
    const aqiData = await fetchAQIData();
    displayAQIData(aqiData);
});

