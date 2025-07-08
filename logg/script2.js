document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const errorDiv = document.getElementById('error-message');

    form.addEventListener('submit', function (e) {
        errorDiv.textContent = '';

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!emailPattern.test(email)) {
            errorDiv.textContent = "Please enter a valid email address.";
            e.preventDefault();
            return;
        }

        const passwordPattern = /^(?=.*[A-Z]).{5,}$/;
        if (!passwordPattern.test(password)) {
            errorDiv.textContent = "Password must be at least of 5 characters and contain at least one uppercase letter.";
            e.preventDefault();
            return;
        }

        if (password !== confirmPassword) {
            errorDiv.textContent = "Passwords didn't match.";
            e.preventDefault();
            return;
        }
    });
});