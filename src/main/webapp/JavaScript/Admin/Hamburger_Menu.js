const hamburger = document.querySelector(".hamburger");
const hamburgerIcon = document.querySelector(".hamburger i");

const menu = document.querySelector(".menu");
const dashboard = document.querySelector(".dashboard");

hamburger.addEventListener("click", () => {
    menu.classList.add("active");
    dashboard.classList.add("move");
});

closeMenu.addEventListener("click", () => {
    menu.classList.remove("active");
    dashboard.classList.remove("move");
});



const movieButtons = document.querySelectorAll(".movieButton");

movieButtons.forEach(button => {

    button.addEventListener("click", () => {

        const movieOptions = button.nextElementSibling;

        movieOptions.classList.toggle("active");

    });

});