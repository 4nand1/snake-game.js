const GRID = 10;

// 10×10 нүд үүсгэх
const board = document.querySelector(".board");
for (let i = 0; i < GRID * GRID; i++) {
  const d = document.createElement("div");
  d.className = "cell";
  board.appendChild(d);
}
const cells = document.querySelectorAll(".cell");
const scoreEl = document.getElementById("score");

function toIndex(x, y) {
  return y * GRID + x;
}
function inBounds(p) {
  return p.x >= 0 && p.y >= 0 && p.x < GRID && p.y < GRID;
}

let snake = [
  { x: 2, y: 0 }, // толгой
  { x: 1, y: 0 },
  { x: 0, y: 0 },
];

let dir = { dx: 1, dy: 0 }; // анхны чиглэл: баруун
let nextDir = { dx: 1, dy: 0 }; // дараагийн тикт хэрэгжих чиглэл
let food = null;
let score = 0;

function isOnSnake(p) {
  return snake.some((seg) => seg.x === p.x && seg.y === p.y);
}

function spawnFood() {
  // хоосон нүднүүдээс санамсаргүй сонго
  while (true) {
    const p = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    };
    if (!isOnSnake(p)) return p;
  }
}

function clearBoard() {
  board
    .querySelectorAll(".snake")
    .forEach((el) => el.classList.remove("snake"));
  board.querySelectorAll(".food").forEach((el) => el.classList.remove("food"));
}

function paint() {
  // хоол
  if (food) cells[toIndex(food.x, food.y)].classList.add("food");
  // могой
  snake.forEach((seg) => cells[toIndex(seg.x, seg.y)].classList.add("snake"));
}

function gameOver() {
  console.log("Game Over");
  clearInterval(timer);
}

function step() {
  // keyboard-аас орж ирсэн шинэ чиглэлийг энэ тикт баталгаажуулна
  dir = nextDir;

  // дараагийн толгой
  const head = snake[0];
  const next = { x: head.x + dir.dx, y: head.y + dir.dy };

  // мөргөлт шалгах: хананд эсвэл өөр дээрээ
  if (
    !inBounds(next) ||
    snake.some((seg) => seg.x === next.x && seg.y === next.y)
  ) {
    gameOver();
    return;
  }

  // хөдөлгөөн
  snake.unshift(next);

  const ate = food && next.x === food.x && next.y === food.y;
  if (ate) {
    score++;
    scoreEl.textContent = score;
    food = spawnFood(); // урт нэмэгдэнэ (pop хийхгүй)
  } else {
    snake.pop(); // хоол идээгүй бол сүүлийг ав
  }

  // дахин зур
  clearBoard();
  if (!food) food = spawnFood();
  paint();
}

// анхны зурсан төлөв
food = spawnFood();
paint();

// удирдлага (эсрэг чиглэлийг хориглоно)
addEventListener("keydown", (e) => {
  const k = e.key;
  if (k === "ArrowUp" && dir.dy !== 1) nextDir = { dx: 0, dy: -1 };
  if (k === "ArrowDown" && dir.dy !== -1) nextDir = { dx: 0, dy: 1 };
  if (k === "ArrowLeft" && dir.dx !== 1) nextDir = { dx: -1, dy: 0 };
  if (k === "ArrowRight" && dir.dx !== -1) nextDir = { dx: 1, dy: 0 };
});

const timer = setInterval(step, 140); // хурдыг энд өөрчилж болно
