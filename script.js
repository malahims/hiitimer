let timeRemaining = 0;
let timerInterval = null;
const timerDisplay = document.getElementById("timer");

const updateDisplay = () => {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const startTimer = (seconds, color) => {
    timeRemaining += seconds;
    document.body.style.background = color;

    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                document.body.style.background = "black";
            }
        }, 1000);
    }
};

document.getElementById("slow").addEventListener("click", () => startTimer(60, "green"));
document.getElementById("mod").addEventListener("click", () => startTimer(120, "orange"));
document.getElementById("fast").addEventListener("click", () => startTimer(180, "red"));

document.getElementById("reset").addEventListener("click", () => {
    timeRemaining = 0;
    updateDisplay();
    clearInterval(timerInterval);
    timerInterval = null;
    document.body.style.background = "black";
});

updateDisplay();
