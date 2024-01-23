import { isElementValid } from "./static/js/utils.js";

const navQuoteLink = document.querySelector("#quote")
const quoteBox = document.querySelector(".quote-box")
const quotePopupBox = document.querySelector(".popup");



/**
 *
 * When the close icon is clicked the quote popup box's visibility is toggled,
 * and a navigation spinner is triggered for a duration of X-milliseconds.
 *
 * @example
 * // Call the function to close the open quote popup box.
 * closeQuotePopupBox();
 */
function closeQuotePopupBox() {

    /**
     * Handles the click event on the quote popup close icon.
     * @param {Event} e - The click event object.
     */
    function handlePopupClose(e) {

        const DURATION = 2000;
        const errorMsg = "The quote box element was not found!!!";
        const quotePopupCloseIcon = document.querySelector("#popup-close-icon");

        if (isValid(quotePopupCloseIcon, errorMsg)) {
            quotePopupBox.classList.toggle('show-popup');
            handleNavSpinner(DURATION);
        }

    }

    /**
     * Runs an event listener on the quote popup close icon, triggering a specified action when clicked
     */
    function runEventListener() {
        const errorMsg = "The quote box icon element was not found!!!"
        const quotePopupCloseIcon = document.querySelector("#popup-close-icon");
        if (isValid(quotePopupCloseIcon, errorMsg)) {
            quotePopupCloseIcon.addEventListener("click", handlePopupClose);
        }
    }

    /**
     * Takes a selector element and checks the validity of the element.
     * @returns {boolean} Returns true if the element is valid, otherwise returns false.
     */
    function isValid(selectorElement, errorMsg) {
        return isElementValid(selectorElement, errorMsg);
    }

    runEventListener();
}


/**
 * Submits the subscription form but ensures the validity of the subscription form 
 * 
 * @example
 * submitSubscriptionForm();
 */
function submitSubscriptionForm() {

    /**
     * Sets up an event listener for the subscription form submission.
     * Adds a submit event listener to the subscribeForm element, invoking handleSubmission.
     */
    function runEventListener() {

        const subscribeForm = document.querySelector("#popup-form")
        const errorMsg = "The subscription form element was not found!!!";

        if (isValid(subscribeForm, errorMsg)) {
            subscribeForm.addEventListener("submit", handleSubmission);
        }
    }

    /**
     * Handles the submission of the form
     * @param {e} event parameter
     */
    function handleSubmission(e) {
        e.preventDefault();
        Swal.fire("Subscription Successful", "You've successfully subscribed to our mailing list!", "success");
        e.target.reset();
    }

    /**
     * Checks the validity of the specified selector element.
     * 
     * @param {HTMLElement} selectorElement - The HTML element to validate.
     * @param {string} errorMsg - The error message to be logged if the element is not valid.
     * @returns {boolean} Returns true if the element is valid, otherwise returns false.
     */
    function isValid(selectorElement, errorMsg) {
        return isElementValid(selectorElement, errorMsg);
    }


    runEventListener();
}




function showQuotePopupBox() {
    navQuoteLink.addEventListener("click", handleQuotePopupDisplay);
}


function handleQuotePopupDisplay(e) {
    e.preventDefault();
    const DURATION = 3000;
    quotePopupBox.classList.add('show-popup');
    handleNavSpinner(DURATION)

}


function handleNavSpinner(duration) {

    const navSpinner = document.querySelector(".spinner");
    let isSpinnrVisible = true;

    hideQuoteButton();
    toggleSpinnerVisibility(navSpinner, true);

    setTimeout(() => {

        toggleSpinnerVisibility(navSpinner, false)
        isSpinnrVisible = false;

        if (!isSpinnrVisible) {
            showQuoteButton();
        }
    }, duration);
}


function toggleSpinnerVisibility(spinnerElement, shouldShowSpinner = false) {

    /**
     * Shows the spinner by setting display style to "flex".
     */
    function showSpinner() {
        updateSpinnerVisibility("flex");
    }

    /**
     * Hides the spinner by setting display style to "none".
     */
    function hideSpinner() {
        updateSpinnerVisibility("none");
    }

    /**
     * Updates the spinner visibility based on the provided display style.
     * @param {string} displayStyle - The display style for the spinner.
     */
    function updateSpinnerVisibility(displayStyle) {
        if (isValid()) {
            spinnerElement.style.display = displayStyle;
        };

    }

    /**
     * Checks if the spinner element is valid.
     * Throws an error if the spinner element is not found.
     * @param {HTMLElement} spinnerElement - The spinner element.
     * @returns {boolean} - True if the spinner element is valid.
     */
    function isValid() {
        const errorMsg = "The spinner element was not found";
        return isElementValid(spinnerElement, errorMsg)
    }

    function run() {
        switch (shouldShowSpinner) {
            case true:
                showSpinner();
                break;
            case false:
                hideSpinner();
                break;
        }
    }

    run();

}




function showQuoteButton() {
    quoteBox.style.display = "flex";
}

function hideQuoteButton() {
    quoteBox.style.display = "none";
}











closeQuotePopupBox();
showQuotePopupBox();
submitSubscriptionForm();
