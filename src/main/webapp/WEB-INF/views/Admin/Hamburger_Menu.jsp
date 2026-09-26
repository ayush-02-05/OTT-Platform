<%@ page language = "java" %>

<div class="sidebar closed" id="sidebar">

    <!-- SIDEBAR HEADER -->
    <div class="sidebar-header">
        <h2>Cine<span>VAULT</span></h2>
        <button id="closeSidebar">
            <i class="fa-solid fa-bars"></i>
        </button>
    </div>


    <!-- MAIN MENU -->
    <nav class="sidebar-menu">
        <a href="/admin/dashboard" class="active" title="Home">
            <i class="fa-solid fa-house"></i>
            <span>Home</span>
        </a>

        <a href="/admin/movies" title="Movies">
            <i class="fa-solid fa-film"></i>
            <span>Movies</span>
        </a>

        <a href="/admin/series" title="Series">
            <i class="fa-solid fa-tv"></i>
            <span>Series</span>
        </a>

        <a href="/admin/users" title="Users">
            <i class="fa-solid fa-users"></i>
            <span>Users</span>
        </a>
    </nav>

    <!-- DIVIDER -->
    <div class="sidebar-divider"></div>


    <!-- ACCOUNT -->
    <p class="sidebar-title">ACCOUNT</p>

    <nav class="sidebar-menu">
        <a href="/admin/profile" title="Profile">
            <i class="fa-regular fa-user"></i>
            <span>Profile</span>
        </a>
    </nav>


    <!-- LOGOUT -->
    <a href="/logout" class="logout" title="Logout">
        <i class="fa-solid fa-right-from-bracket"></i>
        <span>Logout</span>
    </a>
</div>