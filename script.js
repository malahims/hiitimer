let timeRemaining = 0;
let timerInterval = null;
let isPaused = false;
const timerDisplay = document.getElementById("timer");
const pauseButton = document.getElementById("pause");

const updateDisplay = () => {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const startTimer = (seconds, color) => {
    timeRemaining += seconds;
    document.body.style.backgroundColor = color;

    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (!isPaused) {
                if (timeRemaining > 0) {
                    timeRemaining--;
                    updateDisplay();
                } else {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    document.body.style.backgroundColor = "black";
                }
            }
        }, 1000);
    }
    updateDisplay();
};

document.getElementById("slow").addEventListener("click", () => startTimer(60, "green"));
document.getElementById("mod").addEventListener("click", () => startTimer(90, "orange"));
document.getElementById("fast").addEventListener("click", () => startTimer(30, "red"));

pauseButton.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "Resume" : "Pause";
});

document.getElementById("reset").addEventListener("click", () => {
    timeRemaining = 0;
    updateDisplay();
    clearInterval(timerInterval);
    timerInterval = null;
    document.body.style.backgroundColor = "black";
    isPaused = false;
    pauseButton.textContent = "Pause";
});

updateDisplay();
