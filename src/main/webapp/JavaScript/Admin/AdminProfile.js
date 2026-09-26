const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const profileInitial = document.getElementById("profile-initial");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

const saveProfileButton = document.getElementById("save-profile-btn");
const cancelButton = document.getElementById("cancel-btn");

const profileInfoButton = document.getElementById("profile-info-btn");
const changePasswordButton = document.getElementById("change-password-btn");
const myListButton = document.getElementById("my-list-btn");
const logoutButton = document.getElementById("logout-btn");

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


/* =========================
   LOAD PROFILE
========================= */

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

            profileInitial.textContent =
                user.name.charAt(0).toUpperCase();

            nameInput.value = user.name;
            emailInput.value = user.email;
        })
        .catch(error => {
            console.error(error);
        });
}


/* =========================
   PROFILE INFORMATION
========================= */

profileInfoButton.addEventListener("click", () => {

    profileInfoButton.classList.add("active");
    changePasswordButton.classList.remove("active");

    profileInformation.style.display = "block";
    changePasswordSection.style.display = "none";
});


/* =========================
   CHANGE PASSWORD
========================= */

changePasswordButton.addEventListener("click", () => {

    changePasswordButton.classList.add("active");
    profileInfoButton.classList.remove("active");

    profileInformation.style.display = "none";
    changePasswordSection.style.display = "block";
});


/* =========================
   SAVE PROFILE
========================= */

saveProfileButton.addEventListener("click", () => {

    const updatedProfile = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
    };

    if (!updatedProfile.name || !updatedProfile.email) {
        alert("Name and email cannot be empty");
        return;
    }

    fetch("/api/user/me", {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(updatedProfile)
    })
    .then(response => {

        if (!response.ok) {
            return response.text().then(message => {
                throw new Error(message);
            });
        }

        return response.json();
    })
    .then(user => {

        profileName.textContent = user.name;
        profileEmail.textContent = user.email;

        profileInitial.textContent =
            user.name.charAt(0).toUpperCase();

        nameInput.value = user.name;
        emailInput.value = user.email;

        alert("Profile updated successfully");
    })
    .catch(error => {

        alert(error.message);
    });
});


/* =========================
   CANCEL PROFILE EDIT
========================= */

cancelButton.addEventListener("click", () => {

    loadProfile();
});


/* =========================
   CANCEL PASSWORD
========================= */

cancelPasswordButton.addEventListener("click", () => {

    currentPasswordInput.value = "";
    newPasswordInput.value = "";
    confirmPasswordInput.value = "";

    profileInfoButton.click();
});


/* =========================
   CHANGE PASSWORD SUBMIT
========================= */

changePasswordSubmit.addEventListener("click", () => {

    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert("Please fill all password fields");
        return;
    }

    if (newPassword.length < 8) {
        alert("Password must be at least 8 characters");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match");
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
                throw new Error(message);
            });
        }

        return response.text();
    })
    .then(message => {

        alert(message);

        currentPasswordInput.value = "";
        newPasswordInput.value = "";
        confirmPasswordInput.value = "";

        profileInfoButton.click();
    })
    .catch(error => {

        alert(error.message);
    });
});


/* =========================
   MY LIST
========================= */

myListButton.addEventListener("click", () => {

    window.location.href = "/MyList";
});


/* =========================
   LOGOUT
========================= */

logoutButton.addEventListener("click", () => {

    fetch("/logout", {
        method: "POST"
    })
    .then(() => {

        window.location.href = "/login";
    })
    .catch(() => {

        window.location.href = "/login";
    });
});


/* =========================
   INITIAL LOAD
========================= */

loadProfile();