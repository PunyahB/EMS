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

document.getElementById('water-quality-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let score = 0;

    const ph = parseFloat(document.getElementById('ph').value);
    const doValue = parseFloat(document.getElementById('do').value);
    const turbidity = parseFloat(document.getElementById('turbidity').value);
    const ec = parseFloat(document.getElementById('ec').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const tds = parseFloat(document.getElementById('tds').value);

    // Check pH value
    if (ph >= 6.5 && ph <= 8.5) score += 2;
    else if (ph >= 5.5 && ph < 6.5 || ph > 8.5 && ph <= 9.5) score += 1;

    // Check Dissolved Oxygen value
    if (doValue > 6) score += 2;
    else if (doValue >= 4 && doValue <= 6) score += 1;

    // Check Turbidity
    if (turbidity <= 5) score += 2;
    else if (turbidity > 5 && turbidity <= 20) score += 1;

    // Check Electrical Conductivity
    if (ec < 250) score += 2;
    else if (ec >= 250 && ec <= 500) score += 1;

    // Check Temperature
    if (temperature >= 10 && temperature <= 25) score += 2;
    else if (temperature > 25 && temperature <= 35) score += 1;

    // Check TDS
    if (tds < 500) score += 2;
    else if (tds >= 500 && tds <= 1000) score += 1;

    // Determine the result based on the score
    let result;
    if (score >= 10) {
      result = 'Good water quality';
    } else if (score >= 6) {
      result = 'Moderate water quality';
    } else {
      result = 'Poor water quality';
    }

    // Display the result
    document.getElementById('result').innerText = `Water Quality Score: ${score}\n${result}`;
  });




  





