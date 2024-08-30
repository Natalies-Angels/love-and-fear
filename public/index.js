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

    // Check if the previous popup has been completed
    // if (popupId !== 'popup-1' && !completedPopups[previousPopupId]) {
    //     alert("Please complete the previous section before proceeding.");
    //     return;
    // }

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
    if (!validateForm(popupId)) {
        event.preventDefault(); // Prevent form submission
        alert("Please fill out all required fields before submitting.");
    } else {
        // Mark the current popup as completed
        completedPopups[popupId] = true;
        
        // Automatically open the next popup after successful submission
        const nextPopupId = getNextPopupId(popupId);
        if (nextPopupId) {
            openQuestionPopup(nextPopupId, null); // Open the next popup
        }
    }
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
        if (event.target == popups[i]) {
            popups[i].style.display = "none";
        }
    }
}

// Function to validate code and handle redirection
document.addEventListener('DOMContentLoaded', function() {
    // Target the Networking Bingo link
    const bingoLink = document.querySelector('a[href="networkingBingo.html"]');
    const passcodeModal = document.getElementById('codeModal');
    const closeModal = document.querySelector('.close-modal');
    const submitCodeButton = document.getElementById('submitCode');
    const errorMessage = document.getElementById('error-message');
    
    // Example correct code
    const correctCode = "Safeinlove"; // Change this to your desired access code
    
    // Show modal on Networking Bingo link click
    bingoLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the link from navigating
        passcodeModal.style.display = 'block'; // Show the modal
    });
    
    // Close modal when the user clicks on the 'X'
    closeModal.addEventListener('click', function() {
        passcodeModal.style.display = 'none';
    });
    
    // Handle code submission
    submitCodeButton.addEventListener('click', function() {
        const enteredCode = document.getElementById('accessCode').value;
        
        if (enteredCode === correctCode) {
            window.location.href = bingoLink.href; // Navigate to the Networking Bingo page
        } else {
            errorMessage.style.display = 'block'; // Show error message
        }
    });
    
    // Close modal if user clicks outside of it
    window.onclick = function(event) {
        if (event.target === passcodeModal) {
            passcodeModal.style.display = 'none';
        }
    };
});

// SHOW BINGO POPUP
document.addEventListener('DOMContentLoaded', function () {
    const responses = document.querySelectorAll('.bingo-cell input[type="text"]');
    const bingoPopup = new bootstrap.Modal(document.getElementById('popup'));

    responses.forEach(response => {
        response.addEventListener('input', () => {
            const filledResponses = document.querySelectorAll('.bingo-cell input[type="text"]').length;
            const nonEmptyResponses = Array.from(responses).filter(input => input.value.trim() !== '').length;

            if (nonEmptyResponses >= 7) {
                bingoPopup.show();
            }
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
    document.getElementById("questionnaire-container").style.display = "block";
});
