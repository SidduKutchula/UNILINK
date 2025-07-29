const booksData = [
    {
        id: 1,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        price: 85,
        originalPrice: 150,
        condition: "Good",
        subject: "computer-science",
        image: "images/algorithms.jpeg",
        seller: {
            name: "Alex Chen",
            rating: 4.8,
            reviews: 23
        },
        posted: "2 days ago",
        description: "Well-maintained textbook with some highlighting. All pages intact."
    },
    {
        id: 2,
        title: "Calculus: Early Transcendentals",
        author: "James Stewart",
        price: 120,
        originalPrice: 280,
        condition: "Like New",
        subject: "mathematics",
        image: "images/calculus.jpeg",
        seller: {
            name: "Sarah Johnson",
            rating: 4.9,
            reviews: 31
        },
        posted: "1 day ago",
        description: "Barely used, purchased this semester but switching majors."
    },
    {
        id: 3,
        title: "Organic Chemistry",
        author: "Paula Yurkanis Bruice",
        price: 95,
        originalPrice: 200,
        condition: "Fair",
        subject: "chemistry",
        image: "images/chemistry.jpeg",
        seller: {
            name: "Mike Rodriguez",
            rating: 4.6,
            reviews: 18
        },
        posted: "3 days ago",
        description: "Some wear and tear but all content is readable. Great for studying."
    },
    {
        id: 4,
        title: "Physics for Scientists and Engineers",
        author: "Raymond A. Serway",
        price: 110,
        originalPrice: 250,
        condition: "Good",
        subject: "physics",
        image: "images/physics.jpeg",
        seller: {
            name: "Emma Davis",
            rating: 4.7,
            reviews: 15
        },
        posted: "1 week ago",
        description: "Clean copy with minimal highlighting. Perfect for coursework."
    },
    {
        id: 5,
        title: "Campbell Biology",
        author: "Jane B. Reece",
        price: 140,
        originalPrice: 320,
        condition: "Like New",
        subject: "biology",
        image: "images/biology.jpeg",
        seller: {
            name: "David Kim",
            rating: 4.9,
            reviews: 27
        },
        posted: "3 days ago",
        description: "Excellent condition, used only for one semester."
    },
    {
        id: 6,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 12,
        originalPrice: 18,
        condition: "Good",
        subject: "literature",
        image: "images/gatsby.jpeg",
        seller: {
            name: "Lisa Wang",
            rating: 4.5,
            reviews: 12
        },
        posted: "5 days ago",
        description: "Classic literature in good reading condition."
    }
];

const reviewsData = [
    {
        id: 1,
        reviewer: "Akshaya",
        rating: 5,
        review: "Great experience buying from Alex! Book was exactly as described and delivery was quick.",
        date: "2 days ago",
        seller: "Alex Chen",
        book: "Introduction to Algorithms"
    },
    {
        id: 2,
        reviewer: "Neeraja",
        rating: 4,
        review: "Book was in good condition. Minor highlighting but nothing that affected readability.",
        date: "1 week ago",
        seller: "Sarah Johnson",
        book: "Calculus: Early Transcendentals"
    },
    {
        id: 3,
        reviewer: "Srisucha",
        rating: 5,
        review: "Excellent seller! Very responsive and book was better than expected.",
        date: "2 weeks ago",
        seller: "Mike Rodriguez",
        book: "Organic Chemistry"
    },
    {
        id: 4,
        reviewer: "Yakanksha",
        rating: 4,
        review: "Fast transaction and fair price. Would definitely buy from this seller again.",
        date: "3 weeks ago",
        seller: "Emma Davis",
        book: "Physics for Scientists and Engineers"
    },
    {
        id: 5,
        reviewer: "Mounika",
        rating: 5,
        review: "Books arrived in excellent condition and on time. Very happy with the service—will definitely order again!",
        date: "3 weeks ago",
        seller: "Emma Davis",
        book: "Physics for Scientists and Engineers"
    },
    {
        id: 6,
        reviewer: "Siddu",
        rating: 4,
        review: "Affordable prices and fast delivery. The books were genuine and neatly packed. Great buying experience.",
        date: "3 weeks ago",
        seller: "Emma Davis",
        book: "Physics for Scientists and Engineers"
    }
];

const subjectLabels = {
    "computer-science": "Computer Science",
    "mathematics": "Mathematics",
    "chemistry": "Chemistry",
    "physics": "Physics",
    "biology": "Biology",
    "literature": "Literature",
    "business": "Business"
};

// Tab functionality
function initializeTabs() {
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetTab = trigger.getAttribute('data-tab');

            tabTriggers.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            trigger.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Book filtering and search
function filterBooks() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;

    let filteredBooks = booksData;

    if (searchQuery) {
        filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(searchQuery) ||
            book.author.toLowerCase().includes(searchQuery) ||
            subjectLabels[book.subject].toLowerCase().includes(searchQuery)
        );
    }

    if (selectedCategory !== 'all') {
        filteredBooks = filteredBooks.filter(book => book.subject === selectedCategory);
    }

    renderBooks(filteredBooks);
}

function renderBooks(books) {
    const booksGrid = document.getElementById('booksGrid');

    if (books.length === 0) {
        booksGrid.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No books found matching your criteria.</div>';
        return;
    }

    booksGrid.innerHTML = books.map(book => `
        <div class="book-card">
            <div class="book-image">
                <img src="${book.image}" onerror="this.src='fallback.jpg'" alt="${book.title}" />
                <div class="book-condition">${book.condition}</div>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <div class="book-price">
                    <div>
                        <span class="current-price">₹${book.price}</span>
                        <span class="original-price">₹${book.originalPrice}</span>
                    </div>
                    <span class="subject-badge">${subjectLabels[book.subject]}</span>
                </div>
                <p class="book-description">${book.description}</p>
                <div class="seller-info">
                    <div class="seller-avatar">${book.seller.name[0]}</div>
                    <span class="seller-name">${book.seller.name}</span>
                    <div class="seller-rating">
                        <i class="fas fa-star"></i>
                        <span>${book.seller.rating}</span>
                    </div>
                </div>
                <div class="book-actions">
                    <button class="btn btn-primary" onclick="goToContactTab('${book.title}', '${book.seller.name}')">
                        <i class="fas fa-comment"></i> Contact
                    </button>
                    <button class="btn btn-icon" onclick="toggleFavorite(${book.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="btn btn-icon" onclick="viewBookDetails(${book.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function goToContactTab(bookTitle, sellerName) {
    
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-trigger').forEach(trigger => trigger.classList.remove('active'));

    
    document.getElementById('contact').classList.add('active');

    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });

   
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    if (subjectInput) subjectInput.value = `Inquiry about "${bookTitle}" from ${sellerName}`;
    if (messageInput) messageInput.value = `Hi ${sellerName}, I'm interested in your book "${bookTitle}".`;

    
    const tabNav = document.querySelector('.tab-nav');
    if (tabNav) tabNav.style.display = 'none';
}

document.getElementById('backToBooks').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-trigger').forEach(trigger => trigger.classList.remove('active'));


    document.getElementById('buyBooksTab').classList.add('active');
    const buyBooksTrigger = document.querySelector('[data-tab="buyBooksTab"]');
    if (buyBooksTrigger) buyBooksTrigger.classList.add('active');

    const tabNav = document.querySelector('.tab-nav');
    if (tabNav) tabNav.style.display = 'flex';

    
    document.getElementById('buyBooksTab').scrollIntoView({ behavior: 'smooth' });
});


// Render reviews
function renderReviews() {
    const reviewsGrid = document.getElementById('reviewsGrid');
    reviewsGrid.innerHTML = reviewsData.map(review => `
        <div class="card review-card">
            <div class="review-header">
                <div class="reviewer-avatar">${review.reviewer[0]}</div>
                <div class="review-info">
                    <div class="review-meta">
                        <span class="reviewer-name">${review.reviewer}</span>
                        <div class="review-rating">
                            ${generateStars(review.rating)}
                        </div>
                    </div>
                    <p class="review-text">${review.review}</p>
                    <div class="review-details">
                        <span>Bought "${review.book}" from ${review.seller}</span>
                        <span> • </span>
                        <span>${review.date}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fas fa-star star ${i <= rating ? '' : 'empty'}"></i>`;
    }
    return stars;
}

// Event handlers
function contactSeller(sellerName, bookTitle) {
    alert(`Contacting ${sellerName} about "${bookTitle}". In a real application, this would open a messaging interface.`);
}

function toggleFavorite(bookId) {
    alert(`Book ${bookId} added to favorites! In a real application, this would save to user preferences.`);
}

function viewBookDetails(bookId) {
    const book = booksData.find(b => b.id === bookId);
    alert(`Viewing details for "${book.title}". In a real application, this would open a detailed view modal.`);
}

function showMessage(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 500;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Form handlers
function handleSellBookForm(event) {
    event.preventDefault();

    const formData = {
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        subject: document.getElementById('bookSubject').value,
        condition: document.getElementById('bookCondition').value,
        askingPrice: document.getElementById('askingPrice').value,
        originalPrice: document.getElementById('originalPrice').value,
        description: document.getElementById('bookDescription').value,
        email: document.getElementById('sellerEmail').value,
        phone: document.getElementById('sellerPhone').value
    };

    if (!formData.title || !formData.author || !formData.subject || 
        !formData.condition || !formData.askingPrice || !formData.email) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    console.log('Book listing data:', formData);
    showMessage('Your book has been listed successfully!');
    document.getElementById('sellBookForm').reset();
}

function handleContactForm(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }

    console.log('Contact form data:', formData);
    showMessage('Your message has been sent successfully!');
    document.getElementById('contactForm').reset();
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    renderBooks(booksData);
    renderReviews();

    document.getElementById('searchInput').addEventListener('input', filterBooks);
    document.getElementById('categoryFilter').addEventListener('change', filterBooks);
    document.getElementById('sellBookForm').addEventListener('submit', handleSellBookForm);
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);

    console.log('CampusX application initialized successfully!');
});
