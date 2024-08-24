// Function to open and toggle popup visibility
function openQuestionPopup(popupId, button) {
    let popup = document.getElementById(popupId);
    let rect = button.getBoundingClientRect();

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    popup.style.left = rect.left + scrollLeft + "px";
    popup.style.top = rect.bottom + scrollTop + "px";

    popup.style.display = popup.style.display === "block" ? "none" : "block";
}

