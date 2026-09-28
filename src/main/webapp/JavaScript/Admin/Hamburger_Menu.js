const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

closeSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("closed");
});


const links = sidebar.querySelectorAll(".sidebar-menu a");
const currentPath = window.location.pathname;
links.forEach(link => {
    link.classList.remove("active");
    const linkPath = new URL(link.href).pathname;

    if (linkPath === currentPath) {
        link.classList.add("active");
    }
});