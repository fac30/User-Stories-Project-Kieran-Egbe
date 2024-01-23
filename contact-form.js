import { loadFile } from "./static/js/utils.js";

const phonePreferenceElement           = document.querySelector("#prefered-contact");
const phoneNumberInputElement          = document.querySelector("#contact-form-number");
const preferedCountryInputFieldElement = document.querySelector("#contact-form-number");
const contactFormTextArea              = document.querySelector("#description");

const EMPTY_VALUE = "";



async function processData() {
    const countriesSelectForm = document.querySelector("#country");
    try {
        const countriesData = await loadFile("countries.txt");

        if (countriesData) {
            const countries = countriesData.split('\n');

            countries.forEach((country) => {
                const value = country;
                const text  = country;

                const option = createOption(value, text);
                countriesSelectForm.appendChild(option)
            })
           
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


function createOption(value, text) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    return option
}


function handleTitleInputEntry() {

    const titleInputFieldElement = document.querySelector("#contact-form-title");
    const titleIconElement       = document.querySelector(".title-icon");

    handleEnterPress(titleInputFieldElement, titleIconElement);
    
}


function handleEmailInputEntry() {
    const emailInputFieldElement = document.querySelector("#contact-form-email");
    const emailIconElement       = document.querySelector(".email-icon");

    handleEnterPress(emailInputFieldElement, emailIconElement);

}

// Function doesn't check if the input entered is number, so current it will submit a tex
function handleCountryInputEntry() {
    const countryInputFieldElement = document.querySelector("#contact-form-company");
    const countryIconElement       = document.querySelector(".company-icon");
    
    handleEnterPress(countryInputFieldElement, countryIconElement);
}


function handlePreferredContactInputEntry() {
    const preferedCountryIcon = document.querySelector(".contact-number-icon");
    handleEnterPress(preferedCountryInputFieldElement, preferedCountryIcon);
}


function handleCountryInputSelection() {

    const countrySelectionElement     = document.querySelector("#country");
    const countrySelectionIconElement = document.querySelector(".country-icon");

   

    countrySelectionElement.addEventListener("change", () => {
        if (countrySelectionElement.selectedIndex > EMPTY_VALUE) {
            toggleElementDisplay(countrySelectionIconElement, true);
        } else {
            toggleElementDisplay(countrySelectionIconElement, false);
        }
    })
    
}


function handleTextInputEntry() {
    const contactUsIconElement = document.querySelector(".contact-us-icon");
    const textAreaIconElement  = document.querySelector("#description");

    handleEnterPress(textAreaIconElement, contactUsIconElement);
}

function getPhonePreference() {

    
    if (isElementValid(phoneNumberInputElement) && isElementValid(phonePreferenceElement)) {
  
        phonePreferenceElement.addEventListener("change", (e) => {

            if (phonePreferenceElement.selectedIndex > EMPTY_VALUE) {
                e.preventDefault();
                const displayType = "block";

                toggleElementDisplay(phoneNumberInputElement, true, displayType)

                // set the required attribute to required
                preferedCountryInputFieldElement.setAttribute('required', 'required');

            } else {

                // remove the required attribute before hiding the elemeent otherwise HTML will throw an error
                // since an element cannot be set to required and hidden at the same time
                hidePreferencesSection();
            }
        })
    }
    
}


function handleEnterPress(element, elementIcon) {

    if (isElementValid(element) && isElementValid(elementIcon)) {

        element.addEventListener("keydown", handleEvent);
        element.addEventListener("blur", handleEvent);  
    }

    // The blur function allows it to work even if the user hits the tab key instead of the enter key
    function handleEvent(e) {
        if (e.key === "Enter" || e.type === "blur" && element.value) {
            toggleElementDisplay(elementIcon, true);
        } else {
            toggleElementDisplay(elementIcon, false);
        }
    }
    
}



function toggleElementDisplay(element, showElement) {
    element.style.display = showElement ? "flex" : "none";
}


function minimumCharactersToUse() {


    if (contactFormTextArea) {
        
        contactFormTextArea.addEventListener("input", handleEvent);

        function handleEvent(e) {
            handleMinimumChars(e);
            handleMaxChars(e);
        }
   }
}


// Disable pasting in the textarea to prevent issues with character counting.
// Pasting messes up the character count as it only updates when the key is released.
// Display an alert to inform the user, clear the textarea content, and reset the character counter.
function disableTextAreaBoxPaste(textAreaElement) {
    if (isElementValid(textAreaElement)) {
        textAreaElement.addEventListener("paste", (e) => {
            e.preventDefault();
            alert("You cannot paste in text!!");
            textAreaElement.value = "";
            resetCharacterTextBoxString(); 
        });
    }
}



function handleMinimumChars(e) {
    handleCharacters(e, 50, ".minimum-char-string", "Minimum characters to use: ");
}


function handleMaxChars(e) {
    handleCharacters(e, 500, ".remaining-char-string", "Number of characters remaining: ");
}


// Helper function for handleMinimumChars and handleMaxChars to avoid code duplication (DRY principle method)
function handleCharacters(e, limit, outputSelector, messagePrefix) {
    const noOfCharsUsed = e.target.value.length;
    const minCharsUsed  = remainingMinimumCharacters(limit, noOfCharsUsed);
    const outputElement = document.querySelector(outputSelector);
    const message       = `${messagePrefix}`;

    handleTextString(outputElement, minCharsUsed, limit, message);
}


function remainingMinimumCharacters(minCharactersToUse, noOfCharsUsed) {
    return minCharactersToUse - noOfCharsUsed;
}

function handleTextString(stringElement, remainingMinChars, minCharactersToUse, msg) {

    const EMPTY_VALUE = ''
    stringElement.classList.remove("light-red", "black-color", "dark-green");

    updateString(remainingMinChars, stringElement, msg)

    switch (true) {
        case remainingMinChars === EMPTY_VALUE:
            stringElement.classList.add("black-color");
            break;
        case remainingMinChars <= EMPTY_VALUE:
            stringElement.classList.add("dark-green");
            break;
        case remainingMinChars < minCharactersToUse:
            stringElement.classList.add("light-red");
            break;

    }
}


function updateString(remainingMinChars, stringElement, msg) {
    if (remainingMinChars >= 0) {
        stringElement.textContent = `${msg} ${remainingMinChars}`;
    }
}

// Reset character count strings by simulating an event with an empty value.
// The simulated event mimics the structure of a real event passed to handleCharacters.
// This ensures consistent updating of character count displays.
function resetCharacterTextBoxString(minmumChars=50, maxChars=500) {
    const simulatedEvent = {
        target: {
            value: {
                length: ""  // Empty value simulates a scenario with no characters
            }
        },
    };

    // Update character count displays for different scenarios
    handleCharacters(simulatedEvent, minmumChars, ".minimum-char-string", "Minimum characters to use: ");
    handleCharacters(simulatedEvent, maxChars, ".remaining-char-string", "Number of characters remaining: ");
}


function handleContactFormSubmit() {
    const contactForm = document.querySelector("#contact-form"); 
    const contactSubmitButton = document.querySelector(".contact-submit-button");

    if (isElementValid(contactForm) && isElementValid(contactSubmitButton)) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            Swal.fire("Thank You!", "Your message has been successfully submitted. We appreciate your contact.", "success");
            e.target.reset();


            // Resets the color count 
            resetCharacterTextBoxString();

            // Hide the hidden input contact number field
             hidePreferencesSection()

            // hide the checkmark icons
            hideContactLabelIcons();
        });
    }
}


function hideContactLabelIcons() {
    // Hide all elements with the class 'contact-label-icon'
    const labelIcons = document.querySelectorAll(".contact-label-icon");
    labelIcons.forEach((icon) => {
        icon.style.display = "none";
    });
}



/**
 * Hides the preferences section by removing the 'required' attribute from
 * the preferred country input field and toggling the display of the phone
 * number input field so that it is hidden.
 */
function hidePreferencesSection() {
    preferedCountryInputFieldElement.removeAttribute('required', 'required');
    toggleElementDisplay(phoneNumberInputElement, false);
}


function isElementValid(element) {
    return !!element && element instanceof Element;
}


processData();
getPhonePreference();
handleTitleInputEntry();
handleEmailInputEntry()
handleCountryInputEntry();
handlePreferredContactInputEntry();
handleCountryInputSelection();
handleTextInputEntry();
minimumCharactersToUse();
handleContactFormSubmit();
disableTextAreaBoxPaste(contactFormTextArea);
