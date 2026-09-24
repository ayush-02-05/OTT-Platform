// ==================== LOAD HEADER ====================

fetch("/HTML/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-container").innerHTML = data;
    });


// ==================== MOVIE DATA ====================

let movies = [];


// ==================== FILTER ELEMENTS ====================

const genreFilter = document.getElementById("genre-filter");
const yearFilter = document.getElementById("year-filter");
const sortFilter = document.getElementById("sort-filter");


// ==================== DISPLAY MOVIES ====================

function displayMovies(movieList) {
    const movieGrid = document.getElementById("movie-grid");
    movieGrid.innerHTML = "";
    movieList.forEach(movie => {
        movieGrid.innerHTML += `
            <div class="movie-card" data-movie-id="${movie.movieId}">
                <img src="${movie.posterURL}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p>${movie.genre}</p>
                    <div class="movie-bottom">
                        <span class="movie-year"> ${movie.releaseYear}</span>
                        <span class="movie-rating">⭐ ${movie.rating}</span>
                    </div>
                </div>
            </div>
        `;
    });
}


const movieGrid = document.getElementById("movie-grid");
movieGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".movie-card");
    if (!card) return;
    const movieId = card.dataset.movieId;
    window.location.href = `/movies/${movieId}`;
});

// ==================== FETCH MOVIES ====================

fetch("/api/movies")
    .then(response => response.json())
    .then(data => {

        movies = data;

        // Display all movies
        displayMovies(movies);


        // ==================== GENRE FILTER ====================

        const genres = [
            ...new Set(
                movies.map(movie => movie.genre)
            )
        ];

        genres.forEach(genre => {

            genreFilter.innerHTML += `
                <option value="${genre}">
                    ${genre}
                </option>
            `;
        });


        // ==================== YEAR FILTER ====================

        const years = [
            ...new Set(
                movies.map(movie => movie.releaseYear)
            )
        ];

        years.sort((a, b) => b - a);

        years.forEach(year => {

            yearFilter.innerHTML += `
                <option value="${year}">
                    ${year}
                </option>
            `;
        });

    })
    .catch(error => {
        console.error("Error fetching movies:", error);
    });


// ==================== SORT OPTIONS ====================

sortFilter.innerHTML += `

    <option value="rating-desc">
        Rating: High to Low
    </option>

    <option value="rating-asc">
        Rating: Low to High
    </option>

    <option value="year-desc">
        Newest First
    </option>

    <option value="year-asc">
        Oldest First
    </option>

`;


// ==================== SORT MOVIES ====================

function sortMovies(movieList, sortType) {

    return [...movieList].sort((a, b) => {

        if (sortType === "rating-desc") {
            return b.rating - a.rating;
        }

        if (sortType === "rating-asc") {
            return a.rating - b.rating;
        }

        if (sortType === "year-desc") {
            return b.releaseYear - a.releaseYear;
        }

        if (sortType === "year-asc") {
            return a.releaseYear - b.releaseYear;
        }

        return 0;
    });
}


// ==================== FILTER + SORT ====================

function updateMovies() {

    const selectedGenre = genreFilter.value;
    const selectedYear = yearFilter.value;
    const selectedSort = sortFilter.value;


    // ==================== FILTER ====================

    let filteredMovies = movies.filter(movie => {

        const genreMatch =
            selectedGenre === "" ||
            movie.genre === selectedGenre;


        const yearMatch =
            selectedYear === "" ||
            movie.releaseYear == selectedYear;


        return genreMatch && yearMatch;
    });


    // ==================== SORT ====================

    filteredMovies = sortMovies(
        filteredMovies,
        selectedSort
    );


    // ==================== DISPLAY ====================

    displayMovies(filteredMovies);
}


// ==================== GENRE FILTER EVENT ====================

genreFilter.addEventListener("change", () => {

    updateMovies();

});


// ==================== YEAR FILTER EVENT ====================

yearFilter.addEventListener("change", () => {

    updateMovies();

});


// ==================== SORT FILTER EVENT ====================

sortFilter.addEventListener("change", () => {

    updateMovies();

});