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
            return response.text(); // Expecting a redirect response
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















