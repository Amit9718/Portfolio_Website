// Global variables
let btns, submit, mobileMenu, navMenu;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize all elements with error checking
        btns = document.querySelectorAll(".btn");
        submit = document.getElementById("submit");
        mobileMenu = document.getElementById("bar");
        navMenu = document.querySelector("nav ul");
        
        // Check if essential elements exist
        if (!navMenu) {
            console.error("Navigation menu not found");
            return;
        }
        
        if (!mobileMenu) {
            console.error("Mobile menu button not found");
            return;
        }
        
        // Ensure navbar is visible on desktop
        function checkNavbarVisibility() {
            if (!navMenu) return;
            
            if (window.innerWidth > 767) {
                navMenu.style.display = "flex";
                navMenu.style.flexDirection = "row";
                navMenu.style.position = "static";
                navMenu.style.width = "auto";
                navMenu.style.backgroundColor = "transparent";
                navMenu.style.padding = "0";
                navMenu.style.top = "auto";
                navMenu.style.left = "auto";
                navMenu.style.zIndex = "auto";
            } else {
                navMenu.style.display = "none";
            }
        }
        
        // Check navbar visibility on load and resize
        checkNavbarVisibility();
        window.addEventListener('resize', checkNavbarVisibility);
        
        // Initialize all event listeners
        initializeEventListeners();
        animateSkills();
        
    } catch (error) {
        console.error("Error initializing application:", error);
    }
});

function initializeEventListeners() {
    try {
        // Service filter buttons with error handling
        if (btns && btns.length > 0) {
            btns.forEach(function(buttons){
                buttons.addEventListener("click",function(){
                    try {
                        const buttonId = buttons.getAttribute('id');
                        console.log('Button clicked:', buttonId);
                        
                        const uiDesign = document.getElementById("uiDesign");
                        const webDesign = document.getElementById("webDesign");
                        const android = document.getElementById("android");
                        
                        // Check if elements exist before manipulating them
                        if (!uiDesign || !webDesign || !android) {
                            console.warn('Some service cards not found');
                            return;
                        }
                        
                        if(buttonId === "ui"){
                            uiDesign.style.display = "block";
                            webDesign.style.display = "none";
                            android.style.display = "none";
                        }
                        else if(buttonId === "web"){
                            uiDesign.style.display = "none";
                            webDesign.style.display = "block";
                            android.style.display = "none";
                        }
                        else if(buttonId === "mobile"){
                            uiDesign.style.display = "none";
                            webDesign.style.display = "none";
                            android.style.display = "block";
                        }
                        else if(buttonId === "all"){
                            uiDesign.style.display = "block";
                            webDesign.style.display = "block";
                            android.style.display = "block";
                        }
                    } catch (error) {
                        console.error('Error in service filter:', error);
                    }
                });
            });
        }

        // Mobile menu toggle functionality with error handling
        if (mobileMenu && navMenu) {
            mobileMenu.addEventListener("click", function(){
                try {
                    // Toggle mobile menu class instead of inline styles
                    if(navMenu.classList.contains('mobile-menu')){
                        navMenu.classList.remove('mobile-menu');
                        navMenu.style.display = "none";
                    } else {
                        navMenu.classList.add('mobile-menu');
                        navMenu.style.display = "flex";
                    }
                } catch (error) {
                    console.error('Error in mobile menu toggle:', error);
                }
            });
        }

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll("nav ul li a");
        if (navLinks.length > 0) {
            navLinks.forEach(link => {
                link.addEventListener("click", function(){
                    try {
                        if(window.innerWidth <= 767 && navMenu){
                            navMenu.style.display = "none";
                        }
                    } catch (error) {
                        console.error('Error closing mobile menu:', error);
                    }
                });
            });
        }

        // Smooth scrolling for navigation links
        const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
        if (smoothScrollLinks.length > 0) {
            smoothScrollLinks.forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    try {
                        e.preventDefault();
                        const targetId = this.getAttribute('href');
                        const target = document.querySelector(targetId);
                        if(target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    } catch (error) {
                        console.error('Error in smooth scrolling:', error);
                    }
                });
            });
        }

        // Enhanced contact form submission with Formspree
        const contactForm = document.getElementById("contact-form");
        if (contactForm) {
            contactForm.addEventListener("submit", async function(e){
                e.preventDefault();
                
                try {
                    const name = document.getElementById("name");
                    const email = document.getElementById("email");
                    const msg = document.getElementById("msg");
                    
                    // Check if form elements exist
                    if (!name || !email || !msg) {
                        alert("Contact form elements not found. Please refresh the page.");
                        return;
                    }
                    
                    // Validation
                    if(name.value.trim() === "" || email.value.trim() === "" || msg.value.trim() === ""){
                        alert("Please fill in all fields");
                        return;
                    }
                    
                    if(!validateEmail(email.value.trim())) {
                        alert("Please enter a valid email address");
                        return;
                    }
                    
                    if(msg.value.trim().length < 10) {
                        alert("Please enter a message with at least 10 characters");
                        return;
                    }
                    
                    // Set loading state
                    setLoadingState(true);
                    
                    // Submit to Formspree
                    const formData = new FormData(contactForm);
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    setLoadingState(false);
                    
                    if (response.ok) {
                        alert("Thanks for connecting! Your message has been sent successfully.");
                        // Clear form
                        name.value = "";
                        email.value = "";
                        msg.value = "";
                    } else {
                        throw new Error('Form submission failed');
                    }
                    
                } catch (error) {
                    setLoadingState(false);
                    console.error('Error in form submission:', error);
                    alert("There was an error sending your message. Please try again.");
                }
            });
        }

        // Service contact buttons functionality - Direct scroll to contact
        const serviceContactButtons = document.querySelectorAll('.serviceCard button');
        if (serviceContactButtons.length > 0) {
            serviceContactButtons.forEach(button => {
                button.addEventListener('click', function() {
                    try {
                        // Scroll to contact section
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                            contactSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    } catch (error) {
                        console.error('Error in service contact button:', error);
                    }
                });
            });
        }

        // Add optimized scroll-to-top functionality
        window.addEventListener('scroll', optimizedScrollHandler);
        
    } catch (error) {
        console.error('Error initializing event listeners:', error);
    }
}

// Download CV function
function downloadBtn(){
    try {
        // Check if file exists first
        fetch('Amit-Resume-21.pdf', { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // Direct download of CV file
                    const link = document.createElement('a');
                    link.href = 'Amit-Resume-21.pdf';
                    link.download = 'Amit-Resume-21.pdf';
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Show success message
                    showNotification("CV Downloaded Successfully!", "success");
                } else {
                    throw new Error('CV file not found');
                }
            })
            .catch(error => {
                console.error('Error downloading CV:', error);
                showNotification("Sorry, CV file is currently unavailable. Please contact me directly.", "error");
            });
    } catch (error) {
        console.error('Error in download function:', error);
        showNotification("Download failed. Please try again.", "error");
    }
}

// Form validation improvements
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add loading state to submit button
function setLoadingState(isLoading) {
    const submitBtn = document.getElementById("submit");
    if(isLoading) {
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
    } else {
        submitBtn.textContent = "Submit";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
    }
}

// Show service contact message
function showServiceContactMessage(serviceName) {
    // Create message popup
    const messagePopup = document.createElement('div');
    messagePopup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        max-width: 400px;
        width: 90%;
        animation: popupFadeIn 0.3s ease-out;
    `;
    
    messagePopup.innerHTML = `
        <h3 style="margin: 0 0 15px 0; font-size: 24px;">Thank You for Your Interest!</h3>
        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5;">
            I appreciate your interest in my <strong>${serviceName}</strong> services. 
            I'd love to discuss your project and how I can help bring your ideas to life!
        </p>
        <p style="margin: 0 0 25px 0; font-size: 14px; opacity: 0.9;">
            Please scroll down to the contact section to get in touch with me directly.
        </p>
        <button id="closePopup" style="
            background: rgba(255,255,255,0.2);
            color: white;
            border: 2px solid white;
            padding: 10px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        ">Got it!</button>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popupFadeIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
    `;
    
    // Add to page
    document.body.appendChild(backdrop);
    document.body.appendChild(messagePopup);
    
    // Close popup functionality
    function closePopup() {
        document.body.removeChild(messagePopup);
        document.body.removeChild(backdrop);
        document.head.removeChild(style);
    }
    
    // Event listeners for closing
    document.getElementById('closePopup').addEventListener('click', closePopup);
    backdrop.addEventListener('click', closePopup);
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
    
    // Auto close after 8 seconds
    setTimeout(closePopup, 8000);
}

// Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.getElementById('notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.textContent = message;
    
    // Set styles based on type
    const baseStyles = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10001;
        max-width: 350px;
        word-wrap: break-word;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease-out;
    `;
    
    let typeStyles = '';
    switch(type) {
        case 'success':
            typeStyles = 'background-color: #4CAF50; border-left: 4px solid #45a049;';
            break;
        case 'error':
            typeStyles = 'background-color: #f44336; border-left: 4px solid #da190b;';
            break;
        case 'warning':
            typeStyles = 'background-color: #ff9800; border-left: 4px solid #e68900;';
            break;
        default:
            typeStyles = 'background-color: #2196F3; border-left: 4px solid #1976D2;';
    }
    
    notification.style.cssText = baseStyles + typeStyles;
    
    // Add animation CSS if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification && notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Add performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll event
const optimizedScrollHandler = debounce(function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 300) {
        if (!document.getElementById('scrollToTop')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.id = 'scrollToTop';
            scrollBtn.innerHTML = '↑';
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: aqua;
                color: black;
                border: none;
                font-size: 20px;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            `;
            scrollBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            scrollBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.backgroundColor = '#00cccc';
            });
            scrollBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = 'aqua';
            });
            document.body.appendChild(scrollBtn);
        }
    } else {
        const scrollBtn = document.getElementById('scrollToTop');
        if (scrollBtn) {
            scrollBtn.remove();
        }
    }
}, 100);