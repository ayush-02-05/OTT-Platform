<%@ page language = "java" %>


<%@ page import="com.OTT_Platform.Model.Series" %>
<%@ page import="com.OTT_Platform.Model.Episode" %>
<%@ page import="com.OTT_Platform.Model.Season" %>
<%@ page import="java.util.List" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<html>
    <link rel="stylesheet" href="/CSS/Admin/Manage_Episodes.css">
    <link rel="stylesheet" href="/CSS/Admin/Hamburger_Menu.css">
    <link rel="stylesheet" href="/CSS/Style.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <body>
        <%@ include file="Hamburger_Menu.jsp" %>
        <% if (request.getAttribute("successMessage") != null) { %>

            <div id="success-message">
                <%= request.getAttribute("successMessage") %>
            </div>

        <% } %>


        

        <% 
            Series series = (Series)request.getAttribute("series");
            List<Episode> episodes = (List<Episode>) request.getAttribute("episodes");
        %>




        <div class="manage-episodes-page">
            <div class="episode-content">
                <div class="episode-header">
                    <div class="episode-title">
                        <h1>Manage Episodes</h1>
                        <p>View, edit, delete and add episodes for this series.</p>
                    </div>

                    <button type="button" onclick="window.location.href='/admin/dashboard/manageSeries'">
                        <i class="fa-solid fa-arrow-left"></i>
                        Back to Manage Series
                    </button>

                </div>

                <div class="series-info-card">

                    <div class="series-poster">
                        <img src="<%= series.getPosterURL() %>" alt="<%= series.getTitle() %>">
                    </div>

                    <div class="series-details">

                        <h2><%= series.getTitle() %></h2>

                        <div class="series-meta">
                            <span>Seasons: <%= series.getSeasons().size() %></span>
                            <span>|</span>
                            <span>Total Episodes: <%= episodes.size() %></span>
                            <span>|</span>
                            <span>Rating: <%= series.getRating() %></span>
                        </div>
                    </div>

                </div>
                

                <div class="seasons-container">
                    <% for(Season season : series.getSeasons()) { %>
                        <div class="season-section">

                            <div class="season-header">

                                <h3>Season <%= season.getSeasonNumber() %></h3>

                                <button type="button" class="add-episode-btn"
                                        data-season-id="<%= season.getSeasonId() %>">

                                    <i class="fa-solid fa-plus"></i>
                                    Add Episode

                                </button>

                            </div>

                            <div class="episodes-table">

                                <div class="episode-row episode-heading">
                                    <span>Episode</span>
                                    <span>Title</span>
                                    <span>Duration</span>
                                    <span>Actions</span>
                                </div>

                                <%
                                    boolean hasEpisodes = false;

                                    for (Episode episode : episodes) {
                                        if (episode.getSeason().getSeasonId() == season.getSeasonId()) {
                                            hasEpisodes = true;
                                            break;
                                        }
                                    }

                                    if (!hasEpisodes) {
                                %>

                                    <div class="no-episodes">
                                        No episodes added yet.
                                    </div>

                                <%
                                    }
                                %>

                                <% for (Episode episode : episodes) { 
                                    if (episode.getSeason().getSeasonId() == season.getSeasonId()) {
                                %>

                                        <div class="episode-row">

                                            <span> <%= episode.getEpisodeNumber() %></span>

                                            <span> <%= episode.getEpisodeTitle() %> </span>

                                            <span> <%= episode.getDuration() %> min </span>

                                            <span class="episode-actions">

                                                <button type="button"
                                                    class="edit-episode-btn"
                                                    data-episode-id="<%= episode.getEpisodeId() %>"
                                                    data-season-id="<%= episode.getSeason().getSeasonId() %>"
                                                    data-episode-number="<%= episode.getEpisodeNumber() %>"
                                                    data-duration="<%= episode.getDuration() %>"
                                                    data-episode-title="<%= episode.getEpisodeTitle() %>">

                                                    <i class="fa-solid fa-pen"></i>
                                                    Edit
                                                </button>

                                                <button type="button" class="delete-episode-btn" data-episode-id="<%= episode.getEpisodeId() %>">
                                                    <i class="fa-solid fa-trash"></i>
                                                    Delete
                                                </button>

                                            </span>

                                        </div>

                                <%
                                    }
                                }
                                %>
                            </div>

                        </div>

                    <% } %>

                </div>

            </div>



            <div class="add-episode-sidebar" id="addEpisodeSidebar">

                <div class="sidebar-header">
                    <h2 id="sidebarTitle">Add New Episode</h2>

                    <button type="button" id="closeSidebarBtn">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>


                <div class="sidebar-series-info">

                    <div class="sidebar-poster">
                        <img src="<%= series.getPosterURL() %>"
                            alt="<%= series.getTitle() %>">
                    </div>

                    <div class="sidebar-series-details">
                        <h3><%= series.getTitle() %></h3>

                        <p>
                            Seasons: <%= series.getSeasons().size() %>
                            |
                            <%= episodes.size() %> Episodes
                        </p>
                    </div>

                </div>


                <form:form id="addEpisodeForm" method="post" action="/admin/dashboard/manageEpisodes/<%= series.getSeriesId() %>/addEpisode" modelAttribute="episode">
                    <div class="form-group">
                        <label for="season">
                            Season <span>*</span>
                        </label>

                        <select id="season" name="seasonId" required>

                            <% for (Season season : series.getSeasons()) { %>

                                <option value="<%= season.getSeasonId() %>">
                                    Season <%= season.getSeasonNumber() %>
                                </option>

                            <% } %>

                        </select>

                    </div>


                    <div class="form-group">
                        <label for="episodeNumber">Episode Number <span>*</span></label>
                        <input type="number" id="episodeNumber" name="episodeNumber" min="1" required>
                        <form:errors path="episodeNumber" cssClass="error"/>
                    </div>


                    <div class="form-group">
                        <label for="duration">Duration (minutes) <span>*</span></label>
                        <input type="number" id="duration" name="duration" min="1" required>
                        <form:errors path="duration" cssClass="error"/>
                    </div>


                    <div class="form-group">
                        <label for="episodeTitle">Episode Title <span>*</span></label>
                        <input type="text" id="episodeTitle" name="episodeTitle" required>
                        <form:errors path="episodeTitle" cssClass="error"/>
                    </div>


                    <div class="sidebar-actions">
                        <button type="button" id="cancelEpisodeBtn">Cancel</button>
                        <button type="submit" id="saveEpisodeBtn">
                            <i class="fa-solid fa-floppy-disk"></i>
                            Save Episode
                        </button>
                    </div>
                </form:form>

            </div>

        </div>

        <script src="/JavaScript/Admin/Hamburger_Menu.js"></script>
        <script src="/JavaScript/Admin/manageEpisodes.js"></script>
    </body>
</html>