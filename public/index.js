// Object to track completion status of each popup
let completedPopups = {
    'popup-1': true, // popup-1 can be opened unconditionally
    'popup-2': false,
    'popup-3': false,
    'popup-4': false,
    'popup-5': false,
    'popup-6': false,
    'popup-7': false,
    'popup-8': false
};

// Function to validate if all required fields are filled in the current popup
function validateForm(popupId) {
    const popup = document.getElementById(popupId);
    const checkboxes = popup.querySelectorAll('input[type="checkbox"]');
    const otherInputs = popup.querySelectorAll('input[type="text"]');
    let isValid = true;

    // Check if at least one checkbox is selected
    const isCheckboxChecked = Array.from(checkboxes).some(cb => cb.checked);
    
    // Check if any "Other" inputs are filled
    const isOtherInputFilled = Array.from(otherInputs).some(input => input.value.trim() !== "");

    if (!isCheckboxChecked && !isOtherInputFilled) {
        isValid = false;
    }

    return isValid;
}

// Function to open and toggle popup visibility
function openQuestionPopup(popupId, button) {
    const previousPopupId = `popup-${parseInt(popupId.split('-')[1]) - 1}`;

    // Hide the current popup if one is already open
    const currentPopupId = getCurrentPopupId();
    if (currentPopupId && currentPopupId !== popupId) {
        document.getElementById(currentPopupId).style.display = 'none';
    }

    // Show the selected popup
    const popup = document.getElementById(popupId);
    popup.style.display = 'block';
}

// Function to get the ID of the current popup based on visibility
function getCurrentPopupId() {
    const popups = document.getElementsByClassName('popup');
    for (let i = 0; i < popups.length; i++) {
        if (popups[i].style.display === 'block') {
            return popups[i].id;
        }
    }
    return null;
}

// Function to handle form submission
function handleSubmit(popupId, event) {
    event.preventDefault(); // Prevent the default form submission

    if (!validateForm(popupId)) {
        alert("Please fill out all required fields before submitting.");
        return;
    }

    const form = document.getElementById(popupId).querySelector('form');
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Submit the form data via fetch to the server
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // Handle redirect or response if needed
            return response.text(); // Assuming server sends a redirect URL or a confirmation message
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        // Mark the current popup as completed
        completedPopups[popupId] = true;

        // Automatically open the next popup after successful submission
        const nextPopupId = getNextPopupId(popupId);
        if (nextPopupId) {
            openQuestionPopup(nextPopupId, null); // Open the next popup
        }
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}

// Function to get the ID of the next popup
function getNextPopupId(currentPopupId) {
    const popups = Array.from(document.getElementsByClassName('popup'));
    const currentIndex = popups.findIndex(popup => popup.id === currentPopupId);
    if (currentIndex >= 0 && currentIndex < popups.length - 1) {
        return popups[currentIndex + 1].id;
    }
    return null;
}

// Function to close popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}

// Close popup when clicking outside of it
window.onclick = function(event) {
    let popups = document.getElementsByClassName('popup');
    for (let i = 0; i < popups.length; i++) {
        if (event.target === popups[i]) {
            popups[i].style.display = "none";
        }
    }
}

// Event listener for the form submission
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        const popupId = this.closest('.popup').id;
        handleSubmit(popupId, event);
    });
});


// SHOW BINGO POPUP// SHOW BINGO POPUP// SHOW BINGO POPUP// SHOW BINGO POPUP// SHOW BINGO POPUP// SHOW BINGO POPUP// SHOW BINGO POPUP// SHOW BINGO POPUP

document.addEventListener('DOMContentLoaded', function () {
    const responses = document.querySelectorAll('.bingo-cell input[type="text"]');
    const bingoPopup = new bootstrap.Modal(document.getElementById('bingo-popup'));

    responses.forEach(response => {
        response.addEventListener('input', () => {
            const nonEmptyResponses = Array.from(responses).filter(input => input.value.trim() !== '').length;

            if (nonEmptyResponses >= 7) {
                bingoPopup.show();
            }
        });
    });

    // Handle form submission and send data to the server
    document.getElementById("submitResponsesBtn").addEventListener("click", function() {
        // Collect the responses
        const bingoData = {};
        responses.forEach((response, index) => {
            bingoData[`response_${index + 1}`] = response.value.trim();
        });

        // Send the data to the server
        fetch("/submitBingoData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bingoData),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            // Close the modal after successful submission
            bingoPopup.hide();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });
});

// Attach event listeners to forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        const popupId = this.closest('.popup').id;
        handleSubmit(popupId, event);
    });
});






document.getElementById("proceed-button").addEventListener("click", function() {
    // Hide the intro container
    document.getElementById("intro-container").style.display = "none";
    
    // Show the questionnaire container
    document.getElementById("wrapper").style.display = "block";
});















