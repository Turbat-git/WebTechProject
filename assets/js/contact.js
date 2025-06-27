document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    const namePattern = /^[A-Za-z\s]{2,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", function (e) {
        let valid = true;

        // Name Validation
        if (!namePattern.test(name.value.trim())) {
            nameError.classList.remove("hidden");
            valid = false;
        } else {
            nameError.classList.add("hidden");
        }

        // Email Validation
        if (!emailPattern.test(email.value.trim())) {
            emailError.classList.remove("hidden");
            valid = false;
        } else {
            emailError.classList.add("hidden");
        }

        // Message Validation (at least 10 characters)
        if (message.value.trim().length < 10) {
            messageError.classList.remove("hidden");
            valid = false;
        } else {
            messageError.classList.add("hidden");
        }

        if (!valid) {
            e.preventDefault(); // Block form submission
        } else {
            alert("Form submitted successfully!");
        }
    });
});