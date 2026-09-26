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


        // ==================== ACTIVE PAGE ====================

        const links = sidebar.querySelectorAll(".sidebar-menu a");

        const currentPath = window.location.pathname;

        links.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#") {
                return;
            }

            const linkPath = new URL(link.href).pathname;

            if (linkPath === currentPath) {
                link.classList.add("active");
            }

        });

    });