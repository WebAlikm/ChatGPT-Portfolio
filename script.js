// Portfolio data: keep this synchronized with demonstrable projects and verified experience.
const portfolioData = {
    name: "Ali Khemakhem",
    title: "Computer Science & AI Student | Full-Stack Developer",
    email: "alislim007km@gmail.com",
    location: "Abu Dhabi, UAE",
    skills: {
        frontend: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
        backend: ["Node.js", "Express", "Python", "API Integration"],
        tools: ["Git", "GitHub", "Supabase", "Vite", "Resend"]
    },
    projects: [
        {
            name: "YouAreMoreHere",
            description: "Full-stack web application with a seven-day email experience. Uses React, TypeScript, Express, Supabase, and Resend. Source code is private; live product is available.",
            technologies: ["React", "TypeScript", "Express", "Supabase", "Resend"],
            link: "https://youaremorehere.com",
            image: "✉️"
        },
        {
            name: "Al Qua'a Services",
            description: "Arabic-first community discovery prototype for the 2026 Tatweer Hackathon. Vite and vanilla JavaScript power bilingual search and filters over demonstration listings.",
            technologies: ["JavaScript", "Vite", "HTML", "CSS", "JSON"],
            link: "https://github.com/WebAlikm/alqua-services",
            image: "📍"
        },
        {
            name: "ChatGPT-Themed Portfolio",
            description: "Interactive portfolio interface with keyword-matched, predefined responses. This version does not call a language model.",
            technologies: ["JavaScript", "HTML", "CSS"],
            link: "https://github.com/WebAlikm/ChatGPT-Portfolio",
            image: "💬"
        }
    ],
    experience: [
        {
            company: "Abu Dhabi University",
            position: "B.Sc. Computer Science — Artificial Intelligence",
            duration: "2024–2029 (expected)",
            description: "Computer Science undergraduate studying AI."
        },
        {
            company: "Freelance",
            position: "Video Editor & Content Creator",
            duration: "Oct 2023 – Jul 2026",
            description: "Produced ten client videos; used AI-assisted production workflows to reduce delivery turnaround by five days (owner-reported)."
        }
    ]
};

// Response templates with keyword matching
const responses = {
    skills: {
        keywords: ['skill', 'technology', 'tech', 'programming', 'language', 'framework', 'tool'],
        response: () => {
            const { frontend, backend, tools } = portfolioData.skills;
            return `My publicly documented projects use these technologies:\n\n**Frontend:** ${frontend.join(', ')}\n\n**Backend:** ${backend.join(', ')}\n\n**Tools & Others:** ${tools.join(', ')}\n\nYou can verify the stack in my linked repositories. Ask me about a specific project.`;
        }
    },
    
    projects: {
        keywords: ['project', 'work', 'portfolio', 'build', 'created', 'developed', 'app', 'website'],
        response: () => {
            return 'projects_showcase'; // Special flag for rich media response
        }
    },
    
    experience: {
        keywords: ['experience', 'work', 'job', 'career', 'employment', 'background', 'history'],
        response: () => {
            let expText = "Here's my professional experience:\n\n";
            portfolioData.experience.forEach((exp, index) => {
                expText += `**${exp.position}** at ${exp.company}\n${exp.duration}\n${exp.description}\n\n`;
            });
            expText += "For implementation details, please review the project repositories and case studies.";
            return expText;
        }
    },
    
    contact: {
        keywords: ['contact', 'email', 'reach', 'hire', 'connect', 'touch', 'message'],
        response: () => {
            return 'contact_form'; // Special flag for contact form
        }
    },
    
    about: {
        keywords: ['about', 'who', 'background', 'story', 'yourself', 'bio', 'tell me about'],
        response: () => {
            return `Hi there! 👋 I'm **${portfolioData.name}**, a ${portfolioData.title} based in ${portfolioData.location}.\n\nI build web applications, including an email-based experience and an Arabic-first community discovery prototype. You can open the code and documentation linked under Projects.\n\n*What would you like to know more about? My skills, projects, or how to get in touch?*`;
        }
    },
    
    // Additional helpful responses
    help: {
        keywords: ['help', 'what can you do', 'commands', 'options', 'menu'],
        response: () => {
            return `I can help you learn about my professional background! Here are some things you can ask me:\n\n🔧 **"Tell me about your skills"** - My technical expertise\n💼 **"Show me your projects"** - Portfolio showcase\n📋 **"What's your experience?"** - Work history\n📧 **"How can I contact you?"** - Get in touch\n👋 **"Tell me about yourself"** - Personal background\n\nJust type any of these topics or ask me anything else!`;
        }
    },
    
    greeting: {
        keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
        response: () => {
            const greetings = [
                `Hi! I'm ${portfolioData.name}. Ask me about my skills, projects, or experience.`,
                `Hello! I'm ${portfolioData.name}, ${portfolioData.title}. What would you like to know?`,
                `Hey! I'm ${portfolioData.name}. How can I help?`
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
    },
    
    default: {
        keywords: [],
        response: () => {
            const responses = [
                `I can help with **skills**, **projects**, **experience**, or **contact** info. What interests you?`,
                `Try asking about my **technical background**, **projects**, or **contact** details.`,
                `Ask me about **skills**, **projects**, or **experience**.`
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
};

// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');
const themeBtn = document.getElementById('theme-btn');

// Theme Management
let isDarkTheme = false;

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    const themeIcon = themeBtn.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = isDarkTheme ? '🌙' : '☀️';
    }
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// Load saved theme when DOM is ready
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        isDarkTheme = savedTheme === 'dark';
        document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
        const themeBtn = document.getElementById('theme-btn');
        if (themeBtn) {
            const themeIcon = themeBtn.querySelector('.theme-icon');
            if (themeIcon) {
                themeIcon.textContent = isDarkTheme ? '🌙' : '☀️';
            }
        }
    }
}

// Sidebar toggle functionality
function toggleLeftSidebar() {
    const leftSidebar = document.querySelector('.left-sidebar');
    const overlay = document.querySelector('.sidebar-overlay') || createOverlay();
    
    leftSidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

function toggleRightSidebar() {
    const rightSidebar = document.querySelector('.right-sidebar');
    const overlay = document.querySelector('.sidebar-overlay') || createOverlay();
    
    rightSidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.onclick = closeSidebars;
    document.body.appendChild(overlay);
    return overlay;
}

function closeSidebars() {
    const leftSidebar = document.querySelector('.left-sidebar');
    const rightSidebar = document.querySelector('.right-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    leftSidebar.classList.remove('open');
    rightSidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
}

// Chat session management
let currentChatSession = 'general';
const chatSessions = {
    general: {
        title: 'General Chat',
        messages: []
    },
    skills: {
        title: 'Skills & Tech',
        messages: []
    },
    projects: {
        title: 'Projects',
        messages: []
    },
    experience: {
        title: 'Experience',
        messages: []
    },
    contact: {
        title: 'Contact',
        messages: []
    }
};

function switchChatSession(sessionId) {
    // Save current session messages
    const messagesContainer = document.getElementById('chat-messages');
    chatSessions[currentChatSession].messages = Array.from(messagesContainer.children).map(msg => msg.outerHTML);
    
    // Switch to new session
    currentChatSession = sessionId;
    
    // Clear and load new session messages
    messagesContainer.innerHTML = '';
    chatSessions[currentChatSession].messages.forEach(msgHTML => {
        messagesContainer.innerHTML += msgHTML;
    });
    
    // Update active tab
    document.querySelectorAll('.chat-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[data-session="${sessionId}"]`).classList.add('active');
    
    // Add welcome message if session is empty
    if (chatSessions[currentChatSession].messages.length === 0) {
        addWelcomeMessage(sessionId);
    }
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        closeSidebars();
    }
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addWelcomeMessage(sessionId) {
    const welcomeMessages = {
        general: "Hi! I'm Ali's portfolio guide. This is a scripted chat interface, not a generative AI model. Ask about my projects, skills, experience, or contact information.",
        skills: "Frontend: React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS. Backend and APIs: Node.js, Express, Python, Supabase, Resend. See linked repositories for project-specific evidence.",
        projects: "Projects: YouAreMoreHere (React/Express email workflow), Al Qua'a Services (Arabic-first Vite directory), and this ChatGPT-themed portfolio (keyword-based UI). Ask to see my projects for links.",
        experience: "Computer Science (AI) undergraduate at Abu Dhabi University, with freelance video-editing experience from 2023–2026 and software projects documented on GitHub.",
        contact: "Reach me at " + portfolioData.email + " or view my GitHub at https://github.com/WebAlikm."
    };
    setTimeout(() => addMessage(welcomeMessages[sessionId] || welcomeMessages.general, false), 500);
}

// Message Functions
function createMessage(content, isUser = false, showAvatar = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    
    const avatarDiv = showAvatar ? `
        <div class="message-avatar">
            <div class="avatar-circle">${isUser ? 'U' : 'AI'}</div>
        </div>
    ` : '';
    
    messageDiv.innerHTML = `
        ${avatarDiv}
        <div class="message-content">
            <p>${isUser ? escapeHtml(content) : formatMessage(content)}</p>
        </div>
    `;
    
    return messageDiv;
}

// Do not interpret visitor-entered text as markup or executable HTML.
function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
}

function formatMessage(text) {
    // Convert markdown-like formatting to HTML
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        .replace(/\n/g, '<br>');
}

function addMessage(content, isUser = false) {
    if (content === 'projects_showcase') {
        addProjectShowcase();
        return;
    }
    
    if (content === 'contact_form') {
        addContactForm();
        return;
    }
    
    const message = createMessage(content, isUser);
    chatMessages.appendChild(message);
    scrollToBottom();
}

function addContactForm() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';
    
    const contactHTML = `
        <div class="message-avatar">
            <div class="avatar-circle">AI</div>
        </div>
        <div class="message-content">
            <p><strong>I'd love to hear from you! 💬</strong></p>
            <p>You can reach out through any of these methods:</p>
            
            <div class="contact-options">
                <div class="contact-method">
                    <span class="contact-icon">📧</span>
                    <div class="contact-info">
                        <strong>Email</strong>
                        <a href="mailto:${portfolioData.email}" class="contact-link">${portfolioData.email}</a>
                    </div>
                </div>
                
                <div class="contact-method">
                    <span class="contact-icon">📍</span>
                    <div class="contact-info">
                        <strong>Location</strong>
                        <span class="contact-text">${portfolioData.location}</span>
                    </div>
                </div>
            </div>
            
            <div class="contact-form-container">
                <p><strong>Or send me a quick message:</strong></p>
                <form class="contact-form" id="contact-form" action="https://formspree.io/f/xzzaolee" method="POST">
                    <div class="form-group">
                        <input type="text" name="name" id="contact-name" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" id="contact-email" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <textarea name="message" id="contact-message" placeholder="Your Message" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="contact-submit-btn">
                        <span class="btn-text">Send Message</span>
                        <span class="btn-loading" style="display: none;">⏳ Sending...</span>
                    </button>
                </form>
            </div>
            
            <p class="contact-note">💡 <em>This form is connected to Formspree and will send messages directly to alislim007km@gmail.com</em></p>
        </div>
    `;
    
    messageDiv.innerHTML = contactHTML;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addProjectShowcase() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';
    
    let projectsHTML = `
        <div class="message-avatar">
            <div class="avatar-circle">AI</div>
        </div>
        <div class="message-content">
            <p><strong>Here are some of my recent projects:</strong></p>
            <div class="projects-grid">
    `;
    
    portfolioData.projects.forEach((project, index) => {
        projectsHTML += `
            <div class="project-card" data-project="${index}">
                <div class="project-header">
                    <span class="project-emoji">${project.image}</span>
                    <h3 class="project-title">${project.name}</h3>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-actions">
                    ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project →</a>` : ''}
                    <button class="project-details-btn" data-project="${index}">Learn More</button>
                </div>
            </div>
        `;
    });
    
    projectsHTML += `
            </div>
            <p style="margin-top: 1rem;">Click "Learn More" on any project for detailed information, or ask me specific questions!</p>
        </div>
    `;
    
    messageDiv.innerHTML = projectsHTML;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    typingIndicator.style.display = 'flex';
    scrollToBottom();
}

function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}

// Keyword Detection and Response Generation
function detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [intent, data] of Object.entries(responses)) {
        if (intent === 'default') continue;
        
        const hasKeyword = data.keywords.some(keyword => 
            lowerMessage.includes(keyword.toLowerCase())
        );
        
        if (hasKeyword) {
            return intent;
        }
    }
    
    return 'default';
}

function generateResponse(message) {
    const intent = detectIntent(message);
    const responseData = responses[intent];
    return responseData.response();
}

// Chat Functionality
function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    messageInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI thinking time
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateResponse(message);
        addMessage(response, false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Theme button event listener is now handled in DOMContentLoaded

// Suggestion buttons and project interactions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggestion-btn')) {
        const query = e.target.getAttribute('data-query');
        messageInput.value = query;
        sendMessage();
    }
    
    // Project detail buttons
    if (e.target.classList.contains('project-details-btn')) {
        const projectIndex = parseInt(e.target.getAttribute('data-project'));
        const project = portfolioData.projects[projectIndex];
        
        const detailMessage = `Here are more details about **${project.name}**:\n\n${project.description}\n\n**Technologies Used:** ${project.technologies.join(', ')}\n\n**Implementation:** See the repository or live project for features and technical evidence\n\n${project.link ? `**Project link:** [Open](${project.link})\n\n` : ''}Would you like to know about the development process or see other projects?`;
        
        // Show typing indicator
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            addMessage(detailMessage, false);
        }, 800 + Math.random() * 400);
     }
    
    // Contact form submission
    if (e.target.classList.contains('contact-submit-btn')) {
        e.preventDefault();
        handleContactFormSubmission(e.target.closest('form'));
    }
});

// Contact form handling
function handleContactFormSubmission(form) {
    const submitBtn = form.querySelector('.contact-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    const name = form.querySelector('#contact-name').value;
    const email = form.querySelector('#contact-email').value;
    const message = form.querySelector('#contact-message').value;
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'block';
    
    // Use Formspree for actual form submission
    const formData = new FormData(form);
    
    fetch('https://formspree.io/f/xzzaolee', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        
        if (response.ok) {
            // Clear form on success
            form.reset();
            
            // Show success message
            showTypingIndicator();
            
            setTimeout(() => {
                hideTypingIndicator();
                const successMessage = `Thank you, **${name}**! 🎉\n\nYour message has been sent successfully to alislim007km@gmail.com. I'll get back to you as soon as possible!\n\nIs there anything else you'd like to know about my work or experience?`;
                addMessage(successMessage, false);
            }, 1000);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        
        // Show error message
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            const errorMessage = `Sorry, there was an error sending your message. Please try again or contact me directly at **alislim007km@gmail.com**.`;
            addMessage(errorMessage, false);
        }, 1000);
    });
}

// Auto-focus input
messageInput.focus();

// About button functionality
function showAboutInfo() {
    const aboutMessage = `Portfolio Version 1.0\n\nThis version uses deterministic keyword matching, not a language model. A future version may add server-side, source-grounded AI retrieval with evaluation and rate limiting.`;
    alert(aboutMessage);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    initializeChatTabs();
    
    // Add event listeners
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    
    // Add about button event listener
    const aboutBtn = document.getElementById('about-btn');
    if (aboutBtn) {
        aboutBtn.addEventListener('click', showAboutInfo);
    }
    
    // Add initial welcome message
    setTimeout(() => {
        addMessage("Hi! I'm Ali's portfolio guide (scripted responses, not an LLM). Ask about my projects, skills, or experience.", false);
    }, 1000);
});

// Initialize chat tabs
function initializeChatTabs() {
    const chatTabs = document.querySelectorAll('.chat-tab');
    chatTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const sessionId = tab.getAttribute('data-session');
            if (sessionId) {
                switchChatSession(sessionId);
            }
        });
    });
    
    // Set initial active tab
    const generalTab = document.querySelector('[data-session="general"]');
    if (generalTab) {
        generalTab.classList.add('active');
    }
}

// Disable send button when input is empty
messageInput.addEventListener('input', () => {
    sendBtn.disabled = !messageInput.value.trim();
});

// Initial state
sendBtn.disabled = true;