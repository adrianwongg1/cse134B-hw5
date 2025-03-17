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


const loadLocalButton = document.getElementById('load-local');
const loadRemoteButton = document.getElementById('load-remote');
const dataContainer = document.getElementById('data-container');

const localDataKey = 'portfolioData';

const localInformation = [
    { id: 1, title: "Project 1", description: "Vehicle Maintenance Management System" },
    { id: 2, title: "Project 2", description: "PantryPal" },
    { id: 3, title: "Project 3", description: "Data Analysis Project" },
    { id: 4, title: "This is localStorage information", description: "FETCH! LOCAL! STORAGE!" }
];

localStorage.setItem(localDataKey, JSON.stringify(localInformation));

function displayData(data) {
    dataContainer.innerHTML = ''; 
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'data-card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        dataContainer.appendChild(card);
    });
}

loadLocalButton.addEventListener('click', () => {
    const localData = JSON.parse(localStorage.getItem(localDataKey));
    if (localData) {
        displayData(localData);
    } else {
        alert('No data found in local storage');
    }
});


const url = "https://api.jsonbin.io/v3/b/67d7a6fb8561e97a50ed742c";
loadRemoteButton.addEventListener('click', async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const jsonData = await response.json();

        dataContainer.innerHTML = '';

        jsonData.record.forEach(project => {
            const card = document.createElement('div');
            card.className = 'data-card';
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            `;
            dataContainer.appendChild(card);
        });

    } catch (error) {
        console.error(error.message);
    }
});

