const video = document.getElementById('videoPlayer');
const loadVideoButton = document.getElementById('loadVideoButton');
const videoURLInput = document.getElementById('videoURL');
const syncButton = document.getElementById('syncButton');
const chatBox = document.getElementById('chatBox');
const chatInput = document.getElementById('chatInput');
const sendChatButton = document.getElementById('sendChatButton');

// الاتصال بالخادم
const socket = new WebSocket('ws://localhost:8080');

// تحميل الفيديو من الرابط المدخل
loadVideoButton.addEventListener('click', () => {
  const videoURL = videoURLInput.value.trim();
  if (videoURL) {
    video.src = videoURL;
    video.load();
    socket.send(JSON.stringify({ type: 'load', url: videoURL })); // مشاركة الرابط مع الصديق
  } else {
    alert('يرجى إدخال رابط صالح!');
  }
});

// عند تشغيل الفيديو
video.addEventListener('play', () => {
  socket.send(JSON.stringify({ type: 'play', currentTime: video.currentTime }));
});

// عند إيقاف الفيديو
video.addEventListener('pause', () => {
  socket.send(JSON.stringify({ type: 'pause', currentTime: video.currentTime }));
});

// عند تغيير الوقت
video.addEventListener('seeked', () => {
  socket.send(JSON.stringify({ type: 'seek', currentTime: video.currentTime }));
});

// إرسال رسالة دردشة
sendChatButton.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message) {
    socket.send(JSON.stringify({ type: 'chat', message }));
    addMessageToChatBox('أنت', message); // عرض الرسالة في الدردشة
    chatInput.value = '';
  }
});

// استقبال الرسائل من الخادم
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'load') {
    video.src = data.url;
    video.load();
  } else if (data.type === 'play') {
    video.currentTime = data.currentTime;
    video.play();
  } else if (data.type === 'pause') {
    video.currentTime = data.currentTime;
    video.pause();
  } else if (data.type === 'seek') {
    video.currentTime = data.currentTime;
  } else if (data.type === 'chat') {
    addMessageToChatBox('صديقك', data.message);
  }
};

// عرض الرسائل في الدردشة
function addMessageToChatBox(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${sender}: ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // التمرير للأسفل تلقائيًا
}

// زر المزامنة
syncButton.addEventListener('click', () => {
  socket.send(JSON.stringify({ type: 'sync', currentTime: video.currentTime }));
});
