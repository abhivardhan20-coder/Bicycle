/* 
  ========================================
  JAVASCRIPT LOGIC - CYCLE-O-PAEDIA
  ========================================
  Topics Covered:
  - Variables & Data Types (let, const)
  - Functions (Arrow & Standard)
  - DOM Access & Manipulation
  - Event Handling
  - Form Validation (Regex)
  - Conditional Statements & Control Flow
  - Local Storage Persistence
  - Browser APIs (Geolocation)
  - Objects & Property Access
*/

// Global Variables (JavaScript Concept)
const APP_NAME = "Cycle-O-Paedia";

/**
 * PAGE 4: REGISTRATION VALIDATION
 * Demonstrates: Functions, Regex, DOM Access, Conditional Statements, LocalStorage
 */
function handleRegistration(event) {
    event.preventDefault(); // Prevent page reload

    // DOM Access: Getting form field values
    const eventName = document.getElementById('eventSelect').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const participants = document.getElementById('participants').value;
    const experience = document.getElementById('experience').value;
    const contact = document.getElementById('contact').value;

    // Getting radio button value (JavaScript Concept: QuerySelector)
    const genderElement = document.querySelector('input[name="gender"]:checked');
    const gender = genderElement ? genderElement.value : "Not specified";

    const messageDisplay = document.getElementById('formMessage');

    // REGEX: Email Validation Pattern (JavaScript Concept: Regular Expressions)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Simple Phone Regex for contact number
    const phoneRegex = /^[\d\s\+\-\(\)]{7,}$/;

    // Conditional logic (Control Flow)
    if (!eventName) {
        showFeedback("Please select an event", "error");
        return;
    }

    if (name.trim().length < 3) {
        showFeedback("Name must be at least 3 characters long", "error");
        return;
    }

    if (!emailRegex.test(email)) {
        showFeedback("Please enter a valid email address", "error");
        return;
    }

    if (!phoneRegex.test(contact)) {
        showFeedback("Please enter a valid contact number", "error");
        return;
    }

    // Creating a JavaScript Object (JavaScript Concept: Objects)
    const eventRegistrationData = {
        selectedEvent: eventName,
        userName: name,
        userEmail: email,
        participantCount: participants,
        userGender: gender,
        experienceLevel: experience,
        contactNumber: contact,
        registeredAt: new Date().toISOString()
    };

    // LOCAL STORAGE: Stringifying and storing object (Persistence)
    localStorage.setItem('eventRegistration', JSON.stringify(eventRegistrationData));

    showFeedback(`Registration successful for ${eventName}! See you there.`, "success");

    // Explicit casting (Concept: Casting)
    console.log("Registered user count (cast to string): " + String(1));
}

/**
 * PAGE 5: EMERGENCY LOCATION (GEOLOCATION API)
 * Demonstrates: Browser APIs, Callback functions, Dynamic DOM Updates
 */
function startTracking() {
    const statusDisplay = document.getElementById('trackerStatus');
    const locationDisplay = document.getElementById('locationData');

    if (!navigator.geolocation) {
        statusDisplay.innerText = "Geolocation is not supported by your browser";
        return;
    }

    statusDisplay.innerText = "Locating...";

    // Geolocation API (JavaScript Concept: Browser API)
    navigator.geolocation.getCurrentPosition(
        // Success Callback
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            statusDisplay.innerText = "Location Fetched Successfully!";

            // DOM Manipulation: Updating innerHTML (JavaScript Concept)
            locationDisplay.innerHTML = `
                <p><strong>Latitude:</strong> ${latitude.toFixed(6)}°</p>
                <p><strong>Longitude:</strong> ${longitude.toFixed(6)}°</p>
            `;

            console.log(`User coordinates: ${latitude}, ${longitude}`);
        },
        // Error Callback
        () => {
            statusDisplay.innerText = "Unable to retrieve your location";
        }
    );
}

/**
 * HELPER: UI Feedback logic
 */
function showFeedback(message, type) {
    const messageDisplay = document.getElementById('formMessage');
    if (messageDisplay) {
        messageDisplay.innerText = message;
        messageDisplay.style.color = type === "error" ? "#e74c3c" : "#2ecc71";
        messageDisplay.style.marginTop = "1rem";
        messageDisplay.style.fontWeight = "bold";
    } else {
        alert(message);
    }
}

// Event Listener for DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the registration page
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', handleRegistration);
    }

    // Check if we are on the emergency location page
    const trackBtn = document.getElementById('trackBtn');
    if (trackBtn) {
        trackBtn.addEventListener('click', startTracking);
    }

    // Greeting logic (Local storage retrieval)
    const storedRegistration = localStorage.getItem('eventRegistration');
    if (storedRegistration) {
        const registration = JSON.parse(storedRegistration);
        console.log(`Welcome back, ${registration.userName}! You are registered for ${registration.selectedEvent}.`);
    }

    // Handle Background Audio Autoplay (Browser restriction bypass)
    const bgAudio = document.querySelector('audio[autoplay]');
    if (bgAudio) {
        const startAudio = () => {
            bgAudio.play().catch(() => {
                console.log("Autoplay blocked. Waiting for user interaction.");
            });
            document.removeEventListener('click', startAudio);
        };
        document.addEventListener('click', startAudio);
    }

    // Module 2 Concept: JavaScript Arrays & Looping
    // (To demonstrate for academic evaluation)
    const bikeFeatures = ["Lightweight", "Durable", "Aerodynamic", "Ergonomic"];
    if (window.location.pathname.includes("types.html")) {
        console.log("Exploring Premium Features:");
        for (let i = 0; i < bikeFeatures.length; i++) {
            console.log(`- Feature ${i + 1}: ${bikeFeatures[i]}`);
        }
    }
});
