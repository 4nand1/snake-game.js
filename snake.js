const GRID = 10;

// 10×10 нүдийг үүсгэнэ
const board = document.querySelector(".board");
for (let i = 0; i < GRID * GRID; i++) {
  const d = document.createElement("div");
  d.className = "cell";
  board.appendChild(d);
}

const cells = document.querySelectorAll(".cell");
console.log("cells:", cells.length); // 100 байх ёстой

function toIndex(x, y) {
  return y * GRID + x;
}

// Эхний могой (урт 3)
let snake = [
  { x: 2, y: 0 }, // толгой
  { x: 1, y: 0 },
  { x: 0, y: 0 },
];

function clearSnake() {
  board
    .querySelectorAll(".snake")
    .forEach((el) => el.classList.remove("snake"));
}
function paintSnake() {
  snake.forEach((seg) => {
    const idx = toIndex(seg.x, seg.y);
    cells[idx].classList.add("snake");
  });
}

// Анхны харагдалт
paintSnake();

function step() {
  // Дараагийн толгой (баруун тийш)
  const head = snake[0];
  const next = { x: head.x + 1, y: head.y };

  // Хана шалгах
  if (next.x >= GRID) {
    console.log("Game Over");
    clearInterval(timer);
    return;
  }

  // Хөдлөх: шинэ толгой → урд | сүүлийг авна (урт тогтмол)
  clearSnake();
  snake.unshift(next);
  snake.pop();
  paintSnake();
}

const timer = setInterval(step, 500);
