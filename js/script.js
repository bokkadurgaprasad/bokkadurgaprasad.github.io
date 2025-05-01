// Mobile menu toggle functionality
document.getElementById('menu-icon').onclick = function() {
    document.getElementById('navlist').classList.toggle('active');
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.navlist a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navlist').classList.remove('active');
    });
});

// Header hide/show on scroll
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.style.top = "-100px";
    } else {
        header.style.top = "0";
    }
    lastScrollTop = scrollTop;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//Scrolling Functionality
document.addEventListener('DOMContentLoaded', function() {
    initCarousel('.python-projects', '.python-left', '.python-right');
    initCarousel('.ml-projects', '.ml-left', '.ml-right');
    initCarousel('.ds-projects', '.ds-left', '.ds-right');
    
    function initCarousel(containerClass, leftBtnClass, rightBtnClass) {
        const projectsContent = document.querySelector(containerClass);
        const leftBtn = document.querySelector(leftBtnClass);
        const rightBtn = document.querySelector(rightBtnClass);
        const projectItems = document.querySelectorAll(`${containerClass} .row`);
        
        const itemWidth = projectItems[0].offsetWidth + 25;
        let currentIndex = 0;
        const maxIndex = projectItems.length - 1;
        
        function updateButtons() {
            leftBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            rightBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
        }
        
        function scrollToIndex(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            projectsContent.scrollTo({
                left: currentIndex * itemWidth,
                behavior: 'smooth'
            });
            updateButtons();
        }
        
        function scrollNext() {
            scrollToIndex(currentIndex + 1);
        }
        
        function scrollPrev() {
            scrollToIndex(currentIndex - 1);
        }
        
        // Button event listeners
        rightBtn.addEventListener('click', scrollNext);
        leftBtn.addEventListener('click', scrollPrev);
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                scrollNext();
                e.preventDefault();
            } else if (e.key === 'ArrowLeft') {
                scrollPrev();
                e.preventDefault();
            }
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        
        projectsContent.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        projectsContent.addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (diff > 50) {
                scrollNext();
            } else if (diff < -50) {
                scrollPrev();
            }
        }, {passive: true});
        
        // Initialize button states
        updateButtons();
    }
});