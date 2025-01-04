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

// Select the form and result paragraph
const phForm = document.getElementById('ph-form');
const result = document.getElementById('result');

// Function to determine water quality based on pH
function determineWaterQuality(ph) {
    if (ph >= 6.5 && ph <= 8.5) {
        return { quality: "Good", color: "green" };
    } else if (ph >= 5.5 && ph < 6.5 || ph > 8.5 && ph <= 9.5) {
        return { quality: "Moderate", color: "orange" };
    } else {
        return { quality: "Bad", color: "red" };
    }
}

// Select the form and result paragraph
const phForm = document.getElementById('ph-form');
const result = document.getElementById('result');

// Function to determine water quality based on pH
function determineWaterQuality(ph) {
    if (ph >= 6.5 && ph <= 8.5) {
        return {
            quality: "Good",
            suggestion: "The water quality is perfectly fine for drinking.",
            color: "green",
        };
    } else if ((ph >= 5.5 && ph < 6.5) || (ph > 8.5 && ph <= 9.5)) {
        return {
            quality: "Moderate",
            suggestion: "The water is moderately safe. Consider filtration or boiling before drinking.",
            color: "orange",
        };
    } else {
        return {
            quality: "Bad",
            suggestion: `The water quality is poor. Use one of the following advanced filtration methods:
            <ul>
                <li><strong>Reverse Osmosis (RO):</strong> Effective at removing most contaminants, including heavy metals and salts.</li>
                <li><strong>Activated Carbon Filtration:</strong> Removes chlorine, sediment, and organic compounds that affect taste and smell.</li>
                <li><strong>UV Purification:</strong> Kills bacteria and viruses using ultraviolet light.</li>
                <li><strong>Distillation:</strong> Boils water to separate impurities and re-condenses it into pure water.</li>
                <li><strong>Ceramic Filtration:</strong> Uses a ceramic filter to remove bacteria, protozoa, and other contaminants.</li>
            </ul>
            Ensure you consult with water quality experts or use certified equipment for safe drinking water.`,
            color: "red",
        };
    }
}

// Handle form submission
phForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    const phLevel = parseFloat(document.getElementById('ph-level').value);

    // Validate input
    if (isNaN(phLevel) || phLevel < 0 || phLevel > 14) {
        result.textContent = "Please enter a valid pH level between 0 and 14.";
        result.style.color = "black";
        return;
    }

    // Determine water quality and suggestion
    const { quality, suggestion, color } = determineWaterQuality(phLevel);
    result.innerHTML = `The water quality is: <strong style="color: ${color};">${quality}</strong><br>${suggestion}`;
    result.style.color = color;

    // Reset the form
    phForm.reset();
});



let energyData = [];
let labels = [];

// Create the chart when the page loads
const ctx = document.getElementById('energyChart').getContext('2d');
let energyChart = new Chart(ctx, {
    type: 'line',  // You can change this to 'bar', 'radar', etc.
    data: {
        labels: labels,  // X-axis labels (Time of usage)
        datasets: [{
            label: 'Energy Consumption (kWh)',
            data: energyData,  // Y-axis data (Energy values)
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

document.getElementById('energy-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const voltage = parseFloat(document.getElementById('voltage').value);
    const current = parseFloat(document.getElementById('current').value);
    const powerFactor = parseFloat(document.getElementById('power-factor').value);
    const time = parseFloat(document.getElementById('time').value);

    // Calculate Energy Consumption in kWh
    const energyConsumption = (voltage * current * powerFactor * time) / 1000;

    // Display the result
    document.getElementById('result').innerText = `Energy Consumption: ${energyConsumption.toFixed(2)} kWh`;

    // Add data to chart
    labels.push(`Time ${labels.length + 1}`);
    energyData.push(energyConsumption.toFixed(2));

    // Update chart
    energyChart.update();
});

// Select DOM elements
const wasteForm = document.getElementById('waste-form');
const totalWasteEl = document.getElementById('total-waste');
const recycledWasteEl = document.getElementById('recycled-waste');
const landfillWasteEl = document.getElementById('landfill-waste');
const recycledBar = document.getElementById('recycled-bar');
const landfillBar = document.getElementById('landfill-bar');

// Initialize waste data
let totalWaste = 0;
let recycledWaste = 0;
let landfillWaste = 0;

// Update Dashboard
function updateDashboard() {
    // Update text values
    totalWasteEl.textContent = totalWaste.toFixed(1);
    recycledWasteEl.textContent = recycledWaste.toFixed(1);
    landfillWasteEl.textContent = landfillWaste.toFixed(1);

    // Update progress bars
    const recycledPercentage = (recycledWaste / totalWaste) * 100 || 0;
    const landfillPercentage = (landfillWaste / totalWaste) * 100 || 0;

    recycledBar.style.width = `${recycledPercentage}%`;
    landfillBar.style.width = `${landfillPercentage}%`;
}

// Handle Form Submission
wasteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const wasteType = document.getElementById('waste-type').value;
    const quantity = parseFloat(document.getElementById('quantity').value);

    if (wasteType === 'recyclable') {
        recycledWaste += quantity;
    } else {
        landfillWaste += quantity;
    }

    totalWaste += quantity;
    updateDashboard();

    // Reset form
    wasteForm.reset();
});





  





