import { getQuery }      from "./static/js/utils.js";
import { NavigationElements, PopupElements } from "./static/settings.js";


const navQuoteLink        = getQuery(NavigationElements.QUOTE_BTN_LINK)
const quoteBox            = getQuery(NavigationElements.QUOTE_BOX)
const quotePopupBox       = getQuery(PopupElements.QuoteBox.POPUP_BOX_CLASS_ID);
const quotePopupCloseIcon = getQuery(PopupElements.QuoteBox.CLOSE_ICON_ID);
const navSpinner          = getQuery(NavigationElements.SPINNER)



/**
 * When call the function closes the open quote popup box
 */
function closeQuotePopupBox() {

    /**
     * Handles the click event on the quote popup close icon.
     * @param {Event} e - The click event object.
     */
    function handlePopupClose(e) {
        const DURATION = 2000;

        quotePopupBox.classList.toggle('show-popup');
        handleNavSpinner(DURATION)
    }

    quotePopupCloseIcon.addEventListener("click", handlePopupClose);

}


function showQuotePopupBox() {
    navQuoteLink.addEventListener("click", handleQuotePopupDisplay);
}


function handleQuotePopupDisplay() {
    const DURATION = 3000;
    quotePopupBox.classList.add('show-popup');
    handleNavSpinner(DURATION)
  
}


function handleNavSpinner(duration) {
    let isSpinnrVisible = true;
    
    hideQuoteButton();
    showSpinner();

    setTimeout(() => {
        hideSpinner();
        isSpinnrVisible = false;

        if (!isSpinnrVisible) {
            showQuoteButton();
        }
    }, duration);
}


function hideQuoteButton() {
    quoteBox.style.display = "none"; 
}


function showSpinner() {
    navSpinner.style.display = "flex";   
 }


function hideSpinner() {
    navSpinner.style.display = "none";
 }



function showQuoteButton() {
    quoteBox.style.display = "flex";
}




closeQuotePopupBox();
showQuotePopupBox();
