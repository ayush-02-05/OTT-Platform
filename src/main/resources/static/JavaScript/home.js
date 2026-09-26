/* =========================
   MY LIST
========================= */

let userMyList = [];


function loadMyList() {

    return fetch("/api/my-list")
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load My List");
            }

            return response.json();

        })
        .then(data => {

            userMyList = data;

        })
        .catch(error => {

            console.error(
                "Error loading My List:",
                error
            );

        });

}


function isInMyList(contentType, contentId) {

    return userMyList.some(item =>
        item.contentType === contentType &&
        item.contentId === Number(contentId)
    );

}


function addToMyList(contentType, contentId, button) {

    /*
        Already added
    */

    if (isInMyList(contentType, contentId)) {

        button.innerHTML =
            `<i class="fa-solid fa-check"></i> Added`;

        return;

    }


    fetch("/api/my-list", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            contentType: contentType,

            contentId: Number(contentId)

        })

    })
    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to add to My List"
            );

        }

        return response.json();

    })
    .then(data => {

        /*
            Save newly added item locally
            so UI immediately knows it is added
        */

        userMyList.push(data);


        button.innerHTML =
            `<i class="fa-solid fa-check"></i> Added`;

    })
    .catch(error => {

        console.error(
            "Error adding to My List:",
            error
        );

    });

}


/* =========================
   HERO
========================= */

let heroData = [];

let currentIndex = 1;

const heroTrack =
    document.querySelector(".hero-track");

const heroSlider =
    document.querySelector(".hero-slider");

let isMoving = false;


/* =========================
   LOAD HERO DATA
========================= */

function loadHero() {

    fetch("/home/hero")

        .then(response => response.json())

        .then(data => {

            if (!data || data.length === 0) {
                return;
            }


            heroData = data;


            createSlides();


            currentIndex = 1;


            moveSlider(false);


            setInterval(() => {

                if (isMoving) {
                    return;
                }


                currentIndex++;


                moveSlider(true);

            }, 5000);

        })

        .catch(error => {

            console.error(
                "Error loading hero:",
                error
            );

        });

}


/* =========================
   CREATE SLIDES
========================= */

function createSlides() {

    heroTrack.innerHTML = "";


    /*
        Clone last slide
    */

    createSlide(
        heroData[heroData.length - 1]
    );


    /*
        Actual slides
    */

    heroData.forEach(item => {

        createSlide(item);

    });


    /*
        Clone first slide
    */

    createSlide(heroData[0]);

}


/* =========================
   CREATE ONE SLIDE
========================= */

function createSlide(item) {

    const slide =
        document.createElement("div");


    slide.classList.add("hero-slide");


    slide.style.backgroundImage =
        `url("${item.posterURL}")`;


    slide.innerHTML = `

        <div class="hero-content">

            <div class="hero-type">
                ${item.type}
            </div>


            <h1 class="hero-title">
                ${item.title}
            </h1>


            <div class="hero-info">
                ${item.rating} • ${item.genre}
            </div>


            <p class="hero-description">
                ${item.synopsis}
            </p>


            <div class="hero-buttons">

                <button class="watch-btn">
                    Watch Now
                </button>


                <button class="hero-my-list-btn">

                    + My List

                </button>

            </div>

        </div>

    `;


    /* =========================
       CLICK SLIDE
    ========================= */

    slide.addEventListener("click", () => {

        if (item.type === "MOVIE") {

            window.location.href =
                `/movies/${item.id}`;

        }

        else if (item.type === "SERIES") {

            window.location.href =
                `/series/${item.id}`;

        }

    });


    /* =========================
       WATCH BUTTON
    ========================= */

    const watchButton =
        slide.querySelector(".watch-btn");


    watchButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            if (item.type === "MOVIE") {

                window.location.href =
                    `/movies/${item.id}`;

            }

            else if (item.type === "SERIES") {

                window.location.href =
                    `/series/${item.id}`;

            }

        }
    );


    /* =========================
       MY LIST BUTTON
    ========================= */

    const myListButton =
        slide.querySelector(
            ".hero-my-list-btn"
        );


    myListButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            addToMyList(

                item.type,

                item.id,

                myListButton

            );

        }
    );


    /*
        Check whether already added
    */

    if (
        isInMyList(
            item.type,
            item.id
        )
    ) {

        myListButton.innerHTML =
            `<i class="fa-solid fa-check"></i> Added`;

    }


    heroTrack.appendChild(slide);

}


/* =========================
   MOVE SLIDER
========================= */

function moveSlider(animate) {

    const slides =
        document.querySelectorAll(
            ".hero-slide"
        );


    if (!slides.length) {
        return;
    }


    const slideWidth =
        slides[0].offsetWidth;


    const gap = 20;


    const centerOffset =
        (
            heroSlider.clientWidth -
            slideWidth
        ) / 2;


    const position =
        currentIndex *
        (slideWidth + gap)
        - centerOffset;


    if (animate) {

        heroTrack.style.transition =
            "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)";

    }

    else {

        heroTrack.style.transition =
            "none";

    }


    heroTrack.style.transform =
        `translate3d(-${position}px, 0, 0)`;


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


    if (slides[currentIndex]) {

        slides[currentIndex]
            .classList.add("active");

    }

}


/* =========================
   INFINITE SLIDER
========================= */

heroTrack.addEventListener(
    "transitionend",
    event => {

        if (
            event.propertyName !== "transform"
        ) {

            return;

        }


        isMoving = false;


        if (
            currentIndex ===
            heroData.length + 1
        ) {

            currentIndex = 1;


            heroTrack.classList.add(
                "no-slide-transition"
            );


            moveSlider(false);


            requestAnimationFrame(() => {

                heroTrack.classList.remove(
                    "no-slide-transition"
                );

            });

        }

    }
);


/* =========================
   RESIZE
========================= */

window.addEventListener(
    "resize",
    () => {

        heroTrack.style.transition =
            "none";


        moveSlider(false);

    }
);


/* =========================
   LOAD MOVIES
========================= */

function loadMovies() {

    fetch("/home/movies")

        .then(response => response.json())

        .then(movies => {

            const movieData =
                document.querySelector(
                    ".movie-data"
                );


            movies.forEach(movie => {

                const card =
                    document.createElement("div");


                card.classList.add(
                    "movie-card"
                );


                card.innerHTML = `

                    <img
                        src="${movie.posterURL}"
                        alt="${movie.title}"
                    >


                    <h3>
                        ${movie.title}
                    </h3>


                    <div class="movie-meta">

                        <span>
                            ${movie.releaseYear}
                        </span>


                        <span class="rating">

                            <i class="fa-solid fa-star"></i>

                            ${movie.rating}

                        </span>

                    </div>


                    <button class="home-my-list-btn">

                        ${
                            isInMyList(
                                "MOVIE",
                                movie.movieId
                            )

                            ?

                            '<i class="fa-solid fa-check"></i> Added'

                            :

                            '+ My List'
                        }

                    </button>

                `;


                /* =========================
                   MY LIST BUTTON
                ========================= */

                const myListButton =
                    card.querySelector(
                        ".home-my-list-btn"
                    );


                myListButton.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        addToMyList(

                            "MOVIE",

                            movie.movieId,

                            myListButton

                        );

                    }
                );


                /* =========================
                   CARD CLICK
                ========================= */

                card.addEventListener(
                    "click",
                    () => {

                        window.location.href =
                            `/movies/${movie.movieId}`;

                    }
                );


                movieData.appendChild(card);

            });

        })

        .catch(error => {

            console.error(
                "Error loading movies:",
                error
            );

        });

}


/* =========================
   LOAD SERIES
========================= */

function loadSeries() {

    fetch("/home/series")

        .then(response => response.json())

        .then(series => {

            const seriesData =
                document.querySelector(
                    ".series-data"
                );


            series.forEach(s => {

                const card =
                    document.createElement("div");


                card.classList.add(
                    "series-card"
                );


                card.innerHTML = `

                    <img
                        src="${s.posterURL}"
                        alt="${s.title}"
                    >


                    <h3>
                        ${s.title}
                    </h3>


                    <div class="series-meta">

                        <span>
                            ${s.releaseYear}
                        </span>


                        <span class="rating">

                            <i class="fa-solid fa-star"></i>

                            ${s.rating}

                        </span>

                    </div>


                    <button class="home-my-list-btn">

                        ${
                            isInMyList(
                                "SERIES",
                                s.seriesId
                            )

                            ?

                            '<i class="fa-solid fa-check"></i> Added'

                            :

                            '+ My List'
                        }

                    </button>

                `;


                /* =========================
                   MY LIST BUTTON
                ========================= */

                const myListButton =
                    card.querySelector(
                        ".home-my-list-btn"
                    );


                myListButton.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        addToMyList(

                            "SERIES",

                            s.seriesId,

                            myListButton

                        );

                    }
                );


                /* =========================
                   CARD CLICK
                ========================= */

                card.addEventListener(
                    "click",
                    () => {

                        window.location.href =
                            `/series/${s.seriesId}`;

                    }
                );


                seriesData.appendChild(card);

            });

        })

        .catch(error => {

            console.error(
                "Error loading series:",
                error
            );

        });

}


/* =========================
   INITIALIZE HOME
========================= */

loadMyList()
    .then(() => {

        loadHero();

        loadMovies();

        loadSeries();

    });