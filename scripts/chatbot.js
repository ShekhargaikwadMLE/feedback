document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatButton');

    // Dynamically load the chatbot script
    const script = document.createElement('script');
    script.src = 'https://widget.brainstormer.io/js/script.js';
    script.setAttribute('bot-id', '52ac689d_be2a_4497_9587_11d0c390a523');
    script.setAttribute('primary-color', '263FA9');

    script.onload = () => {
        console.log('Chatbot script loaded successfully.');
        chatButton.textContent = 'Open Chatbot';
        chatButton.disabled = false;

        chatButton.addEventListener('click', () => {
            if (window.brainstormerWidget && typeof window.brainstormerWidget.open === 'function') {
                console.log('Opening the chatbot...');
                window.brainstormerWidget.open();
            } else {
                console.error('Chatbot not ready yet. Please try again.');
                alert('Chatbot is not ready yet. Please try again in a moment.');
            }
        });
    };

    script.onerror = () => {
        console.error('Failed to load chatbot script.');
        chatButton.textContent = 'Chatbot Failed to Load';
        chatButton.disabled = true;
    };

    document.head.appendChild(script);
});
