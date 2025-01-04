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

// Select form and result elements
const energyForm = document.getElementById("energy-form");
const result = document.getElementById("result");

// Function to determine energy consumption level
function determineConsumptionLevel(energy) {
  if (energy < 10) {
    return {
      level: "Low",
      message: "Good job! Your energy consumption is low. Keep up the energy-efficient habits.",
      color: "green",
    };
  } else if (energy >= 10 && energy <= 30) {
    return {
      level: "Average",
      message: "Your energy consumption is average. Consider optimizing usage by turning off unused appliances and using energy-efficient devices.",
      color: "orange",
    };
  } else {
    return {
      level: "High",
      message: "Your energy consumption is high. Steps to reduce energy consumption include:  
        - Turning off appliances when not in use.  
        - Using LED lights instead of traditional bulbs.  
        - Installing energy-efficient appliances.  
        - Reducing heating or cooling when possible.  
        - Unplugging devices that are not in use.",
      color: "red",
    };
  }
}

// Handle form submission
energyForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page reload

  // Get input values
  const voltage = parseFloat(document.getElementById("voltage").value);
  const current = parseFloat(document.getElementById("current").value);
  const powerFactor = parseFloat(document.getElementById("power-factor").value);
  const time = parseFloat(document.getElementById("time").value);

  // Validate inputs
  if (isNaN(voltage) || isNaN(current) || isNaN(powerFactor) || isNaN(time)) {
    result.textContent = "Please enter valid numbers for all fields.";
    result.style.color = "black";
    return;
  }

  // Calculate energy consumption
  const energy = (voltage * current * powerFactor * time) / 1000;

  // Determine consumption level
  const { level, message, color } = determineConsumptionLevel(energy);
  result.innerHTML = `Your energy consumption is <strong style="color: ${color};">${level}</strong> (${energy.toFixed(2)} kWh).<br>${message}`;
  result.style.color = color;

  // Reset the form
  energyForm.reset();
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





  





