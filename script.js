// Portfolio Data - Customize this with your actual information
const portfolioData = {
    name: "Your Name",
    title: "Full Stack Developer",
    email: "your.email@example.com",
    location: "Your City, Country",
    
    skills: {
        frontend: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
        backend: ["Node.js", "Python", "Express.js", "Django", "PostgreSQL", "MongoDB"],
        tools: ["Git", "Docker", "AWS", "Figma", "VS Code"]
    },
    
    projects: [
        {
            name: "E-commerce Platform",
            description: "A full-stack e-commerce solution with React frontend and Node.js backend",
            technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
            link: "https://github.com/yourusername/ecommerce",
            image: "🛒"
        },
        {
            name: "Task Management App",
            description: "A collaborative task management application with real-time updates",
            technologies: ["Vue.js", "Socket.io", "MongoDB", "Express.js"],
            link: "https://github.com/yourusername/taskapp",
            image: "📋"
        },
        {
            name: "Weather Dashboard",
            description: "A responsive weather dashboard with location-based forecasts",
            technologies: ["JavaScript", "Chart.js", "Weather API", "CSS3"],
            link: "https://github.com/yourusername/weather",
            image: "🌤️"
        }
    ],
    
    experience: [
        {
            company: "Tech Company Inc.",
            position: "Senior Frontend Developer",
            duration: "2022 - Present",
            description: "Led frontend development for multiple client projects, mentored junior developers"
        },
        {
            company: "Startup XYZ",
            position: "Full Stack Developer",
            duration: "2020 - 2022",
            description: "Built and maintained web applications using modern JavaScript frameworks"
        }
    ]
};

// Response templates with keyword matching
const responses = {
    skills: {
        keywords: ['skill', 'technology', 'tech', 'programming', 'language', 'framework', 'tool'],
        response: () => {
            const { frontend, backend, tools } = portfolioData.skills;
            return `I have expertise in various technologies:\n\n**Frontend:** ${frontend.join(', ')}\n\n**Backend:** ${backend.join(', ')}\n\n**Tools & Others:** ${tools.join(', ')}\n\nI'm always learning new technologies to stay current with industry trends. What specific technology would you like to know more about?`;
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
            expText += "I'm passionate about creating efficient, scalable solutions and collaborating with great teams.";
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
            return `Hi there! 👋 I'm **${portfolioData.name}**, a passionate ${portfolioData.title} based in ${portfolioData.location}.\n\nI love creating digital experiences that make a difference. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while brainstorming the next big idea.\n\n*What would you like to know more about? My skills, projects, or how to get in touch?*`;
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
                `Hello! 👋 Welcome to my interactive portfolio. I'm ${portfolioData.name}, and I'm excited to chat with you about my work and experience!`,
                `Hi there! 🌟 Thanks for stopping by. I'm ${portfolioData.name}, a ${portfolioData.title}. What would you like to know about me?`,
                `Hey! 🚀 Great to meet you. I'm ${portfolioData.name} and I love talking about technology and development. How can I help you today?`
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
    },
    
    default: {
        keywords: [],
        response: () => {
            const responses = [
                `That's an interesting question! While I might not have a specific answer for that, I'd love to tell you about my **skills**, **projects**, or **experience**. What interests you most?`,
                `I'm not sure about that specific topic, but I'm happy to discuss my **technical background**, **recent projects**, or how we might **work together**. What would you like to explore?`,
                `Great question! Let me redirect you to something I can definitely help with. Would you like to know about my **development skills**, **portfolio projects**, or **contact information**?`,
                `Hmm, I don't have specific information about that. But I'm here to share my professional journey! Try asking about my **skills**, **projects**, **experience**, or **contact** details. 😊`
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
let isDarkTheme = true;

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
        general: "Hi! I'm your AI assistant. Ask me anything about my background, skills, or projects!",
        skills: "Let's talk about my technical skills and expertise. What would you like to know?",
        projects: "Here you can explore my projects and see what I've built. Which project interests you?",
        experience: "I'd be happy to share my work experience and career journey. What would you like to know?",
        contact: "Ready to get in touch? I can help you with contact information or you can send me a message directly."
    };
    
    setTimeout(() => {
        addMessage(welcomeMessages[sessionId] || welcomeMessages.general, false);
    }, 500);
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
            <p>${formatMessage(content)}</p>
        </div>
    `;
    
    return messageDiv;
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
                <form class="contact-form" id="contact-form">
                    <div class="form-group">
                        <input type="text" id="contact-name" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="contact-email" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <textarea id="contact-message" placeholder="Your Message" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="contact-submit-btn">
                        <span class="btn-text">Send Message</span>
                        <span class="btn-loading" style="display: none;">⏳ Sending...</span>
                    </button>
                </form>
            </div>
            
            <p class="contact-note">💡 <em>This is a demo form. In a real implementation, you'd integrate with a service like Formspree, EmailJS, or Netlify Forms.</em></p>
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
        
        const detailMessage = `Here are more details about **${project.name}**:\n\n${project.description}\n\n**Technologies Used:** ${project.technologies.join(', ')}\n\n**Key Features:**\n• Modern, responsive design\n• Clean, maintainable code\n• Performance optimized\n• User-friendly interface\n\n${project.link ? `**Live Demo:** [View Project](${project.link})\n\n` : ''}Would you like to know about the development process or see other projects?`;
        
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
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        
        // Clear form
        form.reset();
        
        // Show success message
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            const successMessage = `Thank you, **${name}**! 🎉\n\nI've received your message and will get back to you at **${email}** as soon as possible.\n\n*In a real implementation, this would actually send the email through a service like Formspree, EmailJS, or a backend API.*\n\nIs there anything else you'd like to know about my work or experience?`;
            addMessage(successMessage, false);
        }, 1000);
        
    }, 2000); // Simulate network delay
}

// Auto-focus input
messageInput.focus();

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    initializeChatTabs();
    
    // Add event listeners
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    
    // Add initial welcome message
    setTimeout(() => {
        addMessage("Hello! I'm your AI assistant. I can help you learn about my background, skills, and projects. What would you like to know?", false);
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