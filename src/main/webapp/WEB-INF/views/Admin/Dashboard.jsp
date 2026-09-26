<%@ page language = "java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.OTT_Platform.Model.Movie" %>
<%@ page import="com.OTT_Platform.Model.Series" %>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="/CSS/Admin/Hamburger_Menu.css">
        <link rel="stylesheet" href="/CSS/Style.css">
        <link rel="stylesheet" href="/CSS/Admin/Dashboard.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    </head>
    
    <body>
        <%@ include file="Hamburger_Menu.jsp" %>

        <div class="dashboard">
            <div class="dashboard-header">
                <div class="header-content">
                    <h1>Dashboard</h1>
                    <p>Welcome back, Admin!</p>
                </div>

                <div class="current-date">
                    <%= java.time.ZonedDateTime.now(java.time.ZoneId.of("Asia/Kolkata"))
                        .format(java.time.format.DateTimeFormatter.ofPattern("EEEE, dd MMMM yyyy")) %>
                </div>
            </div>


            <div class="stats">

                <div class="total-movies">
                    <div class="stat-icon">
                        <i class="fa-solid fa-film"></i>
                    </div>

                    <div class="stat-details">
                        <p>Total Movies</p>
                        <h2>${totalMovies}</h2>
                    </div>
                </div>

                <div class="total-series">
                    <div class="stat-icon">
                        <i class="fa-solid fa-tv"></i>
                    </div>

                    <div class="stat-details">
                        <p>Total Series</p>
                        <h2>${totalSeries}</h2>
                    </div>

                </div>
                <div class="total-users">
                    <div class="stat-icon">
                        <i class="fa-solid fa-users"></i>
                    </div>

                    <div class="stat-details">
                        <p>Total Users</p>
                        <h2>${totalUsers}</h2>
                    </div>
                </div>

                <div class="total-episodes">
                    <div class="stat-icon">
                        <i class="fa-solid fa-circle-play"></i>
                    </div>

                    <div class="stat-details">
                        <p>Total Episodes</p>
                        <h2>${totalEpisodes}</h2>
                    </div>
                </div>

            </div>


            <div class="recent-content">

                <div class="recent-movie">
                    <div class="section-header">
                        <h2>Recent Movies</h2>
                        <a href="/admin/movies">View All</a>
                    </div>

                    <div class="movie-list">
                        <%
                            List<Movie> recentMovies = (List<Movie>) request.getAttribute("recentMovies");

                            for (Movie movie : recentMovies) {
                        %>

                            <div class="movie-item">
                                <div class="movie-poster">
                                    <img src="<%= movie.getPosterURL() %>" alt="<%= movie.getTitle() %>">
                                </div>

                                <div class="movie-info">
                                    <h3><%= movie.getTitle() %></h3>
                                    <p><%= movie.getReleaseYear() %></p>
                                </div>

                                <div class="movie-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <span><%= movie.getRating() %></span>
                                </div>
                            </div>
                        <%
                            }
                        %>

                    </div>
                    
                </div>

                <div class="recent-series">

                    <div class="section-header">
                        <h2>Recent Series</h2>
                        <a href="/admin/series">View All</a>
                    </div>

                    <div class="series-list">

                        <%
                            List<Series> recentSeries = (List<Series>) request.getAttribute("recentSeries");
                            for (Series series : recentSeries) {
                        %>

                            <div class="series-item">

                                <div class="series-poster">
                                    <img src="<%= series.getPosterURL() %>"
                                        alt="<%= series.getTitle() %>">
                                </div>

                                <div class="series-info">
                                    <h3><%= series.getTitle() %></h3>
                                </div>

                                <div class="series-episodes">
                                    <i class="fa-solid fa-layer-group"></i>
                                    <span><%= series.getSeasons().size() %> Seasons</span>
                                </div>

                            </div>

                        <%
                            }
                        %>
                    </div>
                </div>
            </div>
            
        </div>
        
        <script src="/JavaScript/Admin/Hamburger_Menu.js"></script>
        <script src="/JavaScript/Admin/Dashboard.js"></script>
    </body>
</html>