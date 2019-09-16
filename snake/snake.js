window.onload = function() {
  var stage = document.getElementById('stage');
  var context = stage.getContext('2d');
  var score = 0;
  var bestScore = 0;
  var direction = '';
  var continued = false;
  var endGame = false;

  var velocity = 200;
  setInterval(game, velocity);

  document.addEventListener('keydown', keyPush);
  document.getElementById('restart').addEventListener('click', startAgain);
  
  var snake = 1;
  var snakeX = snakeY = 0;
  var positionX = 3; 
  var positionY = 3;
  var sizePiece = 20;
  var pieceQuantity = 30;

  var tail = 5;
  var trail = [];
  
  var appleX = Math.floor(Math.random() * pieceQuantity);
  var appleY = Math.floor(Math.random() * pieceQuantity);

  function game() {
    positionX += snakeX;
    positionY += snakeY;

    if (positionX < 0) {
      positionX = pieceQuantity - 1;
    }
    if (positionX > pieceQuantity - 1) {
      positionX = 0;
    }
    if (positionY < 0) {
      positionY = pieceQuantity - 1;
    }
    if (positionY > pieceQuantity - 1) {
      positionY = 0;
    }

    context.fillStyle = 'black';
    context.fillRect(0,0, stage.width, stage.height);

    context.fillStyle = 'red';
    context.fillRect(appleX * sizePiece, appleY * sizePiece, sizePiece, sizePiece);

    context.fillStyle = 'gray';

    for (var i = 0; i < trail.length; i++) {
      context.fillRect(trail[i].x * sizePiece, trail[i].y * sizePiece, sizePiece-1, sizePiece-1);
      
      if (continued && trail[i].x == positionX && trail[i].y == positionY) {
        gameOver();
      }
    }

    trail.push({x:positionX, y:positionY})

    while (trail.length > tail) {
      trail.shift();
    }

    if (appleX == positionX && appleY == positionY) {
      tail ++;
      score += 1;

      if (bestScore < score) {
        bestScore = score;
      }
      restartScore();

      appleX = Math.floor(Math.random() * pieceQuantity);
      appleY = Math.floor(Math.random() * pieceQuantity);
    }

  }

  function keyPush(event) {
    if (!endGame) {
      continued = true;
    }

    switch(event.keyCode) {
      case 37: // Left
      if (direction != 'RIGHT') {
        direction = 'LEFT'
        moveSnake();
      }
      break;

      case 38: // up
      if (direction != 'DOWN') {
        direction = 'UP'
        moveSnake();
      }
      break;

      case 39: // right
      if (direction != 'LEFT') {
        direction = 'RIGHT'
        moveSnake();
      }
      break;

      case 40: // down
      if (direction != 'UP') {
        direction = 'DOWN'
        moveSnake();
      }
      break;

      default:
        break;
    }
  }

  function moveSnake() {
    switch(direction) {
      case 'LEFT':
        snakeX = - snake;
        snakeY = 0;
        break;
      
      case 'UP':
        snakeX = 0;
        snakeY = - snake;
        break;

      case 'RIGHT':
        snakeX = snake;
        snakeY = 0;
        break;

      case 'DOWN':
        snakeX = 0;
        snakeY = snake;
        break;
        
      default:
        break;
    }
  }

  function restartScore() {
   document.getElementById('score').innerHTML = score; 
   document.getElementById('bestScore').innerHTML = bestScore;

  }

  function gameOver() {
    document.getElementById('gameOver').style = 'display:inline';
    snakeX = snakeY = 0;

    tail = 5;
    snake = 0;

    continued = false;
    endGame = true;
  }

  function startAgain() {
    score = 0;
    restartScore();
    positionX = 3; 
    positionY = 3;
    snake = 1;
    snakeX = 1;
    endGame = false;
    continued = true;
    document.getElementById('gameOver').style = 'display:none';
  }
}