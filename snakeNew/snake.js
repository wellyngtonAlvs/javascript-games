let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box
}
let direction = 'RIGHT';
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box, 
  y: Math.floor(Math.random() * 15 + 1) * box
}

function drawBackground() {
  context.fillStyle = '#454441';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function drawSnake() {
  for (i = 0; i < snake.length; i ++) {
    context.fillStyle = 'white';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = 'red',
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', updateDirection);

function updateDirection(event) {
  if (event.keyCode == 37 && direction != 'RIGHT') direction = 'LEFT';
  if (event.keyCode == 38 && direction != 'DOWN') direction = 'UP';
  if (event.keyCode == 39 && direction != 'LEFT') direction = 'RIGHT';
  if (event.keyCode == 40 && direction != 'UP') direction = 'DOWN';
}

function draw() {
  if (snake[0].x > 15 * box && direction == 'RIGHT') snake[0].x = 0;
  if (snake[0].x < 0 && direction == 'LEFT') snake[0].x = 15 * box;
  if (snake[0].y > 15 * box && direction == 'DOWN') snake[0].y = 0;
  if (snake[0].y < 0 && direction == 'UP') snake[0].y = 15 * box;

  for (i = 1; i < snake.length; i ++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert('Game Over!!!');
    }
  }

  drawBackground();
  drawSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == 'RIGHT') snakeX += box;
  if (direction == 'LEFT') snakeX -= box;
  if (direction == 'UP') snakeY -= box;
  if (direction == 'DOWN') snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);
}

let game = setInterval(draw, 200);