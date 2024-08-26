// scripts.js
let currentSection = 1;

function showSection(section) {
    document.querySelectorAll('.form-section').forEach((sec) => {
        sec.classList.remove('active');
    });
    document.getElementById('section' + section).classList.add('active');
}

function nextSection(section) {
    if (section > 5) {
        // Handle form submission
        document.getElementById('assessment-form').submit();
    } else {
        showSection(section);
        currentSection = section;
    }
}

function prevSection(section) {
    if (section < 1) return;
    showSection(section);
    currentSection = section;
}

// Initialize the form by showing the first section
showSection(currentSection);
