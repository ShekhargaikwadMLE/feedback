document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatButton');

    // Function to enable the chat button once the widget is ready
    const enableChatButton = () => {
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

    // Dynamically load the chatbot script
    const script = document.createElement('script');
    script.src = 'https://widget.brainstormer.io/js/script.js';
    script.setAttribute('bot-id', '52ac689d_be2a_4497_9587_11d0c390a523');
    script.setAttribute('primary-color', '263FA9');

    // Check if the script has loaded
    script.onload = () => {
        console.log('Chatbot script loaded successfully.');
        
        // Check for widget readiness every second for up to 20 seconds
        let attempts = 0;
        const checkWidgetReady = setInterval(() => {
            if (window.brainstormerWidget && typeof window.brainstormerWidget.open === 'function') {
                console.log('Chatbot is ready.');
                enableChatButton();
                clearInterval(checkWidgetReady);
            } else {
                attempts += 1;
                console.log(`Checking for chatbot readiness... Attempt ${attempts}`);
                if (attempts > 20) { // Timeout after 20 seconds
                    console.error('Chatbot is taking too long to load. Please refresh the page.');
                    clearInterval(checkWidgetReady);
                    alert('Chatbot is taking too long to load. Please refresh the page.');
                }
            }
        }, 1000); // Check every second
    };

    script.onerror = () => {
        console.error('Failed to load chatbot script. Please check the script URL.');
        chatButton.textContent = 'Chatbot Failed to Load';
        chatButton.disabled = true;
    };

    document.head.appendChild(script);
});
