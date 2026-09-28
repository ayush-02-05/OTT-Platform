<%@ page language="java" %>
<%@ page import="com.OTT_Platform.Model.User" %>
<%@ page import="java.util.List" %>

<% List<User> users = (List<User>) request.getAttribute("users"); %>

<!DOCTYPE html>
<html>

    <head>
        <title>Manage Users - CineVAULT</title>
        <link rel="stylesheet" href="/CSS/Admin/Hamburger_Menu.css">
        <link rel="stylesheet" href="/CSS/Admin/manageUsers.css">
        <link rel="stylesheet" href="../CSS/header.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    </head>

    <body>
        <%@ include file="Hamburger_Menu.jsp" %>
        <div id="header-container"></div>
        <main class="users-page">
            <div class="page-heading">
                <h1>Manage Users</h1>
                <p>View and manage all registered users on the platform.</p>
            </div>

            <% String error = request.getParameter("error"); %>
            <% if ("selfDelete".equals(error)) { %>
                <div class="user-error">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    You cannot delete your own admin account.
                </div>
            <% } %>
            <div class="users-container">
                <div class="users-toolbar">
                    <div class="search-users">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="user-search" placeholder="Search users by name or email...">
                    </div>
                    <select id="role-filter">
                        <option value="ALL">All Roles</option>
                        <option value="USER">Users</option>
                        <option value="ADMIN">Admins</option>
                    </select>
                </div>
                <!-- USERS TABLE -->
                <div class="table-wrapper">
                    <table class="users-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="users-table-body">
                        <%
                            int count = 1;
                            if (users != null) {
                                for (User user : users) {
                        %>

                        <tr>
                            <td> <%= count++ %></td>
                            <td>
                                <div class="user-name">
                                    <div class="user-avatar">
                                        <%= user.getName().substring(0, 1).toUpperCase() %>
                                    </div>
                                    <span><%= user.getName() %></span>
                                </div>
                            </td>
                            <td><%= user.getEmail() %></td>
                            <td>
                                <% if (user.getRole().name().equals("ADMIN")) { %>
                                    <span class="role-badge admin"><i class="fa-solid fa-shield-halved"></i>ADMIN</span>
                                <% } else { %>
                                    <span class="role-badge user"><i class="fa-solid fa-user"></i>USER</span>
                                <% } %>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <button class="view-btn" onclick="viewUser(<%= user.getUserId() %>)">
                                        <i class="fa-solid fa-eye"></i>
                                        View
                                    </button>
                                    <button class="delete-btn" onclick="deleteUser(<%= user.getUserId() %>)">
                                        <i class="fa-solid fa-trash"></i>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <%
                                }
                            }
                        %>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

        <!-- User Details Modal -->

        <div class="user-modal-overlay" id="user-modal">
            <div class="user-modal">
                <div class="modal-header">
                    <h3>User Details</h3>
                    <button class="modal-close" onclick="closeUserModal()"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-body">
                    <div class="modal-avatar" id="modal-avatar">
                        P
                    </div>
                    <h3 id="modal-name">
                        Priya Modi
                    </h3>
                    <span class="modal-role" id="modal-role"><i class="fa-solid fa-user"></i>USER</span>
                    <div class="user-details">
                        <div class="detail-row">
                            <span>User ID</span>
                            <strong id="modal-user-id"></strong>
                        </div>

                        <div class="detail-row">
                            <span>Name</span>
                            <strong id="modal-user-name"></strong>
                        </div>

                        <div class="detail-row">
                            <span>Email</span>
                            <strong id="modal-email"></strong>
                        </div>

                        <div class="detail-row">
                            <span>Role</span>
                            <strong id="modal-user-role"></strong>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="modal-delete-btn" id="modal-delete-btn">
                        <i class="fa-solid fa-trash"></i>
                        Delete User
                    </button>

                    <button class="modal-close-btn" onclick="closeUserModal()">
                        Close
                    </button>
                </div>
            </div>
        </div>
        <script src="/JavaScript/Admin/manageUsers.js"></script>
        <script src="/JavaScript/Admin/Hamburger_Menu.js"></script>
        <script src="../JavaScript/header.js"></script>
    </body>
</html>