const searchInput = document.getElementById("user-search");
const roleFilter = document.getElementById("role-filter");

const rows = document.querySelectorAll("#users-table-body tr");


/* ================================
   SEARCH + ROLE FILTER
================================ */

function filterUsers() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const selectedRole =
        roleFilter.value;

    rows.forEach(row => {

        const name =
            row.querySelector(".user-name span")
                ?.textContent
                .toLowerCase() || "";

        const email =
            row.cells[2]
                ?.textContent
                .toLowerCase() || "";

        const role =
            row.querySelector(".role-badge")
                ?.textContent
                .trim()
                .toUpperCase() || "";

        const matchesSearch =
            name.includes(searchText) ||
            email.includes(searchText);

        const matchesRole =
            selectedRole === "ALL" ||
            role.includes(selectedRole);

        row.style.display =
            matchesSearch && matchesRole
                ? ""
                : "none";
    });
}


searchInput.addEventListener("input", filterUsers);
roleFilter.addEventListener("change", filterUsers);


/* ================================
   VIEW USER
================================ */

function viewUser(userId) {

    const row = [...rows].find(row => {

        const button = row.querySelector(".view-btn");

        return button &&
               button.getAttribute("onclick")
                   .includes(`viewUser(${userId})`);
    });

    if (!row) {
        return;
    }

    const name =
        row.querySelector(".user-name span")
            .textContent
            .trim();

    const email =
        row.cells[2]
            .textContent
            .trim();

    const role =
        row.querySelector(".role-badge")
            .textContent
            .trim()
            .replace(/\s+/g, " ");

    document.getElementById("modal-avatar")
        .textContent = name.charAt(0).toUpperCase();

    document.getElementById("modal-name")
        .textContent = name;

    document.getElementById("modal-user-id")
        .textContent = userId;

    document.getElementById("modal-user-name")
        .textContent = name;

    document.getElementById("modal-email")
        .textContent = email;

    document.getElementById("modal-user-role")
        .textContent = role;

    document.getElementById("modal-role")
        .innerHTML =
        `<i class="fa-solid fa-user"></i> ${role}`;


    document.getElementById("modal-delete-btn")
        .onclick = function () {
            deleteUser(userId);
        };


    document.getElementById("user-modal")
        .classList.add("show");
}


/* ================================
   CLOSE MODAL
================================ */

function closeUserModal() {

    document.getElementById("user-modal")
        .classList.remove("show");
}


/* ================================
   OUTSIDE CLICK
================================ */

document
    .getElementById("user-modal")
    .addEventListener("click", function (event) {

        if (event.target === this) {
            closeUserModal();
        }
    });


/* ================================
   DELETE USER
================================ */

function deleteUser(userId) {

    const confirmDelete =
        confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) {
        return;
    }

    const form =
        document.createElement("form");

    form.method = "POST";
    form.action = `/admin/users/delete/${userId}`;

    document.body.appendChild(form);

    form.submit();
}

/* ================================
   AUTO HIDE ERROR MESSAGE
================================ */

const errorMessage = document.querySelector(".user-error");

if (errorMessage) {

    setTimeout(() => {

        errorMessage.classList.add("hide");

        setTimeout(() => {
            errorMessage.remove();
        }, 400);

    }, 3000);
}