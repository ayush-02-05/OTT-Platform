// ==================== LOAD HEADER ====================

fetch("/HTML/header.html")

    .then(response => response.text())

    .then(data => {

        document.getElementById("header-container").innerHTML = data;


        // ====================
        // SEARCH
        // ====================

        const searchInput =
            document.getElementById("search-input");

        const searchResults =
            document.getElementById("search-results");

        const searchClear =
            document.querySelector(".search-clear");


        searchInput.addEventListener("input", () => {

            const query =
                searchInput.value.trim();

            if (query.length === 0) {

                searchResults.innerHTML = "";
                searchResults.style.display = "none";

                return;
            }

            fetch(
                `/api/search?query=${encodeURIComponent(query)}`
            )

                .then(response => response.json())

                .then(data => {

                    searchResults.innerHTML = "";


                    // ====================
                    // MOVIES
                    // ====================

                    data.movies.forEach(movie => {

                        const result =
                            document.createElement("div");

                        result.className =
                            "search-result";

                        result.innerHTML = `

                            <img
                                src="${movie.posterURL}"
                                alt="${movie.title}"
                            >

                            <div class="search-result-info">

                                <h4>
                                    ${movie.title}
                                </h4>

                                <p>
                                    Movie •
                                    ${movie.releaseYear} •
                                    ⭐ ${movie.rating}
                                </p>

                            </div>

                        `;

                        result.addEventListener(
                            "click",
                            () => {

                                window.location.href =
                                    `/movies/${movie.movieId}`;

                            }
                        );

                        searchResults.appendChild(result);

                    });


                    // ====================
                    // SERIES
                    // ====================

                    data.series.forEach(series => {

                        const result =
                            document.createElement("div");

                        result.className =
                            "search-result";

                        result.innerHTML = `

                            <img
                                src="${series.posterURL}"
                                alt="${series.title}"
                            >

                            <div class="search-result-info">

                                <h4>
                                    ${series.title}
                                </h4>

                                <p>
                                    Series •
                                    ⭐ ${series.rating}
                                </p>

                            </div>

                        `;

                        result.addEventListener(
                            "click",
                            () => {

                                window.location.href =
                                    `/series/${series.seriesId}`;

                            }
                        );

                        searchResults.appendChild(result);

                    });


                    // ====================
                    // SHOW / HIDE RESULTS
                    // ====================

                    if (
                        searchResults.children.length > 0
                    ) {

                        searchResults.style.display =
                            "block";

                    } else {

                        searchResults.style.display =
                            "none";

                    }

                })

                .catch(error => {

                    console.error(
                        "Search error:",
                        error
                    );

                });

        });


        // ====================
        // CLEAR SEARCH
        // ====================

        searchClear.addEventListener(
            "click",
            () => {

                searchInput.value = "";

                searchResults.innerHTML = "";

                searchResults.style.display =
                    "none";

                searchInput.focus();

            }
        );


        // ====================
        // PROFILE
        // ====================

        const profile =
            document.getElementById("profile");


        // ====================
        // LOAD CURRENT USER
        // ====================

        fetch("/api/user/me")

            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        "Failed to load user"
                    );
                }

                return response.json();

            })

            .then(user => {

                const profileImage =
                    document.querySelector(
                        ".profile-image"
                    );

                const username =
                    document.querySelector(
                        ".username"
                    );


                // ====================
                // USERNAME
                // ====================

                username.textContent =
                    user.name;


                // ====================
                // PROFILE INITIAL
                // ====================

                if (user.name) {

                    profileImage.textContent =
                        user.name
                            .charAt(0)
                            .toUpperCase();

                }

            })

            .catch(error => {

                console.error(
                    "User profile error:",
                    error
                );

            });

    })

    .catch(error => {

        console.error(
            "Error loading header:",
            error
        );

    });