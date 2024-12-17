const videoPlayer = document.getElementById('videoPlayer');
const playPauseButton = document.getElementById('playPause');
const syncButton = document.getElementById('sync');
const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const videoUrlInput = document.getElementById('videoUrl');
const loadVideoButton = document.getElementById('loadVideo');

// Play/Pause functionality
playPauseButton.addEventListener('click', () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
});

// Load video from URL
loadVideoButton.addEventListener('click', () => {
  const videoUrl = videoUrlInput.value.trim();
  if (videoUrl) {
    videoPlayer.src = videoUrl;
    videoPlayer.play();
  } else {
    alert('يرجى إدخال رابط فيديو صالح.');
  }
});

// Sync functionality (Dummy example)
syncButton.addEventListener('click', () => {
  alert(`توقيت الفيديو الحالي: ${videoPlayer.currentTime} ثانية`);
});

// Chat functionality
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    const chatMessage = document.createElement('p');
    chatMessage.textContent = `أنت: ${message}`;
    chatBox.appendChild(chatMessage);
    messageInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
    // يمكنك هنا إرسال الرسالة للسيرفر لإعلام الطرف الآخر
  }
}
