/**
 * Settings file for storing class and ID elements.
 *
 * This file serves as a centralized location for managing class names and
 * ID attributes used across the application. By storing these elements here,
 * it provides a level of abstraction, preventing potential issues if changes
 * are made to the script file. Developers can easily update element references
 * in this settings file without directly modifying the script, enhancing
 * maintainability and reducing the risk of breaking the application.
 *
 * @module settings
 * @dateCreated January 15, 2024
 */


/**
 * Collection of DOM elements related to the navigation e.g styling, etc.
 * @type {Object}
 */
const NavigationElements = {

    QUOTE_BOX : ".quote-box",
    QUOTE_BTN_LINK: "#quote",
    SPINNER     : ".spinner",
}


/**
 * Collection of DOM elements related to popup box elements and its icons.
 * @type {Object}
 */
const PopupElements = {

    QuoteBox : {
        CLOSE_ICON_ID: '#popup-close-icon',
        POPUP_BOX_CLASS_ID: '.popup'
    }
}





export {
    NavigationElements,
    PopupElements
}