// تعريف الردود المسبقة
const botResponses = {
    "السلام عليكم": "وعليكم السلام! كيف أقدر أساعدك؟",
    "كيف حالك؟": "أنا بخير، شكراً! وأنت؟",
    "ما هو اسمك؟": "أنا روبوت دردشة بسيط 😊.",
    "شكراً": "على الرحب والسعة!",
    "وداعاً": "إلى اللقاء!"
};

// التعامل مع إرسال الرسائل
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage("user", userMessage);
        getBotResponse(userMessage);
        userInput.value = "";
    }
});

function addMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(message) {
    const response = botResponses[message] || "عذراً، لم أفهم سؤالك.";
    setTimeout(() => {
        addMessage("bot", response);
    }, 500); // تأخير بسيط لتقليد الرد الطبيعي
}
