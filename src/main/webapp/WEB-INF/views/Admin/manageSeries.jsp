<%@ page language = "java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.OTT_Platform.Model.Season" %>
<%@ page import="com.OTT_Platform.Model.Series" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<html>
    <link rel="stylesheet" href="/CSS/Admin/Manage_Series.css">
    <link rel="stylesheet" href="/CSS/Admin/Hamburger_Menu.css">
    <link rel="stylesheet" href="/CSS/Style.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <body>

        <%@ include file="Hamburger_Menu.jsp" %>

        <div class="manage-series">
            <div class="series-header">
                <div>
                    <h1>Manage Series</h1>
                    <p>Add, edit or delete series from the platform.</p>
                </div>
                <button type="button" class="add-series-btn" id="openAddSeries">
                    <i class="fa-solid fa-plus"></i>
                    Add Series
                </button>
            </div>

            <div class="series-controls">
                <div class="search-box">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text"id="seriesSearch" placeholder="Search series...">
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

            <div class="series-table-container">
                <table class="series-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>Seasons</th>
                            <th>Episodes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <%
                            List<Series> seriesList = (List<Series>) request.getAttribute("seriesList");
                            for (Series series : seriesList) {
                        %>
                            <tr>
                                <td><%= series.getSeriesId() %></td>
                                <td><img src="<%= series.getPosterURL() %>"alt="<%= series.getTitle() %>"class="series-poster"></td>
                                <td><%= series.getTitle() %></td>
                                <td><%= series.getGenre() %></td>
                                <td>
                                    <span class="series-rating">
                                        <i class="fa-solid fa-star"></i>
                                        <%= series.getRating() %>
                                    </span>
                                </td>
                                <td><%= series.getSeasons().size() %></td>
                                <td>
                                    <%
                                        int episodeCount = 0;
                                        if (series.getSeasons() != null) {
                                            for (Season season : series.getSeasons()) {
                                                if (season.getEpisodes() != null) {
                                                    episodeCount +=season.getEpisodes().size();
                                                }
                                            }
                                        }
                                    %>
                                    <%= episodeCount %>
                                </td>
                                <td>
                                    <div class="series-actions">
                                        <button type="button" class="edit-btn"
                                                data-series-id="<%= series.getSeriesId() %>"
                                                data-title="<%= series.getTitle() %>"
                                                data-genre="<%= series.getGenre() %>"
                                                data-rating="<%= series.getRating() %>"
                                                data-synopsis="<%= series.getSynopsis() %>"
                                                data-poster-url="<%= series.getPosterURL() %>"
                                                data-season-release-years="<%
                                                    for (int i = 0; i < series.getSeasons().size(); i++) {
                                                        if (i > 0) out.print(",");
                                                        out.print(series.getSeasons().get(i).getReleaseYear());
                                                    }
                                                %>">
                                            <i class="fa-solid fa-pen"></i>
                                            Edit
                                        </button>
                                        <button type="button" class="delete-btn"data-series-id="<%= series.getSeriesId() %>">
                                            <i class="fa-solid fa-trash"></i>
                                            Delete
                                        </button>
                                        <a href="/admin/episodes/<%= series.getSeriesId() %>" class="episodes-btn">
                                            <i class="fa-solid fa-list"></i>
                                        </a>
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

        <div class="add-series-drawer">
            <div class="drawer-header">
                <div>
                    <h2 id="drawerTitle">Add Series</h2>
                    <p id="drawerDescription">Add a new series to the platform.</p>
                </div>
                <button type="button"class="close-drawer">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="drawer-form">
                <form:form action="/dashboard/manageSeries" method="post" modelAttribute="series">
                    <input type="hidden" id="seriesId" name="seriesId">
                    <div class="form-group">
                        <label for="seriesTitle"> Series Title </label>
                        <input type="text" id="seriesTitle" name="title" placeholder="Enter series title" required>
                        <form:errors path="title" cssClass="error"/>
                    </div>

                    <div class="form-group">
                        <label for="seriesGenre">Genre</label>
                        <select id="seriesGenre" name="genre" required>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Biography">Biography</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Romance">Romance</option>
                        </select>
                        <form:errors path="genre" cssClass="error"/>
                    </div>

                    <div class="form-group">
                        <label for="seriesRating"> Rating </label>
                        <input type="number" id="seriesRating" name="rating" min="0" max="10" step="0.1" placeholder="Enter rating (0 - 10)" required>
                        <form:errors path="rating" cssClass="error"/>
                    </div>
                    <div class="form-group">
                        <label for="numberOfSeasons">Number of Seasons</label>
                        <input type="number" id="numberOfSeasons"name="numberOfSeasons" min="1" placeholder="Enter number of seasons" required>
                        <%
                            String seasonError = (String) request.getAttribute("seasonError");
                            if (seasonError != null) {
                        %>
                            <span class="error"><%= seasonError %></span>
                        <%
                            }
                        %>
                    </div>

                    <div id="season-details"></div>

                    <div class="form-group">
                        <label for="seriesSynopsis"> Synopsis </label>
                        <textarea id="seriesSynopsis" name="synopsis" placeholder="Write a brief synopsis about the series..." rows="5" required></textarea>
                        <form:errors path="synopsis" cssClass="error"/>
                    </div>
                    <div class="form-group">
                        <label for="seriesPoster">Series Poster URL</label>
                        <input type="text" id="seriesPoster"name="posterURL" placeholder="Enter poster image URL" required>
                        <form:errors path="posterURL" cssClass="error"/>
                    </div>
                    <div class="drawer-actions">
                        <button type="reset" class="reset-btn">Reset </button>
                        <button type="submit" class="save-series-btn"id="drawerSubmit"> Add Series </button>
                    </form:form>
                </form>
            </div>
        </div>


        <script src="/JavaScript/Admin/manageSeries.js"></script>
        <script src="/JavaScript/Admin/Hamburger_Menu.js"></script>

    </body>
</html>