const welcome = document.getElementById("welcome");
const invitation = document.getElementById("invitation");
const openBtn = document.getElementById("openBtn");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("birthdayMusic");

openBtn.addEventListener("click", async () => {
  welcome.style.display = "none";
  invitation.classList.remove("hidden");
  launchConfetti(80);

  // Mobile browsers require a user gesture before audio can play.
  try {
    await music.play();
    musicBtn.textContent = "🔊";
  } catch (e) {
    musicBtn.textContent = "🔇";
  }
});

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = "🔊";
    } catch (e) {}
  } else {
    music.pause();
    musicBtn.textContent = "🔇";
  }
});

// 15 September 2026, 7:00 PM. The visitor's local time is used.
const partyTime = new Date("2026-09-15T19:00:00");

function updateCountdown() {
  const now = new Date();
  let diff = partyTime - now;

  if (diff <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("partyMessage").textContent =
      "🎉 It's party time! Happy Birthday Ezzoo! 🎂";
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(mins).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

function launchConfetti(count) {
  const layer = document.getElementById("confetti");
  const symbols = ["✦", "◆", "●", "★"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.fontSize = (8 + Math.random() * 9) + "px";
    piece.style.animationDuration = (2.5 + Math.random() * 3) + "s";
    piece.style.animationDelay = (Math.random() * .8) + "s";
    piece.style.setProperty("--drift", (Math.random() * 240 - 120) + "px");
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 6000);
  }
}
