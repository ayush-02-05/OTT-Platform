const movieId = window.location.pathname.split("/").pop();
const listButton = document.querySelector(".list-btn");

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
                item.contentType === "MOVIE" &&
                item.contentId === Number(movieId)
            );

            if (alreadyAdded) {
                listButton.innerHTML = `
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

listButton.addEventListener("click", () => {

    fetch("/api/my-list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contentType: "MOVIE",
            contentId: Number(movieId)
        })
    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to add to My List");
        }

        return response.json();
    })
    .then(data => {

        console.log("Added to My List:", data);

        listButton.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Added
        `;

    })
    .catch(error => {

        console.error("Error adding to My List:", error);

    });

});