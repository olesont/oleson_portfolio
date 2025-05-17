const canvas = document.getElementById("pong-canvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("start-btn");
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");
const resetBtn = document.getElementById("reset-btn");

const paddle = [
  { x: 20, y: canvas.height / 2 - 40 },
  { x: canvas.width - 30, y: canvas.height / 2 - 40 },
];
const paddleWidth = 10,
  paddleHeight = 80,
  paddleSpeed = 5;
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 8,
  speedX: 2,
  speedY: 1.5,
};
let score = [0, 0];
let running = false;

const keys = { w: false, s: false, ArrowUp: false, ArrowDown: false };

function drawInitial() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.fillRect(paddle[0].x, paddle[0].y, paddleWidth, paddleHeight);
  ctx.fillRect(paddle[1].x, paddle[1].y, paddleWidth, paddleHeight);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.fillRect(paddle[0].x, paddle[0].y, paddleWidth, paddleHeight);
  ctx.fillRect(paddle[1].x, paddle[1].y, paddleWidth, paddleHeight);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
}

function movePaddles() {
  if (keys.w) paddle[0].y = Math.max(0, paddle[0].y - paddleSpeed);
  if (keys.s)
    paddle[0].y = Math.min(
      canvas.height - paddleHeight,
      paddle[0].y + paddleSpeed,
    );
  if (keys.ArrowUp) paddle[1].y = Math.max(0, paddle[1].y - paddleSpeed);
  if (keys.ArrowDown)
    paddle[1].y = Math.min(
      canvas.height - paddleHeight,
      paddle[1].y + paddleSpeed,
    );
}

function moveBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.speedY = -ball.speedY;
  }

  [0, 1].forEach((i) => {
    let px = paddle[i].x,
      py = paddle[i].y;
    if (
      ball.x + (i ? 1 : -1) * ball.radius > px &&
      ball.x + (i ? 1 : -1) * ball.radius < px + paddleWidth &&
      ball.y > py &&
      ball.y < py + paddleHeight
    ) {
      ball.speedX = -ball.speedX;
      ball.x = px + (i ? -ball.radius : paddleWidth + ball.radius);
    }
  });

  if (ball.x - ball.radius < 0) {
    score[1]++;
    player2Score.textContent = score[1];
    resetBall(false);
  }
  if (ball.x + ball.radius > canvas.width) {
    score[0]++;
    player1Score.textContent = score[0];
    resetBall(true);
  }
}

function resetBall(toRight = true) {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  let angle;
  do {
    angle = (Math.random() - 0.5) * (Math.PI / 2);
  } while (Math.abs(Math.cos(angle)) > 0.95);
  let base = toRight ? 0 : Math.PI;
  let a = base + angle;
  ball.speedX = Math.round(Math.cos(a) * 3) || (toRight ? 3 : -3);
  ball.speedY = Math.round(Math.sin(a) * 3) || (Math.sin(a) > 0 ? 2 : -2);
}

function gameLoop() {
  if (!running) return;
  movePaddles();
  moveBall();
  drawGame();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.key in keys) keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key in keys) keys[e.key] = false;
});

startBtn.addEventListener("click", () => {
  score = [0, 0];
  player1Score.textContent = "0";
  player2Score.textContent = "0";
  paddle[0].y = paddle[1].y = canvas.height / 2 - 40;
  resetBall(true);
  running = true;
  gameLoop();
});

resetBtn.addEventListener("click", () => {
  running = false;
  score = [0, 0];
  player1Score.textContent = "0";
  player2Score.textContent = "0";
  paddle[0].y = paddle[1].y = canvas.height / 2 - 40;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speedX = 3;
  ball.speedY = 2;
  drawInitial();
});

drawInitial();