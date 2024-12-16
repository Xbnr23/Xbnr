const video = document.getElementById('videoPlayer');
const syncButton = document.getElementById('syncButton');

// الاتصال بالخادم
const socket = new WebSocket('ws://localhost:8080');

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

// استقبال الرسائل من الخادم
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'play') {
    video.currentTime = data.currentTime;
    video.play();
  } else if (data.type === 'pause') {
    video.currentTime = data.currentTime;
    video.pause();
  } else if (data.type === 'seek') {
    video.currentTime = data.currentTime;
  }
};

// زر المزامنة
syncButton.addEventListener('click', () => {
  socket.send(JSON.stringify({ type: 'sync', currentTime: video.currentTime }));
});
