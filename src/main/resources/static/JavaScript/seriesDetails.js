const seriesId = window.location.pathname.split("/").pop();
const myListButton = document.querySelector(".my-list-btn");


/* =========================
   CHECK MY LIST
========================= */

function checkMyList() {

    fetch("/api/my-list")
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to check My List");
            }

            return response.json();
        })
        .then(myList => {

            const alreadyAdded = myList.some(item =>
                item.contentType === "SERIES" &&
                item.contentId === Number(seriesId)
            );
            if (alreadyAdded) {
                myListButton.innerHTML = `
                    <i class="fa-solid fa-check"></i>
                    Added
                `;
            }
        })
        .catch(error => {
            console.error("Error checking My List:", error);
        });
}


checkMyList();


myListButton.addEventListener("click", () => {

    fetch("/api/my-list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contentType: "SERIES",
            contentId: Number(seriesId)
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to add series to My List");
        }

        return response.json();
    })
    .then(data => {

        console.log("Series added to My List:", data);

        myListButton.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Added
        `;
    })
    .catch(error => {
        console.error("Error adding series to My List:", error);
    });
});

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