import { isElementValid } from "./static/js/utils.js";


const sideBar = document.querySelector(".testimonal-sidebar");
const closeIcon = document.querySelector(".testimonal-close-icon");
const readMorespinner = document.querySelector(".readmore-spinner");

const ERROR_MSG = "The selector was not found"



function openReadMoreSideBar() {
    const readMoreButton = document.querySelector(".read-more-btn");
    const WIDTH_SIZE = "60%"

    const isREadMoreValid = isElementValid(readMoreButton, ERROR_MSG);
    const isSideBarValid = isElementValid(sideBar, ERROR_MSG);
    const isCloseIconValid = isElementValid(closeIcon, ERROR_MSG);
    const isReadMoreSpinnerValid = isElementValid(readMorespinner, ERROR_MSG)

    if (isREadMoreValid && isSideBarValid && isCloseIconValid && isReadMoreSpinnerValid) {

        readMoreButton.addEventListener("click", (e) => {
            e.preventDefault();

            readMorespinner.style.display = "inline-flex";

            setTimeout(() => {
                sideBar.style.width = WIDTH_SIZE;
                closeIcon.style.display = "flex";
            }, 2000)


        })

    }
}

function closeTestimonalSideBar() {

    const isCloseIconValid = isElementValid(closeIcon, ERROR_MSG);
    const isSideBarValid = isElementValid(sideBar, ERROR_MSG);

    if (isCloseIconValid && isSideBarValid) {
        closeIcon.classList.toggle("rotateIcon");

        closeIcon.addEventListener("click", () => {
            handleCloseSideBar(closeIcon, sideBar);
        });
    }
}

function handleCloseSideBar(closeIcon, sideBar) {
    const animationDuration = 100;
    const closeWidth = 0;

    setTimeout(() => {
        sideBar.style.width = closeWidth;
        closeIcon.style.display = "none";
        readMorespinner.style.display = "none";

    }, animationDuration);

}


closeTestimonalSideBar();
openReadMoreSideBar();
