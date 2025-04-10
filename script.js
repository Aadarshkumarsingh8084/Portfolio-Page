// Dark Mode Toggle
const themeToggle = document.createElement('div');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Testimonial Slider
const testimonialSlider = () => {
    const slider = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const navButtons = document.querySelectorAll('.testimonial-nav button');
    
    if (!slider) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].clientWidth;
    
    const updateSlider = () => {
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update nav buttons
        navButtons.forEach((btn, index) => {
            btn.classList.toggle('active', index === currentIndex);
        });
    };
    
    // Auto slide
    let autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    }, 5000);
    
    // Nav buttons
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
            clearInterval(autoSlide);
            autoSlide = setInterval(() => {
                currentIndex = (currentIndex + 1) % cards.length;
                updateSlider();
            }, 5000);
        });
    });
};

// Project Filter
const projectFilter = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const tags = card.querySelector('.project-tags');
                    if (tags.textContent.toLowerCase().includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
                
                // Re-animate when filtering
                if (card.style.display === 'block') {
                    card.classList.remove('animate');
                    setTimeout(() => card.classList.add('animate'), 50);
                }
            });
        });
    });
};

// Loading Animation
const loadingAnimation = () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 500);
    }, 1500);
};

// Back to Top Button
const backToTop = () => {
    const button = document.createElement('div');
    button.className = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize all features
const init = () => {
    testimonialSlider();
    projectFilter();
    loadingAnimation();
    backToTop();
};

init();
