let heroData = [];
let currentIndex = 1;
const heroTrack = document.querySelector(".hero-track");
const heroSlider = document.querySelector(".hero-slider");
let isMoving = false;


/* =========================
   GET HERO DATA
========================= */

fetch("/api/hero")
    .then(response => response.json())
    .then(data => {
        if (!data || data.length === 0)return;
        heroData = data;
        createSlides();
        currentIndex = 1;
        moveSlider(false);

        setInterval(() => {
            if (isMoving) return;
            currentIndex++;
            moveSlider(true);
        }, 5000);
    });


/* =========================
   CREATE SLIDES
========================= */

function createSlides() {
    heroTrack.innerHTML = "";
    createSlide(heroData[heroData.length - 1]);
    heroData.forEach(movie => {
        createSlide(movie);
    });
    createSlide(heroData[0]);
}


/* =========================
   CREATE ONE SLIDE
========================= */

function createSlide(movie) {
    const slide = document.createElement("div");
    slide.classList.add("hero-slide");

    slide.style.backgroundImage = `url("${movie.posterURL}")`;
    slide.innerHTML = `
        <div class="hero-content">
            <div class="hero-type">${movie.type}</div>
            <h1 class="hero-title">${movie.title}</h1>
            <div class="hero-info">${movie.rating} • ${movie.genre}</div>
            <p class="hero-description">${movie.synopsis}</p>
            <div class="hero-buttons">
                <button>Watch Now</button>
                <button>My List</button>
            </div>
        </div>
    `;
    heroTrack.appendChild(slide);
}


/* =========================
   MOVE SLIDER
========================= */

function moveSlider(animate) {
    const slides = document.querySelectorAll(".hero-slide");

    if (!slides.length) return;

    const slideWidth = slides[0].offsetWidth;
    const gap = 20;
    const centerOffset = (heroSlider.clientWidth - slideWidth) / 2;
    const position = currentIndex * (slideWidth + gap) - centerOffset;

    if (animate) heroTrack.style.transition = "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)";
    else heroTrack.style.transition = "none";

    heroTrack.style.transform = `translate3d(-${position}px, 0, 0)`;
    updateActiveSlide(slides);

    isMoving = animate;
}


/* =========================
   ACTIVE SLIDE
========================= */

function updateActiveSlide(slides) {
    slides.forEach(slide => {
        slide.classList.remove("active");
    });
    if (slides[currentIndex]) slides[currentIndex].classList.add("active");
}


/* =========================
   INFINITE LOOP
========================= */

heroTrack.addEventListener("transitionend", event => {
    if (event.propertyName !== "transform") return;
    isMoving = false;

    if (currentIndex === heroData.length + 1) {
        currentIndex = 1;
        heroTrack.classList.add("no-slide-transition");
        moveSlider(false);
        requestAnimationFrame(() => {
            heroTrack.classList.remove("no-slide-transition");
        });
    }
});


/* =========================
   HANDLE RESIZE
========================= */

window.addEventListener("resize", () => {
    heroTrack.style.transition = "none";
    moveSlider(false);
});