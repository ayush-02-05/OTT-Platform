fetch("/HTML/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-container").innerHTML = data;
    })

const movieId = window.location.pathname.split("/").pop();

fetch(`/api/movies/${movieId}`)
    .then(response => response.json())
    .then(movie => {

        document.getElementById("movie-poster").src = movie.posterURL;

        document.getElementById("movie-title").textContent = movie.title;

        document.getElementById("movie-year").textContent = movie.releaseYear;

        document.getElementById("movie-genre").textContent = movie.genre;

        document.getElementById("movie-rating").textContent = movie.rating;

        document.getElementById("movie-synopsis").textContent = movie.synopsis;

    })
    .catch(error => {
        console.error("Error fetching movie:", error);
    });