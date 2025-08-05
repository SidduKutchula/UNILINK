// Get references to the main container and overlay buttons for form switching
const signUpOverlayBtn = document.getElementById('signUpOverlayBtn');
const signInOverlayBtn = document.getElementById('signInOverlayBtn');
const container = document.getElementById('container');

// Event listeners for the overlay buttons to switch forms
signUpOverlayBtn.addEventListener('click', () => {
    container.classList.add("right-panel-active");
    clearMessages(); // Clear messages when switching forms
});

signInOverlayBtn.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
    clearMessages(); // Clear messages when switching forms
});

// Get references to the actual forms and their input fields
const signUpForm = document.getElementById('signUpForm');
const signUpNameInput = document.getElementById('signUpName');
const signUpEmailInput = document.getElementById('signUpEmail');
const signUpPasswordInput = document.getElementById('signUpPassword');
const signUpMessageDiv = document.getElementById('signUpMessage');

const signInForm = document.getElementById('signInForm');
const signInEmailInput = document.getElementById('signInEmail');
const signInPasswordInput = document.getElementById('signInPassword');
const signInMessageDiv = document.getElementById('signInMessage');

// Helper function to display messages
function showMessage(messageDiv, message, isError = false) {
    messageDiv.textContent = message;
    messageDiv.classList.toggle('error', isError);
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.classList.remove('error');
    }, 3000); // Clear message after 3 seconds
}

// Helper function to clear all messages
function clearMessages() {
    signUpMessageDiv.textContent = '';
    signUpMessageDiv.classList.remove('error');
    signInMessageDiv.textContent = '';
    signInMessageDiv.classList.remove('error');
}

// Event listener for the Sign Up form submission
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)

    const name = signUpNameInput.value.trim();
    const email = signUpEmailInput.value.trim();
    const password = signUpPasswordInput.value.trim();

    if (!name || !email || !password) {
        showMessage(signUpMessageDiv, 'Please fill in all fields.', true);
        return;
    }

    // Retrieve existing users from localStorage or initialize an empty object
    let users = JSON.parse(localStorage.getItem('users')) || {};

    // Check if user already exists
    if (users[email]) {
        showMessage(signUpMessageDiv, 'User with this email already exists!', true);
        return;
    }

    // Store new user data
    users[email] = { name: name, password: password };
    localStorage.setItem('users', JSON.stringify(users));

    showMessage(signUpMessageDiv, 'Sign Up Successful! You can now log in.', false);
    
    // Clear form fields after successful signup
    signUpNameInput.value = '';
    signUpEmailInput.value = '';
    signUpPasswordInput.value = '';

    // Switch to sign-in form after successful signup
    setTimeout(() => {
        container.classList.remove("right-panel-active");
        clearMessages();
    }, 1500);
});

// Event listener for the Sign In form submission
signInForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)

    const email = signInEmailInput.value.trim();
    const password = signInPasswordInput.value.trim();

    if (!email || !password) {
        showMessage(signInMessageDiv, 'Please enter both email and password.', true);
        return;
    }

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || {};

    // Check if user exists and password matches
    if (users[email] && users[email].password === password) {
        showMessage(signInMessageDiv, 'Login Successful! Welcome back.', false);
        
        // Set a flag in localStorage to indicate the user is logged in
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(users[email]));

        // Redirect to the dashboard page after a short delay
        setTimeout(() => {
            window.location.href = 'Dashboard.html';
        }, 1500);

    } else {
        showMessage(signInMessageDiv, 'Invalid email or password.', true);
    }
});

// THEME TOGGLE FUNCTIONALITY
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Function to set the theme
const setTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
};

// Check for saved theme preference on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
}

// Event listener for the theme toggle button
themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});