const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const remainingChars = document.getElementById('remainingChars');
const errorSpans = document.querySelectorAll('.error');
const maxChars = 250;

let formErrors = [];

function showError(input, message) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
    setTimeout(() => {
        errorSpan.style.display = 'none';
    }, 3000);
}

function validateName() {
    const namePattern = /^[a-zA-Z ]*$/;
    if (!namePattern.test(nameInput.value)) {
        showError(nameInput, 'Only letters and spaces are allowed.');
        nameInput.value = nameInput.value.replace(/[^a-zA-Z ]/g, '');
        return false;
    }
    return true;
}

function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address.');
        return false;
    }
    return true;
}

function validateMessage() {
    if (messageInput.value.length > maxChars) {
        showError(messageInput, `Message cannot exceed ${maxChars} characters.`);
        messageInput.value = messageInput.value.substring(0, maxChars);
        return false;
    }
    return true;
}

function updateCharCount() {
    const remaining = maxChars - messageInput.value.length;
    remainingChars.textContent = `${remaining} Characters Remaining`;

    if (remaining < 50) {
        remainingChars.style.color = 'orange';
    } else if (remaining < 20) {
        remainingChars.style.color = 'red';
    } else {
        remainingChars.style.color = 'black';
    }
}

// Function to enforce character limit in the textarea
function enforceCharLimit() {
    if (messageInput.value.length > maxChars) {
        messageInput.value = messageInput.value.substring(0, maxChars);
        updateCharCount(); 
    }
}

// Event listeners for input fields
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);
messageInput.addEventListener('input', updateCharCount);
messageInput.addEventListener('input', enforceCharLimit);

form.addEventListener('submit', (event) => {
    formErrors = [];

    // Validate each field
    if (!validateName()) {
        formErrors.push({ field: 'name', message: 'Invalid characters in name.' });
    }
    if (!validateEmail()) {
        formErrors.push({ field: 'email', message: 'Invalid email address.' });
    }
    if (!validateMessage()) {
        formErrors.push({ field: 'message', message: 'Message exceeds character limit.' });
    }

    console.log('Form Errors:', formErrors);

    if (formErrors.length > 0) {
        event.preventDefault();
        console.log('Form submission prevented due to errors.');
    } else {
        console.log('Form submitted successfully.');
    }
});

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', toggleTheme);


class ProjectCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          .card {
            background: var(--section-background);
            padding: 1rem;
            margin: 1rem;
            border-radius: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .card h2 {
            color: var(--white);
            text-align: center;
          }
          .card img {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 50%;
          }
          .card p {
            color: var(--white);
            text-align: center;
          }
          .card ul {
            color: var(--white);
            margin: 1rem 0;
          }
          .card a {
            color: var(--lightblue);
            text-decoration: none;
            transition: color 0.3s ease;
          }
          .card a:hover {
            color: var(--blue);
          }
        </style>
        <div class="card">
          <h2></h2>
          <picture>
            <img src="" alt="">
          </picture>
          <p class="description"></p>
          <ul class="details"></ul>
          <a href="" class="link"></a>
        </div>
      `;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  
    set project(value) {
      this.projects = value;
      this.updateContent();
    }
  
    updateContent() {
      if (!this.projects) return;
      
      this.shadowRoot.querySelector('h2').textContent = this.projects.title;

      const img = this.shadowRoot.querySelector('img');
      img.src = this.projects.imageUrl;
      img.alt = this.projects.imageAlt || '';

      this.shadowRoot.querySelector('.description').textContent = this.projects.description;
      const ul = this.shadowRoot.querySelector('.details');
      ul.innerHTML = this.projects.details.map(detail => `<li>${detail}</li>`).join('');

      const link = this.shadowRoot.querySelector('.link');
      link.href = this.projects.linkUrl;
      link.textContent = this.projects.linkText;
    }
  }
  
  customElements.define('project-card', ProjectCard);

  async function loadProjects() {
    try {
      const response = await fetch('json/projects.json');
      const jsonProjects = await response.json();

      const localProjects = JSON.parse(localStorage.getItem('projects')) || [];

      const allProjects = [...jsonProjects, ...localProjects];
      const portfolioContent = document.getElementById('portfolio-content');
      portfolioContent.innerHTML = ''; 

      allProjects.forEach(project => {
        const card = document.createElement('project-card');
        card.project = project;
        portfolioContent.appendChild(card);
      });
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadProjects);