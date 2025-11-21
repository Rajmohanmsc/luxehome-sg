document.addEventListener('DOMContentLoaded', () => {
    console.log('SG Renovation Web Loaded');

    // Chatbot Logic
    const chatbotHTML = `
        <div id="chatbot-container" class="chatbot-container">
            <div class="chatbot-header" onclick="toggleChat()">
                <div class="chatbot-title">LuxeHome Assistant</div>
                <div class="chatbot-toggle">+</div>
            </div>
            <div id="chatbot-body" class="chatbot-body">
                <div class="chatbot-messages" id="chatbot-messages">
                    <div class="message bot-message">Hello! Welcome to LuxeHome SG. How can I help you today?</div>
                    <div class="chat-options">
                        <button onclick="sendOption('Renovation Packages')">Renovation Packages</button>
                        <button onclick="sendOption('Smart Home Info')">Smart Home Info</button>
                        <button onclick="sendOption('Get a Quote')">Get a Quote</button>
                        <button onclick="sendOption('Chat on WhatsApp')" style="background-color: #25D366; color: white; border: none;">Chat on WhatsApp</button>
                    </div>
                </div>
            </div>
            <div id="proactive-bubble" class="proactive-bubble" onclick="toggleChat()">
                👋 Need a renovation quote?
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Proactive Chat
    setTimeout(() => {
        const bubble = document.getElementById('proactive-bubble');
        if (!isChatOpen && bubble) {
            bubble.style.display = 'block';
            bubble.classList.add('animate-fade-up');
        }
    }, 5000);
});

let isChatOpen = false;

function toggleChat() {
    const body = document.getElementById('chatbot-body');
    const toggle = document.querySelector('.chatbot-toggle');
    const bubble = document.getElementById('proactive-bubble');

    isChatOpen = !isChatOpen;

    if (isChatOpen) {
        body.style.display = 'block';
        toggle.textContent = 'x';
        if (bubble) bubble.style.display = 'none';
    } else {
        body.style.display = 'none';
        toggle.textContent = '+';
    }
}

function sendOption(option) {
    if (option === 'Chat on WhatsApp') {
        window.open('https://wa.me/6512345678?text=Hi%20LuxeHome%2C%20I%27m%20interested%20in%20your%20services.', '_blank');
        return;
    }

    addMessage(option, 'user-message');
    showTypingIndicator();

    setTimeout(() => {
        hideTypingIndicator();
        let response = "";
        switch (option) {
            case 'Renovation Packages':
                response = "We offer full renovation packages for HDBs (starting $30k) and Condos (starting $45k). Would you like to see our portfolio?";
                break;
            case 'Smart Home Info':
                response = "Our smart home packages include lighting, security, and voice control. Check out our <a href='smart-home.html'>Smart Home page</a> for more details.";
                break;
            case 'Get a Quote':
                response = "Great! You can get a free quote by filling out our <a href='contact.html'>Contact Form</a>. It takes just 2 minutes.";
                break;
            default:
                response = "I'm here to help with any questions about renovation or smart homes.";
        }
        addMessage(response, 'bot-message');
    }, 1500);
}

function addMessage(text, className) {
    const messagesDiv = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTypingIndicator() {
    const messagesDiv = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function hideTypingIndicator() {
    const typingDiv = document.getElementById('typing-indicator');
    if (typingDiv) typingDiv.remove();
}
