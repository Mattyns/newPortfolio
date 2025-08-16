const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
let playing = false;

// define volume inicial baixo
bgMusic.volume = 0.0;

function fadeIn(audio, targetVolume = 0.3, duration = 2000) {
  audio.volume = 0;
  bgMusic.currentTime = 32; // inicia a música a partir do segundo 30
  bgMusic.play();
  audio.play();
  let step = targetVolume / (duration / 50); // ajusta a cada 50ms
  let interval = setInterval(() => {
    if (audio.volume < targetVolume) {
      audio.volume = Math.min(audio.volume + step, targetVolume);
    } else {
      clearInterval(interval);
    }
  }, 50);
}

musicBtn.addEventListener('click', () => {
  if (!playing) {
    fadeIn(bgMusic, 0.3, 2000); // sobe o volume para 0.3 em 2s
    playing = true;
    musicBtn.style.color = "white"; // feedback visual
  } else {
    // fade-out opcional
    bgMusic.pause();
    bgMusic.volume = 0;
    playing = false;
    musicBtn.style.color = "gray";
  }
});