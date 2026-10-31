const timerDisplay = document.querySelector("#timer-display");
const startTimerButton = document.querySelector("#start-timer");
const pauseTimerButton = document.querySelector("#pause-timer");
const resetTimerButton = document.querySelector("#reset-timer");

let elapsedMilliseconds = 0;
let startedAt = 0;
let timerInterval = null;

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

function updateTimer() {
  timerDisplay.textContent = formatTime(elapsedMilliseconds + Date.now() - startedAt);
}

startTimerButton.addEventListener("click", () => {
  if (timerInterval !== null) {
    return;
  }

  startedAt = Date.now();
  timerInterval = window.setInterval(updateTimer, 200);
  startTimerButton.disabled = true;
  pauseTimerButton.disabled = false;
});

pauseTimerButton.addEventListener("click", () => {
  if (timerInterval === null) {
    return;
  }

  elapsedMilliseconds += Date.now() - startedAt;
  window.clearInterval(timerInterval);
  timerInterval = null;
  timerDisplay.textContent = formatTime(elapsedMilliseconds);
  startTimerButton.disabled = false;
  pauseTimerButton.disabled = true;
});

resetTimerButton.addEventListener("click", () => {
  if (timerInterval !== null) {
    window.clearInterval(timerInterval);
    timerInterval = null;
  }

  elapsedMilliseconds = 0;
  timerDisplay.textContent = "00:00:00";
  startTimerButton.disabled = false;
  pauseTimerButton.disabled = true;
});
