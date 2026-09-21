const openAddMovie = document.getElementById("openAddMovie");
const closeDrawer = document.querySelector(".close-drawer");
const addMovieDrawer = document.querySelector(".add-movie-drawer");

const editButtons = document.querySelectorAll(".edit-btn");

openAddMovie.addEventListener("click", function () {
    document.getElementById("drawerTitle").innerText = "Add Movie";
    document.getElementById("drawerSubmit").innerText = "Add Movie";
    addMovieDrawer.style.right = "0";
});


closeDrawer.addEventListener("click", function () {
    addMovieDrawer.style.right = "-500px";
});




const moviesSearch = document.getElementById("moviesSearch");
const genreFilter = document.getElementById("genreFilter");
function filterMovies() {
    const searchValue = moviesSearch.value.toLowerCase().trim();
    const selectedGenre = genreFilter.value.toLowerCase();
    const rows = document.querySelectorAll(".movie-table tbody tr");

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
moviesSearch.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);





editButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const movieId = button.dataset.movieId;
        const title = button.dataset.title;
        const genre = button.dataset.genre;
        const rating = button.dataset.rating;
        const releaseYear = button.dataset.releaseYear;
        const synopsis = button.dataset.synopsis;
        const posterURL = button.dataset.posterUrl;

        document.getElementById("movieId").value = movieId;
        document.getElementById("movieTitle").value = title;
        document.getElementById("movieGenre").value = genre;
        document.getElementById("movieRating").value = rating;
        document.getElementById("releaseYear").value = releaseYear;
        document.getElementById("movieSynopsis").value = synopsis;
        document.getElementById("moviePoster").value = posterURL;

        document.getElementById("drawerTitle").innerText = "Edit Movie";
        document.getElementById("drawerSubmit").innerText = "Update Movie";
        addMovieDrawer.style.right = "0";
    });

});

const deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const movieId = button.dataset.movieId;
        const confirmDelete = confirm("Are you sure you want to delete this movie?");

        if (!confirmDelete)return;

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