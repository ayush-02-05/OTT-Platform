// =========================================================
// LOAD SIDEBAR
// =========================================================

fetch("/HTML/sidebar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("sidebar-container").innerHTML = data;
    });


// =========================================================
// VARIABLES
// =========================================================

let myList = [];
let currentFilter = "ALL";
let currentSort = "recent";


// =========================================================
// ELEMENTS
// =========================================================

const myListGrid =
    document.getElementById("my-list-grid");

const emptyList =
    document.getElementById("empty-list");

const listCount =
    document.getElementById("list-count");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const sortFilter =
    document.getElementById("sort-filter");


// =========================================================
// LOAD MY LIST
// =========================================================

function loadMyList() {

    fetch("/api/my-list")
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load My List");
            }

            return response.json();
        })
        .then(data => {

            myList = data;

            loadContentDetails();

        })
        .catch(error => {

            console.error("Error loading My List:", error);

        });
}


// =========================================================
// LOAD MOVIE / SERIES DETAILS
// =========================================================

function loadContentDetails() {

    const requests = myList.map(item => {

        if (item.contentType === "MOVIE") {

            return fetch(`/api/movies/${item.contentId}`)
                .then(response => response.json())
                .then(content => {

                    return {
                        ...item,
                        content: content
                    };

                });

        }


        if (item.contentType === "SERIES") {

            return fetch(`/api/series/${item.contentId}`)
                .then(response => response.json())
                .then(content => {

                    return {
                        ...item,
                        content: content
                    };

                });

        }

    });


    Promise.all(requests)
        .then(result => {

            myList = result.filter(item => item);

            displayMyList();

        })
        .catch(error => {

            console.error(
                "Error loading content details:",
                error
            );

        });
}

// =========================================================
// DISPLAY MY LIST
// =========================================================

function displayMyList() {

    myListGrid.innerHTML = "";


    // -----------------------------------------------------
    // FILTER
    // -----------------------------------------------------

    let filteredList = myList.filter(item => {

        if (currentFilter === "ALL") {
            return true;
        }

        return item.contentType === currentFilter;

    });


    // -----------------------------------------------------
    // SORT
    // -----------------------------------------------------

    if (currentSort === "title") {

        filteredList.sort((a, b) => {

            const titleA = getTitle(a.content);
            const titleB = getTitle(b.content);

            return titleA.localeCompare(titleB);

        });

    }


    if (currentSort === "rating") {

        filteredList.sort((a, b) => {

            const ratingA = getRating(a.content);
            const ratingB = getRating(b.content);

            return ratingB - ratingA;

        });

    }


    if (currentSort === "oldest") {

        filteredList.reverse();

    }


    // -----------------------------------------------------
    // COUNT
    // -----------------------------------------------------

    listCount.textContent = filteredList.length;


    // -----------------------------------------------------
    // EMPTY STATE
    // -----------------------------------------------------

    if (filteredList.length === 0) {

        emptyList.style.display = "flex";

        return;

    }

    emptyList.style.display = "none";


    // -----------------------------------------------------
    // CREATE CARDS
    // -----------------------------------------------------

    filteredList.forEach(item => {

        const card = createCard(item);

        myListGrid.appendChild(card);

    });

}


// =========================================================
// CREATE CARD
// =========================================================

function createCard(item) {

    const content = item.content;

    const card =
        document.createElement("div");

    card.className = "my-list-card";


    // Content information

    const title =
        getTitle(content);

    const poster =
        getPoster(content);

    const year =
        getYear(content);

    const rating =
        getRating(content);

    const type =
        item.contentType;


    card.innerHTML = `

        <div class="my-list-poster">

            <img
                src="${poster}"
                alt="${title}"
                onerror="this.src='/Images/default-poster.jpg'"
            >

            <span class="content-type ${type === "SERIES" ? "series" : ""}">
                ${type === "MOVIE" ? "Movie" : "Series"}
            </span>
            <button
                class="remove-btn"
                data-id="${item.id}"
                title="Remove from My List">
                ×
            </button>
        </div>
        <div class="my-list-details">
            <h3>${title}</h3>
            <div class="card-meta">
                <span> ${year} </span>
                <span class="card-rating">
                    <span class="star">★</span>
                    ${rating}
                </span>
            </div>
        </div>
    `;
    // Remove button
    const removeButton = card.querySelector(".remove-btn");
    removeButton.addEventListener("click", () => {
            removeFromMyList(item.id);
        }
    );
    return card;
}


// =========================================================
// GET TITLE
// =========================================================

function getTitle(content) {
    return content.title || "Untitled";
}

// =========================================================
// GET POSTER
// =========================================================

function getPoster(content) {
    return content.posterURL || "/Images/default-poster.jpg";
}


// =========================================================
// GET YEAR
// =========================================================
function getYear(content) {
    return content.releaseYear || "N/A";
}


// =========================================================
// GET RATING
// =========================================================
function getRating(content) {
    return content.rating ?? "N/A";
}


// =========================================================
// REMOVE FROM MY LIST
// =========================================================

function removeFromMyList(myListId) {
    fetch(`/api/my-list/${myListId}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to remove item");
        }
    })
    .then(() => {
        // Remove from frontend array
        myList = myList.filter(
                item => item.id !== myListId
            );
        // Refresh UI
        displayMyList();
    })
    .catch(error => {
        console.error("Error removing item:", error);
    });
}


// =========================================================
// FILTER BUTTONS
// =========================================================

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        currentFilter = button.dataset.type;
        displayMyList();
    });
});


// =========================================================
// SORT
// =========================================================

sortFilter.addEventListener("change", () => {
    currentSort = sortFilter.value;
    displayMyList();
});

loadMyList();