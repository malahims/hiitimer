let timeRemaining = 0;
let timerInterval = null;
let isPaused = false;

// Default times in seconds
let times = {
    slow: 60,
    mod: 90,
    fast: 30
};

// Load saved times
if (localStorage.getItem("hiitTimes")) {
    times = JSON.parse(localStorage.getItem("hiitTimes"));
}

const timerDisplay = document.getElementById("timer");
const pauseButton = document.getElementById("pause");
const customPanel = document.getElementById("custom-panel");

const updateDisplay = () => {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const startTimer = (seconds, gradient) => {
    timeRemaining += seconds;
    document.body.style.background = gradient;

    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (!isPaused) {
                if (timeRemaining > 0) {
                    timeRemaining--;
                    updateDisplay();
                } else {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    document.body.style.background = "black";
                }
            }
        }, 1000);
    }
    updateDisplay();
};

document.getElementById("slow").addEventListener("click", () => startTimer(times.slow, "linear-gradient(145deg, #001f3f, #003366)"));
document.getElementById("mod").addEventListener("click", () => startTimer(times.mod, "linear-gradient(145deg, #2e0854, #4B0082)"));
document.getElementById("fast").addEventListener("click", () => startTimer(times.fast, "linear-gradient(145deg, #5b0000, #8B0000)"));

pauseButton.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "▶️" : "⏸";
});

document.getElementById("reset").addEventListener("click", () => {
    timeRemaining = 0;
    updateDisplay();
    clearInterval(timerInterval);
    timerInterval = null;
    document.body.style.background = "black";
    isPaused = false;
    pauseButton.textContent = "⏸";
});

// Customize button toggle
document.getElementById("customize").addEventListener("click", () => {
    customPanel.classList.toggle("hidden");
    document.getElementById("slow-time").value = times.slow;
    document.getElementById("mod-time").value = times.mod;
    document.getElementById("fast-time").value = times.fast;
});

// Save custom times
document.getElementById("save-times").addEventListener("click", () => {
    times.slow = parseInt(document.getElementById("slow-time").value, 10);
    times.mod = parseInt(document.getElementById("mod-time").value, 10);
    times.fast = parseInt(document.getElementById("fast-time").value, 10);
    localStorage.setItem("hiitTimes", JSON.stringify(times));
    customPanel.classList.add("hidden");
});

updateDisplay();
