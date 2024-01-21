
const liveChat    = document.querySelector(".live-chat");
const messageIcon = document.querySelector(".message-us-icon");
const messageIconClose = document.querySelector(".message-us-icon-close");

import { isElementValid } from "./static/js/utils.js";


// Assuming liveChat and messageIcon are declared and accessible globally or within the same scope

function toggleLiveChat(showLiveChat=false) {
    const isLiveChatElementValid = isElementValid(liveChat, "Element couldn't be found1!");
    const EMPTY_VALUE = ''

    if (isLiveChatElementValid) {
        liveChat.style.display = showLiveChat ? "block" : EMPTY_VALUE
      
    }
}

function handleMessageIconClick() {
    const isMessageIconValid = isElementValid(messageIcon, "Element couldn't be found!!");

    if (isMessageIconValid) {
        messageIcon.addEventListener("click", () => {

            toggleLiveChat(true);

            messageIcon.style.right        = "66px";
            messageIcon.style.display      = "none";
            messageIconClose.style.display = "flex";
            messageIconClose.style.right   = "66px";
        });
    }
}

function handleMessageCloseIconClick() {

    const isMessageCloseIconValid = isElementValid(messageIconClose, "Element couldn't be found!!");

    if (isMessageCloseIconValid) {
        messageIconClose.addEventListener("click", () => {
            toggleLiveChat(false);
            messageIcon.style.right        = "115px";
            messageIcon.style.display      = "block";
            messageIconClose.style.display = "none";
        })
    }
}




function handleMessageSent() {
    const liveChatForm = document.querySelector("#live-chat-form");
    const messageTitle = document.querySelector(".message-bar-title");

    liveChatForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const status = {
            "element" : messageTitle, 
            "message" : "Message sent!", 
            "defaultMsg": "Message",
            "color"   :  "green", 
            "blinkIntervalDuration": 500, 
            "defaultColor": "white",
            "totalBlinkDuration" : 3000,
        }
        showMessageStatus(status);
        liveChatForm.reset(); // Reset the form after the blinking effect
    });
}

function showMessageStatus(status) {
    const element = status.element;
   
    element.textContent = status.message;
    element.style.color = status.color;

    const blinkInterval = setInterval(() => {
        element.style.visibility = (element.style.visibility === 'hidden') ? 'visible' : 'hidden';
    }, status.blinkIntervalDuration);

    setTimeout(() => {
        clearInterval(blinkInterval);
        element.style.visibility = 'visible';

        // Reset the message and color to the original state if needed
        element.textContent = status.defaultMsg;
        element.style.color = status.defaultColor;
    }, status.totalBlinkDuration);
}






handleMessageIconClick();
handleMessageCloseIconClick();
handleMessageSent();