/* =========================
   HEADER
========================= */

fetch("/HTML/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-container").innerHTML = data;
    });


/* =========================
   SERIES ID
========================= */

const seriesId = window.location.pathname.split("/").pop();


/* =========================
   SERIES DETAILS
========================= */

fetch(`/api/series/${seriesId}`)
    .then(response => response.json())
    .then(series => {

        document.getElementById("series-poster").src = series.posterURL;

        document.getElementById("series-title").textContent = series.title;

        document.getElementById("series-year").textContent = series.releaseYear;

        document.getElementById("series-genre").textContent = series.genre;

        document.getElementById("series-rating").textContent = series.rating;

        document.getElementById("series-synopsis").textContent = series.synopsis;

        document.getElementById("about-synopsis").textContent = series.synopsis;
    });


/* =========================
   SEASONS
========================= */

const seasonSelect = document.getElementById("season-select");

fetch(`/api/series/${seriesId}/seasons`)
    .then(response => response.json())
    .then(seasons => {

        seasonSelect.innerHTML = "";

        seasons.forEach(season => {

            const option = document.createElement("option");

            option.value = season.seasonId;

            option.textContent = `Season ${season.seasonNumber}`;

            seasonSelect.appendChild(option);
        });

        if (seasons.length > 0) {
            loadEpisodes(seasons[0].seasonId);
        }
    });


/* =========================
   EPISODES
========================= */

function loadEpisodes(seasonId) {

    fetch(`/api/seasons/${seasonId}/episodes`)
        .then(response => response.json())
        .then(episodes => {

            const episodeList = document.getElementById("episode-list");

            episodeList.innerHTML = "";

            episodes.forEach(episode => {

                episodeList.innerHTML += `
                    
                    <div class="episode-card">

                        <div class="episode-number">
                            ${episode.episodeNumber}
                        </div>

                        <div class="episode-info">

                            <h3>
                                ${episode.episodeTitle}
                            </h3>

                            <p>
                                Episode ${episode.episodeNumber}
                            </p>

                        </div>

                        <span class="episode-duration">
                            ${episode.duration} min
                        </span>

                        <button class="episode-play">
                            ▶
                        </button>

                    </div>

                `;
            });
        });
}


/* =========================
   SEASON CHANGE
========================= */

seasonSelect.addEventListener("change", function () {

    const seasonId = this.value;

    loadEpisodes(seasonId);

});


/* =========================
   TABS
========================= */

const tabButtons = document.querySelectorAll(".tab-btn");

const tabContents = document.querySelectorAll(".tab-content");


tabButtons.forEach(button => {

    button.addEventListener("click", function () {

        const tab = this.dataset.tab;


        tabButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        tabContents.forEach(content => {
            content.classList.remove("active");
        });


        this.classList.add("active");

        document
            .getElementById(`${tab}-tab`)
            .classList.add("active");

    });

});