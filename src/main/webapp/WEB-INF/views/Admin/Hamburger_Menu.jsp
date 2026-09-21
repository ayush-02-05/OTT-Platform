<%@ page language = "java" %>

<div class="hamburger button">
    <i class="fa-solid fa-bars"></i>
</div>
<div class="menu" id="menu">
    <div class="head">
        <H3>Hi, Admin</H3>
        <i class="fa-solid fa-xmark closeMenu button" id="closeMenu"></i>
    </div>
        
    <a href="/admin/dashboard" class="button">Home</a>

    <a href="/admin/dashboard/movies" class="button">Movies</a>
    <a href="/admin/dashboard/manageSeries" class="button">Series</a>

    <a href="#" class="button">About</a>
    <a href="#" class="button">Logout</a>
</div>