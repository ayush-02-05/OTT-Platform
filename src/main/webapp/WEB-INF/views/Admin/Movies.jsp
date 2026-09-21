<%@ page language = "java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.OTT_Platform.Model.Movie" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<html>
    <head>
        <link rel="stylesheet" href="/CSS/Admin/Movies.css">
        <link rel="stylesheet" href="/CSS/Admin/Hamburger_Menu.css">
        <link rel="stylesheet" href="/CSS/Style.css">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    </head>
    
    <body>
        <%@ include file="Hamburger_Menu.jsp" %>
        <div class="movie-page">

            <div class="movie-header">
                <div>
                    <h1>Manage Movies</h1>
                    <p>Add, edit or delete movies from the platform.</p>
                </div>
                <button type="button" class="add-movie-btn" id="openAddMovie">
                    <i class="fa-solid fa-plus"></i>
                    Add Movie
                </button>
            </div>
            
            <div class="movie-controls">
                <div class="search-box">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text"id="moviesSearch" placeholder="Search movies...">
                </div>

                <div class="genre-filter">
                    <select id="genreFilter">
                        <option value="">All Genres</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Thriller">Thriller</option>
                    </select>
                </div>

            </div>


            <div class="movie-table-container">

                <table class="movie-table">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>Release Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        <%
                            List<Movie> movies = (List<Movie>) request.getAttribute("movies");
                            for (Movie movie : movies) {
                        %>
                            <tr>
                                <td><%= movie.getMovieId() %></td>
                                <td><img src="<%= movie.getPosterURL() %>"class="movie-poster"></td>
                                <td><%= movie.getTitle() %></td>
                                <td><%= movie.getGenre() %></td>
                                <td>
                                    <span class="movie-rating">
                                        <i class="fa-solid fa-star"></i>
                                        <%= movie.getRating() %>
                                    </span>
                                </td>
                                <td><%= movie.getReleaseYear() %></td>
                                <td>
                                    <div class="movie-actions">

                                        <button type="button"
                                                class="edit-btn"
                                                data-movie-id="<%= movie.getMovieId() %>"
                                                data-title="<%= movie.getTitle() %>"
                                                data-genre="<%= movie.getGenre() %>"
                                                data-rating="<%= movie.getRating() %>"
                                                data-release-year="<%= movie.getReleaseYear() %>"
                                                data-synopsis="<%= movie.getSynopsis() %>"
                                                data-poster-url="<%= movie.getPosterURL() %>">
                                            <i class="fa-solid fa-pen"></i>
                                            Edit
                                        </button>

                                        <button type="button" class="delete-btn" data-movie-id="<%= movie.getMovieId() %>">
                                            <i class="fa-solid fa-trash"></i>
                                            Delete
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        <%
                            }
                        %>
                        </tbody>
                </table>
            </div>
        </div>


        





        <div class="add-movie-drawer">

            <div class="drawer-header">
                <div>
                    <h2 id="drawerTitle">Add Movie</h2>
                    <p>Add a new movie to the platform.</p>
                </div>

                <button type="button" class="close-drawer">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="drawer-form">

                <form:form action="/admin/dashboard/movies" method="post" modelAttribute="movie">
                    <input type="hidden" id="movieId" name="movieId">
                    <div class="form-group">
                        <label for="movieTitle">Movie Title</label>
                        <input type="text" id="movieTitle" name="title" placeholder="Enter movie title">
                        <form:errors path="title"/>
                    </div>

                    <div class="form-group">

                        <label for="movieGenre">Genre</label>
                        <select id="movieGenre" name="genre">
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Thriller">Thriller</option>
                        </select>
                        <form:errors path="genre"/>
                    </div>

                    <div class="form-group">
                        <label for="movieRating">Rating</label>
                        <input type="number" id="movieRating"name="rating" min="0" max="10" step="0.1" placeholder="Enter rating (0 - 10)" required>
                        <form:errors path="rating"/>
                    </div>

                    <div class="form-group">
                        <label for="releaseYear">Release Year</label>
                        <input type="number"id="releaseYear" name="releaseYear" min="1900" max="2030" placeholder="Enter release year" required>
                        <form:errors path="releaseYear"/>
                    </div>

                    <div class="form-group">
                        <label for="movieSynopsis">Synopsis</label>
                        <textarea id="movieSynopsis" name="synopsis" placeholder="Write a brief synopsis about the movie..." rows="5" required></textarea>
                        <form:errors path="synopsis"/>
                    </div>

                    <div class="form-group">
                        <label for="moviePoster">Movie Poster URL</label>
                        <input type="text" id="moviePoster" name="posterURL" placeholder="Enter poster image URL" required>
                        <form:errors path="posterURL"/>
                    </div>

                    <div class="drawer-actions">
                        <button type="reset" class="reset-btn">Reset</button>
                        <button type="submit" class="save-movie-btn" id="drawerSubmit">Add Movie</button>
                    </div>
                </form:form>

            </div>

        </div>


        <script src="/JavaScript/Admin/Movies.js"></script>
        <script src="/JavaScript/Admin/Hamburger_Menu.js"></script>
    </body>
</html>