// script.js
let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval;
let running = false;
let laps = [];

const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const display = document.getElementById('display');
const lapTimes = document.getElementById('lapTimes');

function startStop() {
    if (!running) {
        startTime = Date.now() - difference;
        interval = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(interval);
        difference = Date.now() - startTime;
        startStopButton.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(interval);
    startTime = 0;
    difference = 0;
    running = false;
    startStopButton.textContent = 'Start';
    display.textContent = '00:00:00';
    lapTimes.innerHTML = '';
    laps = [];
}

function lap() {
    if (running) {
        laps.push(formatTime(difference));
        displayLaps();
    }
}

function updateDisplay() {
    updatedTime = Date.now() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    let date = new Date(time);
    let minutes = ('0' + date.getUTCMinutes()).slice(-2);
    let seconds = ('0' + date.getUTCSeconds()).slice(-2);
    let milliseconds = ('0' + date.getUTCMilliseconds()).slice(-3, -1);
    return `${minutes}:${seconds}:${milliseconds}`;
}

function displayLaps() {
    lapTimes.innerHTML = laps.map(lap => `<li>${lap}</li>`).join('');
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
