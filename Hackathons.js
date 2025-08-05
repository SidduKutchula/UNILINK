document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons on page load
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
    // Start the countdown timer for the upcoming event
    startCountdown();
    // Add all necessary event listeners for buttons
    addEventListeners();
    // Start simulating real-time participant updates
    setTimeout(simulateRealTimeUpdates, 5000); // Start after a short delay

    // Call the new function to render the dynamic form if on the form page
    renderDynamicForm();
});

// Function to manage and update the countdown timer
function startCountdown() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);
    const fixedTargetTime = targetDate.getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = fixedTargetTime - now;

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        if (daysElement && hoursElement && minutesElement && secondsElement) {
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                // Apply animation class if number changes
                animateNumberChange(daysElement, days);
                animateNumberChange(hoursElement, hours);
                animateNumberChange(minutesElement, minutes);
                animateNumberChange(secondsElement, seconds);

                daysElement.textContent = days;
                hoursElement.textContent = hours;
                minutesElement.textContent = minutes;
                secondsElement.textContent = seconds;
            } else {
                daysElement.textContent = '0';
                hoursElement.textContent = '0';
                minutesElement.textContent = '0';
                secondsElement.textContent = '0';
                clearInterval(countdownInterval);
            }
        } else {
            clearInterval(countdownInterval);
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    const style = document.createElement('style');
    style.textContent = `
        .countdown-number-animate {
            animation: countdownPop 0.3s ease-out;
        }
        @keyframes countdownPop {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Helper function to apply animation class to numbers when they change
function animateNumberChange(element, newValue) {
    if (parseInt(element.textContent) !== newValue) {
        element.classList.remove('countdown-number-animate');
        void element.offsetWidth;
        element.classList.add('countdown-number-animate');
    }
}

// Function to add all main event listeners
function addEventListeners() {
    const primaryActionButtons = document.querySelectorAll('.btn-primary');
    primaryActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = button.dataset.action;
            
            if (action === 'join') {
                const card = button.closest('.card');
                const platformElement = card.querySelector('.event-platform');
                const platform = platformElement ? platformElement.dataset.platform : '';
                let url = '';

                switch (platform) {
                    case 'HackerRank':
                        url = 'https://www.hackerrank.com/contests';
                        break;
                    case 'CodeChef':
                        url = 'https://www.codechef.com/contests';
                        break;
                    case 'GFG':
                        url = 'https://practice.geeksforgeeks.org/contests';
                        break;
                    case 'LeetCode':
                        url = 'https://leetcode.com/contest/';
                        break;
                    default:
                        url = '#';
                }

                addLoadingState(button, 1500, () => {
                    if (url && url !== '#') {
                        showNotification(`Redirecting to ${platform}...`, 'info');
                        window.open(url, '_blank');
                    } else {
                        showNotification('Platform URL not found.', 'error');
                    }
                });
            } else if (action === 'register') {
                const card = button.closest('.card');
                const hackathonType = card.dataset.hackathonType || 'default';
                
                addLoadingState(button, 1500, () => {
                    showNotification('Redirecting to registration form...', 'info');
                    window.location.href = `form.html?hackathon=${hackathonType}`;
                });
            } else if (action === 'set-reminder-countdown') {
                showNotification('Reminder set for Mobile App Hackathon!', 'success');
            }
        });
    });

    const bellButtons = document.querySelectorAll('.btn-outline[data-action="set-reminder"]');
    bellButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Reminder set! You will be notified about this event.', 'success');
        });
    });

    const viewResultsButtons = document.querySelectorAll('.btn-outline[data-action="view-results"]');
    viewResultsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addLoadingState(button, 1500, () => {
                showNotification('Loading results page...', 'info');
                window.location.href = 'results.html';
            });
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const navToggle = document.getElementById('nav-toggle');
    const navSection = document.getElementById('nav-section');

    if (navToggle && navSection) {
        navToggle.addEventListener('click', () => {
            navSection.classList.toggle('active');
        });
    }
}

// Function to show dynamic notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '6px',
        color: 'white',
        fontWeight: '500',
        zIndex: '1000',
        opacity: '0',
        transform: 'translateY(-10px)',
        transition: 'all 0.3s ease-out',
        maxWidth: '300px',
        wordWrap: 'break-word',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    });

    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f59e0b';
            break;
        default:
            notification.style.backgroundColor = '#3b82f6';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Simulates real-time participant updates for live events
function simulateRealTimeUpdates() {
    const participantElements = document.querySelectorAll('.live-card .stat');
    let updateInterval;

    if (participantElements.length > 0) {
        updateInterval = setInterval(() => {
            participantElements.forEach(element => {
                if (element.textContent.includes('participants')) {
                    const currentText = element.textContent;
                    const match = currentText.match(/(\d+,?\d*) participants/);
                    if (match) {
                        const currentCount = parseInt(match[1].replace(/,/g, ''));
                        const newCount = currentCount + Math.floor(Math.random() * 5) + 1;
                        
                        element.innerHTML = `<i data-lucide="users" class="small-icon"></i>${newCount.toLocaleString()} participants`;
                        if (typeof lucide !== 'undefined' && lucide.createIcons) {
                            lucide.createIcons();
                        }

                        element.classList.add('animate-participant-update');
                        setTimeout(() => {
                            element.classList.remove('animate-participant-update');
                        }, 500);
                    }
                }
            });
        }, 30000);

        const style = document.createElement('style');
        style.textContent = `
            .animate-participant-update {
                animation: participantGrow 0.5s ease-out;
            }
            @keyframes participantGrow {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.05); opacity: 0.8; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    } else {
        clearInterval(updateInterval);
    }
}

// Intersection Observer for card fade-in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Function to add a loading state to buttons
function addLoadingState(button, duration = 2000, callback = () => {}) {
    const originalText = button.innerHTML;
    const originalDisabledState = button.disabled;

    if (!document.querySelector('#loading-spinner-style')) {
        const style = document.createElement('style');
        style.id = 'loading-spinner-style';
        style.textContent = `
            .loading-spinner {
                width: 1rem;
                height: 1rem;
                border: 2px solid transparent;
                border-top: 2px solid currentColor;
                border-radius: 50%;
                display: inline-block;
                animation: spin 1s linear infinite;
                margin-right: 0.5rem;
                vertical-align: middle;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.innerHTML = `<div class="loading-spinner"></div>Loading...`;
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = originalDisabledState;
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
        callback();
    }, duration);
}

// Global ripple effect for buttons
document.addEventListener('click', function(e) {
    const button = e.target.closest('.btn');

    if (button && !button.classList.contains('btn-outline')) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;

        if (!document.querySelector('#ripple-styles')) {
            const rippleStyles = document.createElement('style');
            rippleStyles.id = 'ripple-styles';
            rippleStyles.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                .btn {
                    position: relative;
                    overflow: hidden;
                }
            `;
            document.head.appendChild(rippleStyles);
        }
        
        button.querySelectorAll('.ripple-effect').forEach(r => r.remove());
        ripple.classList.add('ripple-effect');

        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
});

// Function to dynamically generate the form content
function renderDynamicForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const hackathonType = urlParams.get('hackathon');
    const formContainer = document.getElementById('dynamic-form-container');
    
    if (!formContainer) return;

    let formHTML = '';

    switch (hackathonType) {
        case 'mobile-app':
            formHTML = `
                <div class="card">
                    <div class="card-content">
                        <h2>Mobile App Hackathon Registration</h2>
                        <p>Please fill out the form to register for the Mobile App Hackathon.</p>
                        <form id="mobile-app-form">
                            <div class="form-group">
                                <label for="team-name">Team Name</label>
                                <input type="text" id="team-name" name="team-name" required>
                            </div>
                            <div class="form-group">
                                <label for="app-idea">App Idea</label>
                                <textarea id="app-idea" name="app-idea" rows="4" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary full-width">Submit Registration</button>
                        </form>
                    </div>
                </div>
            `;
            break;
        case 'data-science':
            formHTML = `
                <div class="card">
                    <div class="card-content">
                        <h2>Data Science Hackathon Registration</h2>
                        <p>Please provide your details and your project idea.</p>
                        <form id="data-science-form">
                            <div class="form-group">
                                <label for="data-science-skills">Relevant Skills</label>
                                <input type="text" id="data-science-skills" name="data-science-skills" placeholder="e.g., Python, R, Machine Learning" required>
                            </div>
                            <div class="form-group">
                                <label for="dataset-preference">Dataset Preference</label>
                                <select id="dataset-preference" name="dataset-preference">
                                    <option value="public">Public</option>
                                    <option value="provided">Provided</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary full-width">Submit Registration</button>
                        </form>
                    </div>
                </div>
            `;
            break;
        default:
            formHTML = `
                <div class="card">
                    <div class="card-content">
                        <h2>General Hackathon Registration</h2>
                        <p>Please fill out the form to register for the event.</p>
                        <form id="general-form">
                            <div class="form-group">
                                <label for="full-name">Full Name</label>
                                <input type="text" id="full-name" name="full-name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <button type="submit" class="btn btn-primary full-width">Submit Registration</button>
                        </form>
                    </div>
                </div>
            `;
    }

    formContainer.innerHTML = formHTML;
}