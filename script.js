// تعريف الردود المسبقة
const botResponses = {
    "السلام عليكم": "وعليكم السلام! وش تحتاج؟",
    "وش لحوال؟": "رحمة ربي، ونتا لباس؟",
    "وش اسمك؟": "أنا روبوت دردشة بسيط 😊.",
"شكراً": "على الرحب والسعة!",
    "وداعاً": "إلى اللقاء!"
       "حبيت نسوسلك": "تفظل",
};

// المكونات الرئيسية
const sendBtn = document.getElementById("send-btn");
const micBtn = document.getElementById("mic-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// إرسال الرسائل
sendBtn.addEventListener("click", () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        processMessage(userMessage);
        userInput.value = "";
    }
});

// تشغيل الميكروفون
micBtn.addEventListener("click", () => {
    startSpeechRecognition();
});

function processMessage(message) {
    addMessage("user", message);
    getBotResponse(message);
}

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
        speak(response); // تحويل الرد إلى صوت
    }, 500);
}

// تحويل النص إلى صوت
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar"; // اللغة العربية
    speechSynthesis.speak(utterance);
}

// التعرف على الصوت
function startSpeechRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "ar"; // اللغة العربية

    recognition.start();

    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        userInput.value = speechResult;
        processMessage(speechResult);
    };

    recognition.onerror = (event) => {
        console.error("حدث خطأ في التعرف على الصوت:", event.error);
    };
}
