// ====================
// PROFILE ELEMENTS
// ====================

const profileName =
    document.getElementById("profile-name");

const profileEmail =
    document.getElementById("profile-email");

const profileInitial =
    document.getElementById("profile-initial");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const saveButton =
    document.getElementById("save-profile-btn");

const cancelButton =
    document.getElementById("cancel-btn");

const myListButton =
    document.getElementById("my-list-btn");

const logoutButton =
    document.getElementById("logout-btn");

const profileInfoButton =
    document.getElementById("profile-info-btn");

const changePasswordButton =
    document.getElementById("change-password-btn");

const profileInformation =
    document.getElementById("profile-information");

const changePasswordSection =
    document.getElementById("change-password-section");

const cancelPasswordButton =
    document.getElementById("cancel-password-btn");

const currentPasswordInput =
    document.getElementById("current-password");

const newPasswordInput =
    document.getElementById("new-password");

const confirmPasswordInput =
    document.getElementById("confirm-password");

const changePasswordSubmit =
    document.getElementById("change-password-submit");


// ====================
// LOAD CURRENT USER
// ====================

function loadProfile() {

    fetch("/api/user/me")
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load profile");
            }

            return response.json();
        })
        .then(user => {

            profileName.textContent = user.name;
            profileEmail.textContent = user.email;

            nameInput.value = user.name;
            emailInput.value = user.email;

            if (user.name) {
                profileInitial.textContent =
                    user.name.charAt(0).toUpperCase();
            }
        })
        .catch(error => {
            console.error("Profile error:", error);
        });
}


// ====================
// SAVE PROFILE
// ====================

saveButton.addEventListener("click", () => {

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name === "") {
        alert("Name cannot be empty");
        return;
    }

    if (email === "") {
        alert("Email cannot be empty");
        return;
    }

    fetch("/api/user/me", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email
        })
    })
    .then(response => {

        if (!response.ok) {
            return response.text().then(message => {
                throw new Error(
                    message || "Failed to update profile"
                );
            });
        }

        return response.json();
    })
    .then(user => {

        profileName.textContent = user.name;
        profileEmail.textContent = user.email;

        nameInput.value = user.name;
        emailInput.value = user.email;

        if (user.name) {
            profileInitial.textContent =
                user.name.charAt(0).toUpperCase();
        }

        alert("Profile updated successfully");
    })
    .catch(error => {

        console.error(
            "Update profile error:",
            error
        );

        alert(error.message);
    });
});


// ====================
// CANCEL PROFILE
// ====================

cancelButton.addEventListener("click", () => {
    loadProfile();
});


// ====================
// PROFILE INFORMATION
// ====================

profileInfoButton.addEventListener("click", () => {

    profileInformation.style.display = "block";
    changePasswordSection.style.display = "none";

    profileInfoButton.classList.add("active");
    changePasswordButton.classList.remove("active");
});


// ====================
// CHANGE PASSWORD SECTION
// ====================

changePasswordButton.addEventListener("click", () => {

    profileInformation.style.display = "none";
    changePasswordSection.style.display = "block";

    changePasswordButton.classList.add("active");
    profileInfoButton.classList.remove("active");
});


// ====================
// CANCEL PASSWORD
// ====================

cancelPasswordButton.addEventListener("click", () => {

    currentPasswordInput.value = "";
    newPasswordInput.value = "";
    confirmPasswordInput.value = "";

    profileInformation.style.display = "block";
    changePasswordSection.style.display = "none";

    profileInfoButton.classList.add("active");
    changePasswordButton.classList.remove("active");
});


// ====================
// CHANGE PASSWORD
// ====================

changePasswordSubmit.addEventListener("click", () => {

    const currentPassword =
        currentPasswordInput.value.trim();

    const newPassword =
        newPasswordInput.value.trim();

    const confirmPassword =
        confirmPasswordInput.value.trim();


    if (currentPassword === "") {
        alert("Enter your current password");
        return;
    }

    if (newPassword === "") {
        alert("Enter a new password");
        return;
    }

    if (confirmPassword === "") {
        alert("Confirm your new password");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("New passwords do not match");
        return;
    }

    if (newPassword === currentPassword) {
        alert(
            "New password must be different from current password"
        );
        return;
    }


    fetch("/api/user/change-password", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword
        })
    })
    .then(response => {

        if (!response.ok) {
            return response.text().then(message => {
                throw new Error(
                    message || "Failed to change password"
                );
            });
        }

        return response.text();
    })
    .then(message => {

        alert(message);

        currentPasswordInput.value = "";
        newPasswordInput.value = "";
        confirmPasswordInput.value = "";

        profileInformation.style.display = "block";
        changePasswordSection.style.display = "none";

        profileInfoButton.classList.add("active");
        changePasswordButton.classList.remove("active");
    })
    .catch(error => {

        console.error(
            "Change password error:",
            error
        );

        alert(error.message);
    });
});


// ====================
// MY LIST
// ====================

myListButton.addEventListener("click", () => {
    window.location.href = "/MyList";
});


// ====================
// LOGOUT
// ====================

logoutButton.addEventListener("click", () => {

    fetch("/logout", {
        method: "POST"
    })
    .then(() => {
        window.location.href = "/login";
    })
    .catch(error => {

        console.error(
            "Logout error:",
            error
        );

        window.location.href = "/login";
    });
});


loadProfile();