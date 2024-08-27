// Function to open and toggle popup visibility
function openQuestionPopup(popupId, button) {
    let popup = document.getElementById(popupId);
    let rect = button.getBoundingClientRect();

    // Get the viewport dimensions
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    // Get the popup dimensions
    popup.style.display = "block"; // Temporarily display the popup to measure its size
    let popupWidth = popup.offsetWidth;
    let popupHeight = popup.offsetHeight;
    popup.style.display = "none"; // Hide the popup again

    // Calculate the center position
    let centerX = (viewportWidth - popupWidth) / 2;
    let centerY = (viewportHeight - popupHeight) / 2;

    // Position the popup centered vertically and horizontally
    popup.style.left = centerX + "px";
    popup.style.top = centerY + "px";

    // Show the popup
    popup.style.display = "block";
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

