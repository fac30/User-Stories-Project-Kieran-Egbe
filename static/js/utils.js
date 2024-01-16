/**
 * Utility functions for common tasks and functionalities.
 *
 * This file contains a collection of reusable utility functions to assist with various
 * tasks and operations in the application.
 *
 * @module utils
 * @dateCreated January 15, 2024
 */




/**
 * Retrieve a DOM element using its identifier (ID or class).
 * 
 * @param {string} identifier - The ID or class of the DOM element to retrieve.
 * @returns {HTMLElement|null} - The DOM element with the specified identifier, or null if not found.
 */
function getQuery(identifier) {
    return document.querySelector(identifier);
}




export {getQuery}