const openAddMovie = document.getElementById("openAddMovie");
const closeDrawer = document.querySelector(".close-drawer");
const addMovieDrawer = document.querySelector(".add-movie-drawer");
const editButtons = document.querySelectorAll(".edit-btn");
const genreFilter = document.getElementById("genreFilter");

// OPEN ADD MOVIE DRAWER
openAddMovie.addEventListener("click", function () {
    document.getElementById("movieId").value = "";
    document.getElementById("movieTitle").value = "";
    document.getElementById("movieGenre").value = "";
    document.getElementById("movieRating").value = "";
    document.getElementById("releaseYear").value = "";
    document.getElementById("movieSynopsis").value = "";
    document.getElementById("moviePoster").value = "";

    document.getElementById("drawerTitle").innerText = "Add Movie";
    document.getElementById("drawerSubmit").innerText = "Add Movie";

    addMovieDrawer.style.right = "0";
});

// CLOSE DRAWER
closeDrawer.addEventListener("click", function () {
    addMovieDrawer.style.right = "-500px";
});

// GENRE FILTER
function filterMovies() {
    const selectedGenre = genreFilter.value.toLowerCase().trim();
    const rows = document.querySelectorAll(".movie-table tbody tr");

    rows.forEach(function (row) {
        const genre = row.children[3].textContent.toLowerCase().trim();

        row.style.display =
            selectedGenre === "" || genre === selectedGenre ? "" : "none";
    });
}

genreFilter.addEventListener("change", filterMovies);

// EDIT MOVIE
editButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        document.getElementById("movieId").value = button.dataset.movieId;
        document.getElementById("movieTitle").value = button.dataset.title;
        document.getElementById("movieGenre").value = button.dataset.genre;
        document.getElementById("movieRating").value = button.dataset.rating;
        document.getElementById("releaseYear").value = button.dataset.releaseYear;
        document.getElementById("movieSynopsis").value = button.dataset.synopsis;
        document.getElementById("moviePoster").value = button.dataset.posterUrl;

        document.getElementById("drawerTitle").innerText = "Edit Movie";
        document.getElementById("drawerSubmit").innerText = "Update Movie";

        addMovieDrawer.style.right = "0";
    });
});

// DELETE MOVIE
const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const movieId = button.dataset.movieId;

        if (!confirm("Are you sure you want to delete this movie?")) {
            return;
        }

        const form = document.createElement("form");
        form.method = "POST";
        form.action = "/dashboard/movies/delete";

        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "movieId";
        input.value = movieId;

        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    });
});