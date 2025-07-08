const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('input');
const sendButton = document.getElementById('send-button');
const loadingIndicator = document.getElementById('loading-indicator');

let conversationHistory = [];

function appendMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = marked.parse(text);  
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTo({
    top: chatHistory.scrollHeight,
    behavior: "smooth"
});

}



function autoExpandTextarea() {
    userInput.style.height = 'auto';
    userInput.style.height = userInput.scrollHeight + 'px';
    if (userInput.scrollHeight > 120) {
        userInput.style.overflowY = 'auto';
    } else {
        userInput.style.overflowY = 'hidden';
    }
}

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    appendMessage('user', userMessage);
    userInput.value = '';
    autoExpandTextarea();

    sendButton.disabled = true;
    userInput.disabled = true;
    loadingIndicator.style.visibility = 'visible';

    conversationHistory.push({
        role: 'user',
        content: userMessage
    });

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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", 
                "X-Title": "Modern Med AI",                
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat:free",
                messages: conversationHistory,
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(errorData.message || `Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
            const aiReply = data.choices[0].message.content;
            appendMessage('ai', aiReply);
            conversationHistory.push({
                role: 'assistant',
                content: aiReply
            });
        } else {
            appendMessage('ai', "I'm not sure how to respond. Try again.");
        }

    } catch (error) {
        console.error('Fetch error:', error);
        appendMessage('ai', `Error: ${error.message || 'Failed to connect to AI.'}`);
    } finally {
        sendButton.disabled = false;
        userInput.disabled = false;
        loadingIndicator.style.visibility = 'hidden';
        userInput.focus();
    }
}

sendButton.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

userInput.addEventListener('input', autoExpandTextarea);
autoExpandTextarea();
