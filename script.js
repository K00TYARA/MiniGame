const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEL = document.querySelector("#time");
const board = document.querySelector("#board");
let checkbox = document.querySelector("#flexSwitchCheckDefault");
const colors = [
  "#ff8450",
  "#70ff50",
  "#50fbff",
  "#9a50ff",
  "#f5ff50",
  "#ff50f2",
];
let time = 0;
let score = 0;
let seconds, minutes;
let interval;

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = +e.target.getAttribute("data-time");
    startGame();
  }
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  winTheGame();
  interval = setInterval(decreaseTime, 1000);
  screens[1].classList.add("up");
  timeEL.parentNode.classList.remove("hide");
  createRandomCircle();
  breakTime(time);
  setTime();
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    time--;
    breakTime(time);

    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    setTime();
  }
}

function breakTime(time) {
  seconds = time % 60;
  minutes = Math.floor(time / 60);
}

function setTime() {
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  timeEL.innerHTML = `${minutes}:${seconds}`;
}

function finishGame() {
  timeEL.parentNode.classList.add("hide");
  board.innerHTML = `<div class="finishGame"><h1>Score: <span class="primary">${score}</span></h1>
                       <h2 id="restart">Restart</h2></div>`;

  const restart = document.querySelector("#restart");
  restart.addEventListener("click", restartGame);
}

function restartGame() {
  clearInterval(interval);
  screens[1].classList.remove("up");
  board.innerHTML = ``;
  score = 0;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = getRandomColor();

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function winTheGame() {
  function killCircle() {
    const circle = document.querySelector(".circle");

    if (!checkbox.checked) return;

    if (circle) circle.click();
  }

  setInterval(killCircle, 300);
}
