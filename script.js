document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    
    document.addEventListener('mousemove', function(e) {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        cursorCircle.style.left = e.clientX + 'px';
        cursorCircle.style.top = e.clientY + 'px';
    });
    
    // Typewriter effect for "Digital Marketer" text
    const typewriterElement = document.getElementById('typewriter');
    const text = "Digital Marketer";
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typewriterElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150); // Adjust speed by changing the timeout value
        } else {
            // Reset and start again after a pause (optional)
            setTimeout(() => {
                typewriterElement.innerHTML = '';
                i = 0;
                typeWriter();
            }, 5000); // Wait 5 seconds before restarting
        }
    }
    
    // Start the typewriter effect
    typeWriter();
    
    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .close-modal, .profile-container, .download-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorCircle.style.width = '60px';
            cursorCircle.style.height = '60px';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorCircle.style.width = '40px';
            cursorCircle.style.height = '40px';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorCircle.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorCircle.style.opacity = '1';
    });
    
    // Navigation active state and tooltip
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'nav-link-tooltip';
        tooltip.textContent = link.textContent;
        link.appendChild(tooltip);
        
        link.addEventListener('click', function(e) {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Refresh page when home link is clicked
            if(this.textContent === 'Home') {
                e.preventDefault();
                window.location.reload();
            }
            
            // Smooth scroll to education section when education link is clicked
            if(link.classList.contains('education-link')) {
                e.preventDefault();
                document.getElementById('education').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
            
            // Show contact info modal when contact link is clicked
            if(link.classList.contains('contact-link')) {
                e.preventDefault();
                document.getElementById('contactInfoModal').classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            // Show about modal when about link is clicked
            if(link.classList.contains('about-link')) {
                e.preventDefault();
                document.getElementById('aboutModal').classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            // Redirect to services section when work link is clicked
            if(link.classList.contains('work-link')) {
                e.preventDefault();
                document.querySelector('.services').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });
    
    // Handle skills link click
    const skillsLink = document.querySelector('.skills-link');
    skillsLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('skills').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

    // Smooth scrolling for buttons
    const viewWorkBtn = document.querySelector('.primary-btn');
    const contactBtn = document.querySelector('.secondary-btn');
    
    viewWorkBtn.addEventListener('click', () => {
        document.querySelector('.services').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
    
    // Contact form modal functionality
    const contactModal = document.getElementById('contactModal');
    const contactInfoModal = document.getElementById('contactInfoModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const contactForm = document.getElementById('contactForm');
    
    // Show modal when contact button is clicked
    contactBtn.addEventListener('click', () => {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
    
    // Close modals when clicking the close button
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            contactModal.classList.remove('active');
            contactInfoModal.classList.remove('active');
            document.getElementById('aboutModal').classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    });
    
    // Close modals when clicking outside of the modal content
    window.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (e.target === contactInfoModal) {
            contactInfoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (e.target === document.getElementById('aboutModal')) {
            document.getElementById('aboutModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create form data object for submission
        const formData = new FormData(contactForm);
        
        // Submit form data using fetch API
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            
            // Show thank you message
            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = `
                <div class="thank-you-message">
                    <div class="thank-you-icon">
                        <svg viewBox="0 0 100 100" width="80" height="80">
                            <rect x="20" y="25" width="60" height="50" rx="5" fill="#E0E0E0" />
                            <rect x="35" y="35" width="30" height="25" rx="2" fill="#4CAF50" />
                            <path d="M45,50 L50,55 L60,45" stroke="white" stroke-width="3" fill="none" />
                        </svg>
                    </div>
                    <h3>Thank You!</h3>
                    <p>Your submission has been received.</p>
                    <button class="close-thank-you primary-btn">Close</button>
                </div>
            `;
            
            // Add event listener to close button
            const closeBtn = document.querySelector('.close-thank-you');
            closeBtn.addEventListener('click', () => {
                contactModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                // Reset form and modal content after closing
                setTimeout(() => {
                    contactForm.reset();
                    resetModalContent();
                }, 300);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your form. Please try again.');
        });
    });
    
    // Function to reset modal content
    function resetModalContent() {
        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = `
            <span class="close-modal">&times;</span>
            <div class="contact-form-header">
                <div class="contact-form-icon">
                    <svg viewBox="0 0 24 24" width="40" height="40">
                        <path fill="#FDB866" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                    </svg>
                </div>
                <h3>CONTACT US</h3>
                <p>Please fill this form in a decent manner</p>
            </div>
            <form class="contact-form" id="contactForm" action="https://api.web3forms.com/submit" method="post">
                <input type="hidden" name="access_key" value="2aae71aa-8668-4ff7-bb59-fa300fba11ef">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit" class="submit-btn">Submit</button>
            </form>
        `;
        
        // Re-attach event listeners
        const closeModal = document.querySelector('.close-modal');
        const contactForm = document.getElementById('contactForm');
        
        closeModal.addEventListener('click', () => {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        contactForm.addEventListener('submit', (e) => {
            // The existing submit handler will be attached again
            document.querySelector('.contact-form').dispatchEvent(new Event('submit'));
            e.preventDefault();
        });
    }
    
    // Add animation to stats numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let value = Math.floor(progress * (end - start) + start);
            
            // Add percentage sign if needed
            if (element.textContent.includes('%')) {
                element.textContent = value + '%';
            } else {
                element.textContent = value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Intersection Observer for animation trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent.replace('%', ''));
                
                animateValue(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
    
    // Skills progress animation
    const animateSkills = () => {
        const skills = [
            { selector: '.html-progress', text: '.html-progress + text', value: 90 },
            { selector: '.css-progress', text: '.css-progress + text', value: 85 },
            { selector: '.js-progress', text: '.js-progress + text', value: 75 },
            { selector: '.ps-progress', text: '.ps-progress + text', value: 95 }
        ];

        skills.forEach(skill => {
            const circle = document.querySelector(skill.selector);
            const text = document.querySelector(skill.text);
            const circumference = 2 * Math.PI * 70; // 2πr, where r=70
            
            // Set initial state
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;
            
            // Start the animation
            let counter = 0;
            const intervalId = setInterval(() => {
                if (counter >= skill.value) {
                    clearInterval(intervalId);
                } else {
                    counter++;
                    text.textContent = counter + '%';
                    const offset = circumference - (counter / 100) * circumference;
                    circle.style.strokeDashoffset = offset;
                }
            }, 20);
        });
    };

    // Use Intersection Observer to trigger skill animation when section is visible
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
    
    // Service cards hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.backgroundColor = '#f9f0e3';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.backgroundColor = 'var(--light-gray)';
        });
    });
});