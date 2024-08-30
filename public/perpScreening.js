document.addEventListener('DOMContentLoaded', function () {
    let currentSection = 0;
    const sections = document.querySelectorAll('.form-section');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.toggle('active', i === index);
        });

        prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = index === sections.length - 1 ? 'none' : 'inline-block';
    }

    prevBtn.addEventListener('click', function () {
        if (currentSection > 0) {
            currentSection--;
            showSection(currentSection);
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentSection < sections.length - 1) {
            currentSection++;
            showSection(currentSection);
        }
    });

    showSection(currentSection);
});


// PERPSCREENING SUBMIT LOGIC
document.getElementById('assessmentForm').addEventListener('submit', function(event){
    event.preventDefault(); // Prevents the default form submission behavior

    const formData = new FormData(this); // Captures all the form data

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value; // Populates the data object with form entries
    });

    // Send the form data to the server
    let serverUrl = '/perp-submit'; // Endpoint defined in your server.js

    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Convert the data object to a JSON string
    })
    .then(response => response.text()) // Handle the server's response as text
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

