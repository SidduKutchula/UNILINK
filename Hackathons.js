document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    startCountdown();
    addEventListeners();
});
function startCountdown() {
    function updateCountdown() {
        const now = new Date().getTime();
        const targetDate = new Date(now + 5 * 24 * 60 * 60 * 1000).getTime();
        const difference = targetDate - now;
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
        } else {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
        }
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
function addEventListeners() {
    const joinButtons = document.querySelectorAll('.btn-primary');
    joinButtons.forEach(button => {
        if (button.textContent.includes('Join Now') || button.textContent.includes('Register')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Registration functionality would be implemented here', 'info');
            });
        }
    });
    const bellButtons = document.querySelectorAll('.btn-outline');
    bellButtons.forEach(button => {
        const bellIcon = button.querySelector('[data-lucide="bell"]');
        if (bellIcon) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Reminder set! You will be notified about this event.', 'success');
            });
        }
    });
    const reminderButton = document.querySelector('.countdown-button .btn-primary');
    if (reminderButton) {
        reminderButton.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Reminder set for Mobile App Hackathon!', 'success');
        });
    }
    const viewResultsButtons = document.querySelectorAll('.btn-outline');
    viewResultsButtons.forEach(button => {
        if (button.textContent.includes('View Results')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Results page would open here', 'info');
            });
        }
    });
}
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
        transition: 'all 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
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
function simulateRealTimeUpdates() {
    const participantElements = document.querySelectorAll('.live-card .stat');
    setInterval(() => {
        participantElements.forEach(element => {
            if (element.textContent.includes('participants')) {
                const currentText = element.textContent;
                const match = currentText.match(/(\d+,?\d*) participants/);
                if (match) {
                    const currentCount = parseInt(match[1].replace(',', ''));
                    const newCount = currentCount + Math.floor(Math.random() * 5) + 1;
                    element.innerHTML = `<i data-lucide="users" class="small-icon"></i>${newCount.toLocaleString()} participants`;
                    lucide.createIcons();
                }
            }
        });
    }, 30000);
}
setTimeout(simulateRealTimeUpdates, 5000);
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
function addLoadingState(button, duration = 2000) {
    const originalText = button.innerHTML;
    button.innerHTML = '<div class="loading-spinner"></div>Loading...';
    button.disabled = true;
    const style = document.createElement('style');
    style.textContent = `
        .loading-spinner {
            width: 12px;
            height: 12px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            display: inline-block;
            animation: spin 1s linear infinite;
            margin-right: 8px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        lucide.createIcons();
        document.head.removeChild(style);
    }, duration);
}
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
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
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
});