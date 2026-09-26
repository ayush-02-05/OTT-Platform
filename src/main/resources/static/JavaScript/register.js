const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirm-password").value;

    const message =
        document.getElementById("message");


    if (password !== confirmPassword) {

        message.textContent = "Passwords do not match";

        return;
    }


    fetch("/api/user/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })

    })
    .then(async response => {

        const messageText = await response.text();

        if (!response.ok) {
            throw new Error(messageText);
        }

        return messageText;
    })
    .then(data => {
        console.log("Registration successful:", data);
        message.textContent =
            "Registration successful!";

        setTimeout(() => {
            window.location.href = "/login";
        }, 1000);

    })
    .catch(error => {

        console.error("Registration error:", error);

        message.textContent = error.message;

    });

});