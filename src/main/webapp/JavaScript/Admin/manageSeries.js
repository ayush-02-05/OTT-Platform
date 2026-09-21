const openAddSeries = document.getElementById("openAddSeries");
const seriesForm = document.querySelector(".drawer-form form");
const seriesId = document.getElementById("seriesId");
const seasonDetails = document.getElementById("season-details");
const seriesTitle = document.getElementById("seriesTitle");
const drawerTitle = document.getElementById("drawerTitle");
const drawerDescription = document.getElementById("drawerDescription");
const drawerSubmit = document.getElementById("drawerSubmit");
const drawer = document.querySelector(".add-series-drawer");

openAddSeries.addEventListener("click", function () {
    seriesForm.reset();
    seriesId.value = "0";
    seasonDetails.innerHTML = "";
    drawerTitle.textContent = "Add Series";
    drawerDescription.textContent = "Add a new series to the platform.";
    drawerSubmit.textContent = "Add Series";

    drawer.style.right = "0";
});



const closeDrawer = document.querySelector(".close-drawer");
closeDrawer.addEventListener("click", function () {
    drawer.style.right = "-500px";

});




seriesForm.addEventListener("reset", function () {
    setTimeout(function () {
        seasonDetails.innerHTML = "";
    }, 0);
});




const numberOfSeasons = document.getElementById("numberOfSeasons");
numberOfSeasons.addEventListener("input", function () {
    seasonDetails.innerHTML = "";
    const count = parseInt(numberOfSeasons.value);

    if (isNaN(count) || count < 1) return;

    for (let i = 1; i <= count; i++) {
        const seasonGroup = document.createElement("div");
        seasonGroup.classList.add("form-group");
        seasonGroup.innerHTML = `<label for="season-${i}-release-year">Season ${i} Release Year</label>

            <input type="number" id="season-${i}-release-year" name="seasonReleaseYears"
                min="1900" max="2100" placeholder="Enter release year" required
            >
        `;
        seasonDetails.appendChild(seasonGroup);
    }
});





const editButtons = document.querySelectorAll(".edit-btn");
const seriesGenre = document.getElementById("seriesGenre");
const seriesRating = document.getElementById("seriesRating");
const seriesSynopsis = document.getElementById("seriesSynopsis");
const seriesPoster = document.getElementById("seriesPoster");
editButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        const id = button.dataset.seriesId;
        const title = button.dataset.title;
        const genre = button.dataset.genre;
        const rating = button.dataset.rating;
        const synopsis = button.dataset.synopsis;
        const posterURL = button.dataset.posterUrl;
        const seasonReleaseYears = button.dataset.seasonReleaseYears.split(",");
        const row = button.closest("tr");
        const seasonCount = parseInt(row.children[5].textContent.trim());


        seriesId.value = id;
        seriesTitle.value = title;
        seriesGenre.value = genre;
        seriesRating.value = rating;
        seriesSynopsis.value = synopsis;
        seriesPoster.value = posterURL;
        numberOfSeasons.value = seasonCount;


        seasonDetails.innerHTML = "";
        for (let i = 1; i <= seasonCount; i++) {
            const seasonGroup = document.createElement("div");
            seasonGroup.classList.add("form-group");
            seasonGroup.innerHTML = `<label for="season-${i}-release-year"> Season ${i} Release Year</label>
                <input
                    type="number" id="season-${i}-release-year" name="seasonReleaseYears"
                    min="1900" max="2100" placeholder="Enter release year" value="${seasonReleaseYears[i - 1]}" required
                >
            `;
            seasonDetails.appendChild(seasonGroup);
        }

        drawerTitle.textContent = "Edit Series";
        drawerDescription.textContent = "Update the series details.";
        drawerSubmit.textContent = "Update Series";
        drawer.style.right = "0";
    });
});




const seriesSearch = document.getElementById("seriesSearch");
const genreFilter = document.getElementById("genreFilter");
function filterSeries() {
    const searchValue = seriesSearch.value.toLowerCase().trim();
    const selectedGenre = genreFilter.value.toLowerCase();
    const rows = document.querySelectorAll(".series-table tbody tr");

    rows.forEach(function (row) {
        const title = row.children[2].textContent.toLowerCase().trim();
        const genre = row.children[3].textContent.toLowerCase().trim();

        const matchesSearch = title.includes(searchValue) || genre.includes(searchValue);
        const matchesGenre = selectedGenre === "" || genre === selectedGenre;
        if (matchesSearch && matchesGenre) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
seriesSearch.addEventListener("input", filterSeries);
genreFilter.addEventListener("change", filterSeries);





document.addEventListener("click", function (event) {
    if (drawer.style.right === "0px" && !drawer.contains(event.target) && !openAddSeries.contains(event.target) && !event.target.closest(".edit-btn")) {
        drawer.style.right = "-500px";
    }
});




const deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const seriesId = button.dataset.seriesId;
        const confirmDelete = confirm("Are you sure you want to delete this series?");

        if (!confirmDelete) return;

        fetch(`/dashboard/manageSeries/${seriesId}`, {
            method: "DELETE"
        }) .then(function (response) {
            if (!response.ok) throw new Error("Failed to delete series");
            return response.text();
        }) .then(function () {
            window.location.href = "/dashboard/manageSeries";
        }) .catch(function (error) {
            console.error(error);
            alert("Failed to delete series.");
        });
    });
});