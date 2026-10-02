fetch("/HTML/header.html")
    .then(response => {
        if (!response.ok) throw new Error("Header load failed");
        return response.text();
    })
    .then(html => {
        document.getElementById("header-container").innerHTML = html;

        const searchInput = document.getElementById("search-input");
        const searchResults = document.getElementById("search-results");
        const searchClear = document.querySelector(".search-clear");

        if (window.location.pathname.startsWith("/admin")) {
            document.querySelector("#header-container .search-box")
                ?.remove();
        }

        // SEARCH
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.trim();

            searchClear.style.display = query ? "block" : "none";

            if (!query) {
                searchResults.innerHTML = "";
                searchResults.style.display = "none";
                return;
            }

            fetch(`/api/search?query=${encodeURIComponent(query)}`)
                .then(response => {
                    if (!response.ok) throw new Error("Search failed");
                    return response.json();
                })
                .then(data => {
                    // Ignore results for an older search
                    if (searchInput.value.trim() !== query) return;

                    searchResults.innerHTML = "";

                    data.movies.forEach(movie => {
                        const result = document.createElement("div");
                        result.className = "search-result";
                        result.innerHTML = `
                            <img src="${movie.posterURL}" alt="">
                            <div class="search-result-info">
                                <h4>${movie.title}</h4>
                                <p>Movie • ${movie.releaseYear} • ⭐ ${movie.rating}</p>
                            </div>
                        `;

                        result.addEventListener("click", () => {
                            window.location.href = `/movies/${movie.movieId}`;
                        });

                        searchResults.appendChild(result);
                    });

                    data.series.forEach(series => {
                        const result = document.createElement("div");
                        result.className = "search-result";
                        result.innerHTML = `
                            <img src="${series.posterURL}" alt="">
                            <div class="search-result-info">
                                <h4>${series.title}</h4>
                                <p>Series • ⭐ ${series.rating}</p>
                            </div>
                        `;

                        result.addEventListener("click", () => {
                            window.location.href = `/series/${series.seriesId}`;
                        });

                        searchResults.appendChild(result);
                    });

                    searchResults.style.display =
                        searchResults.children.length ? "block" : "none";
                })
                .catch(error => console.error("Search error:", error));
        });

        // CLEAR SEARCH
        searchClear.addEventListener("click", () => {
            searchInput.value = "";
            searchClear.style.display = "none";
            searchResults.innerHTML = "";
            searchResults.style.display = "none";
            searchInput.focus();
        });

        // LOAD USER PROFILE
        fetch("/api/user/me")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load user");
                return response.json();
            })
            .then(user => {
                const profileImage = document.querySelector(".profile-image");
                const username = document.querySelector(".username");

                username.textContent = user.name || "";

                if (user.name) {
                    profileImage.textContent = user.name.charAt(0).toUpperCase();
                }
            })
            .catch(error => console.error("User profile error:", error));
    })
    .catch(error => console.error("Header load error:", error));