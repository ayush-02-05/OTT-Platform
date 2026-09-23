// ==================== LOAD HEADER ====================

fetch("/HTML/header.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("header-container").innerHTML = data;

    });


// ==================== SERIES DATA ====================

let series = [];


// ==================== FILTER ELEMENTS ====================

const genreFilter =
    document.getElementById("genre-filter");

const yearFilter =
    document.getElementById("year-filter");

const sortFilter =
    document.getElementById("sort-filter");


// ==================== DISPLAY SERIES ====================

function displaySeries(seriesList) {

    const seriesGrid =
        document.getElementById("series-grid");

    seriesGrid.innerHTML = "";


    seriesList.forEach(show => {

        seriesGrid.innerHTML += `

            <div class="series-card">

                <img
                    src="${show.posterURL}"
                    alt="${show.title}"
                >


                <div class="series-info">

                    <h3>${show.title}</h3>

                    <p>${show.genre}</p>


                    <div class="series-bottom">

                        <span class="series-year">
                            ${show.releaseYear}
                        </span>


                        <span class="series-rating">
                            ⭐ ${show.rating}
                        </span>

                    </div>

                </div>

            </div>

        `;
    });
}


// ==================== FETCH SERIES ====================

fetch("/api/series")
    .then(response => response.json())
    .then(data => {

        series = data;


        // Display all series

        displaySeries(series);


        // ==================== GENRE FILTER ====================

        const genres = [
            ...new Set(
                series.map(show => show.genre)
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
                series.map(show => show.releaseYear)
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

        console.error(
            "Error fetching series:",
            error
        );

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


// ==================== SORT SERIES ====================

function sortSeries(seriesList, sortType) {

    return [...seriesList].sort((a, b) => {

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

function updateSeries() {

    const selectedGenre =
        genreFilter.value;

    const selectedYear =
        yearFilter.value;

    const selectedSort =
        sortFilter.value;


    // ==================== FILTER ====================

    let filteredSeries =
        series.filter(show => {

            const genreMatch =
                selectedGenre === "" ||
                show.genre === selectedGenre;


            const yearMatch =
                selectedYear === "" ||
                show.releaseYear == selectedYear;


            return genreMatch && yearMatch;

        });


    // ==================== SORT ====================

    filteredSeries =
        sortSeries(
            filteredSeries,
            selectedSort
        );


    // ==================== DISPLAY ====================

    displaySeries(filteredSeries);
}


// ==================== GENRE FILTER ====================

genreFilter.addEventListener(
    "change",
    () => {

        updateSeries();

    }
);


// ==================== YEAR FILTER ====================

yearFilter.addEventListener(
    "change",
    () => {

        updateSeries();

    }
);


// ==================== SORT FILTER ====================

sortFilter.addEventListener(
    "change",
    () => {

        updateSeries();

    }
);