// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function () {
    // ===== LOADER =====
    window.addEventListener('load', function () {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== MOBILE MENU TOGGLE =====
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== TYPING EFFECT =====
    const typedTextSpan = document.getElementById('typed-text');
    const roles = PORTFOLIO_DATA.roles || ['Developer', 'Designer', 'Creator'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);

    // ===== RENDER PROJECTS =====
    function renderProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = '';

        PORTFOLIO_DATA.projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in';

            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    ${project.highlights ? `
                        <ul class="project-highlights">
                            ${project.highlights.map(h => `<li>✓ ${h}</li>`).join('')}
                        </ul>
                    ` : ''}
                    <div class="project-tech">
                        ${project.technologies.map(tech => `
                            <span class="tech-badge">${tech}</span>
                        `).join('')}
                    </div>
                </div>
            `;

            if (project.link) {
                projectCard.style.cursor = 'pointer';
                projectCard.addEventListener('click', () => {
                    window.open(project.link, '_blank');
                });
            }

            projectsGrid.appendChild(projectCard);
        });
    }

    // ===== RENDER TIMELINE (EXPERIENCE + EDUCATION) =====
    function renderTimeline() {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        timeline.innerHTML = '';

        // Combine experience and education
        const allItems = [
            ...PORTFOLIO_DATA.experience,
            ...PORTFOLIO_DATA.education
        ];

        allItems.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item fade-in';

            const icon = item.type === 'education' ?
                '<i class="fas fa-graduation-cap"></i>' :
                '<i class="fas fa-briefcase"></i>';

            if (item.type === 'education') {
                timelineItem.innerHTML = `
                    <div class="timeline-icon">${icon}</div>
                    <div class="timeline-content">
                        <h3 class="timeline-title">${item.degree}</h3>
                        <p class="timeline-institution">${item.institution}</p>
                        <p class="timeline-duration">${item.duration}</p>
                        <p class="timeline-grade">${item.grade}</p>
                    </div>
                `;
            } else {
                timelineItem.innerHTML = `
                    <div class="timeline-icon">${icon}</div>
                    <div class="timeline-content">
                        <h3 class="timeline-title">${item.role}</h3>
                        <p class="timeline-company">${item.company}</p>
                        <p class="timeline-duration">${item.duration}</p>
                        <ul class="timeline-description">
                            ${item.description.map(desc => `<li>${desc}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }

            timeline.appendChild(timelineItem);
        });
    }

    // ===== RENDER SKILLS =====
    function renderSkills() {
        const skillsContainer = document.getElementById('skills-container');
        if (!skillsContainer) return;

        skillsContainer.innerHTML = '';

        // Icon mapping for skills
        const skillIcons = {
            'Java': 'fab fa-java',
            'Python': 'fab fa-python',
            'HTML': 'fab fa-html5',
            'CSS': 'fab fa-css3-alt',
            'JavaScript': 'fab fa-js',
            'MySQL': 'fas fa-database',
            'Excel': 'fas fa-file-excel',
            'Eclipse': 'fas fa-code',
            'VS Code': 'fas fa-code',
            'Google Colab': 'fas fa-laptop-code',
            'PowerBI': 'fas fa-chart-bar'
        };

        Object.keys(PORTFOLIO_DATA.skills).forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category';

            categoryDiv.innerHTML = `
                <h3 class="skill-category-title">${category}</h3>
                <div class="skills-grid">
                    ${PORTFOLIO_DATA.skills[category].map(skill => `
                        <div class="skill-card fade-in">
                            <div class="skill-icon">
                                <i class="${skillIcons[skill] || 'fas fa-code'}"></i>
                            </div>
                            <div class="skill-name">${skill}</div>
                        </div>
                    `).join('')}
                </div>
            `;

            skillsContainer.appendChild(categoryDiv);
        });
    }

    // ===== RENDER CONTACT INFO =====
    function renderContact() {
        const contactInfo = document.getElementById('contact-info');
        if (!contactInfo) return;

        contactInfo.innerHTML = `
            <div class="contact-card fade-in">
                <div class="contact-icon"><i class="fas fa-envelope"></i></div>
                <div class="contact-label">Email</div>
                <div class="contact-value">
                    <a href="mailto:${PORTFOLIO_DATA.contact.email}">${PORTFOLIO_DATA.contact.email}</a>
                </div>
            </div>
            <div class="contact-card fade-in">
                <div class="contact-icon"><i class="fas fa-phone"></i></div>
                <div class="contact-label">Phone</div>
                <div class="contact-value">
                    <a href="tel:${PORTFOLIO_DATA.contact.phone}">${PORTFOLIO_DATA.contact.phone}</a>
                </div>
            </div>
        `;

        // Add social links
        if (PORTFOLIO_DATA.contact.social) {
            const socialDiv = document.createElement('div');
            socialDiv.className = 'social-links';
            socialDiv.style.width = '100%';

            const socialLinks = [];

            if (PORTFOLIO_DATA.contact.social.linkedin) {
                socialLinks.push(`
                    <a href="${PORTFOLIO_DATA.contact.social.linkedin}" class="social-link" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                `);
            }

            if (PORTFOLIO_DATA.contact.social.github) {
                socialLinks.push(`
                    <a href="${PORTFOLIO_DATA.contact.social.github}" class="social-link" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i>
                    </a>
                `);
            }

            socialDiv.innerHTML = socialLinks.join('');
            contactInfo.appendChild(socialDiv);
        }
    }

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements after a short delay
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    }, 100);

    // ===== INITIALIZE ALL DYNAMIC CONTENT =====
    renderProjects();
    renderTimeline();
    renderSkills();
    renderContact();
});
