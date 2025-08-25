# ChatGPT-Themed Portfolio

A unique, interactive portfolio website that mimics the ChatGPT interface, allowing visitors to "chat" with an AI version of you to learn about your skills, experience, and projects.

## 🚀 Features

- **Interactive Chat Interface**: ChatGPT-style messaging with typing animations
- **Smart Keyword Detection**: Contextual responses based on user queries
- **Dark/Light Theme Toggle**: Modern theme switching capability
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Project Showcase**: Rich media support for displaying your work
- **Contact Integration**: Seamless transition from chat to contact information
- **Customizable Content**: Easy-to-modify portfolio data

## 🛠️ Quick Start

1. **Clone or Download** this project to your local machine
2. **Customize Your Data** in `script.js` (see customization section below)
3. **Open** `index.html` in your browser or serve it locally
4. **Deploy** to your preferred hosting platform

### Local Development

```bash
# Navigate to project directory
cd chatgpt-portfolio

# Start a local server (Python)
python3 -m http.server 8000

# Or use Node.js
npx serve .

# Visit http://localhost:8000
```

## ✏️ Customization

### 1. Personal Information

Edit the `portfolioData` object in `script.js`:

```javascript
const portfolioData = {
    name: "Your Name",
    title: "Your Job Title",
    email: "your.email@example.com",
    location: "Your City, Country",
    // ... rest of your data
};
```

### 2. Skills & Technologies

Update your technical skills:

```javascript
skills: {
    frontend: ["React", "Vue.js", "JavaScript", "TypeScript"],
    backend: ["Node.js", "Python", "Django", "PostgreSQL"],
    tools: ["Git", "Docker", "AWS", "Figma"]
}
```

### 3. Projects

Add your projects with descriptions and links:

```javascript
projects: [
    {
        name: "Project Name",
        description: "Brief description of your project",
        technologies: ["Tech1", "Tech2", "Tech3"],
        link: "https://github.com/yourusername/project",
        image: "🚀" // Emoji or image URL
    }
]
```

### 4. Work Experience

Update your professional background:

```javascript
experience: [
    {
        company: "Company Name",
        position: "Your Position",
        duration: "Start - End Date",
        description: "What you accomplished in this role"
    }
]
```

### 5. Custom Responses

Modify the response templates in the `responses` object to match your personality and add new conversation topics.

## 🎨 Styling

### Theme Colors

Customize colors by modifying CSS variables in `styles.css`:

```css
:root {
    --bg-primary: #343541;
    --accent-color: #10a37f;
    /* ... other variables */
}
```

### Fonts

The portfolio uses Inter font by default. You can change it by updating the Google Fonts import in `index.html` and the font-family in `styles.css`.

## 🚀 Deployment Options

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to [Netlify](https://netlify.com)
2. Your site will be live instantly with a custom URL
3. Connect to GitHub for automatic deployments

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

### Traditional Web Hosting
Upload all files to your web hosting provider's public folder (usually `public_html` or `www`).

## 🔧 Advanced Customization

### Adding New Chat Topics

1. Add new keywords and responses to the `responses` object
2. Create custom response functions
3. Test the keyword detection logic

### Analytics Integration

Add Google Analytics by including the tracking code in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Contact Form Integration

Integrate with services like Formspree, Netlify Forms, or EmailJS for functional contact forms.

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this portfolio template.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Tips for Success

1. **Keep responses conversational** - Write as if you're talking to a friend
2. **Add personality** - Let your unique voice shine through
3. **Update regularly** - Keep your projects and experience current
4. **Test thoroughly** - Try different questions to ensure good responses
5. **Mobile-first** - Many visitors will view on mobile devices

## 🆘 Troubleshooting

### Common Issues

**Q: The chat doesn't respond to my messages**
A: Check the browser console for JavaScript errors and ensure all files are properly linked.

**Q: Styling looks broken**
A: Verify that `styles.css` is properly linked in `index.html`.

**Q: Theme toggle doesn't work**
A: Ensure JavaScript is enabled and check for console errors.

---

**Made with ❤️ for developers who want to stand out**

Remember to customize this portfolio with your own information, projects, and personality to make it truly yours!