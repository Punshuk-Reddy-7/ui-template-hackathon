const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const newChatBtn = document.getElementById("newChatBtn");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");
const suggestions = document.querySelectorAll(".suggestion");
const chatItems = document.querySelectorAll(".chat-item");
const searchInput = document.getElementById("searchInput");

// Send a message
function sendMessage() {
    const text = messageInput.value.trim();

    if (!text) return;

    addMessage(text, "user");
    messageInput.value = "";

    setTimeout(() => {
        addMessage(
            "That's an interesting idea. I can help you explore it, organize the details, and turn it into a clear plan.",
            "ai"
        );
    }, 650);
}

// Add a message to the chat
function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = `message ${type}`;

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.textContent = text;

    message.appendChild(bubble);
    messages.appendChild(message);

    document.querySelector(".chat-content").scrollTo({
        top: document.querySelector(".chat-content").scrollHeight,
        behavior: "smooth"
    });
}

// Send button
sendBtn.addEventListener("click", sendMessage);

// Enter to send, Shift + Enter for a new line
messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

// Auto-resize textarea
messageInput.addEventListener("input", () => {
    messageInput.style.height = "auto";
    messageInput.style.height =
        Math.min(messageInput.scrollHeight, 100) + "px";
});

// New conversation
newChatBtn.addEventListener("click", () => {
    messages.innerHTML = "";
    messageInput.value = "";
    messageInput.style.height = "auto";
    messageInput.focus();
});

// Suggested prompts
suggestions.forEach((suggestion) => {
    suggestion.addEventListener("click", () => {
        messageInput.value = suggestion.textContent
            .replace(/^.\s*/, "")
            .trim();

        messageInput.focus();
    });
});

// Chat selection
chatItems.forEach((item) => {
    item.addEventListener("click", () => {
        chatItems.forEach((chat) => chat.classList.remove("active"));
        item.classList.add("active");
    });
});

// Search chats
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    chatItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? "flex" : "none";
    });
});

// Mobile sidebar
menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// Close mobile sidebar when selecting a chat
chatItems.forEach((item) => {
    item.addEventListener("click", () => {
        if (window.innerWidth <= 760) {
            sidebar.classList.remove("open");
        }
    });
});