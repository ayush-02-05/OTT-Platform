const sidebarContainer = document.querySelector("#sidebar-container");

fetch("../HTML/sidebar.html")
    .then(response => response.text())
    .then(data => {

        sidebarContainer.innerHTML = data;

        const sidebar = document.querySelector("#sidebar");
        const closeSidebar = document.querySelector("#closeSidebar");

        closeSidebar.addEventListener("click", () => {
            sidebar.classList.toggle("closed");
        });

    });