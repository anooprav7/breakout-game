'use strict'
import './_import_assets';
import * as drawHelper from './drawHelpers';
import * as CDHelper from './collisionDetectionHelper';
import * as bricksHelper from './brickLevelsHelper';
import { GAME_START, GAME_RUNNING, GAME_OVER_WON, GAME_OVER_LOST } from './constants';

//Game Variables
let gameState = GAME_START; //0-StartScreen 1-GameProgressing  2-WON 3-LOST
let lives= 3, score= 0;

// canvas variables
let canvas, ctx;
let boardWidth, boardHeight;

//Brick Variables
let bricks = [], ball, paddle;

//event signals
let rightPressed= false, leftPressed= false;

//Event Listeners
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}


/*
function keyListener(){
  let pressedKeys = [];
  let keydown = function(e) { pressedKeys[e.keyCode] = true };
  let keyup = function(e) { pressedKeys[e.keyCode] = false };
  document.addEventListener("keydown", keydown );
  document.addEventListener("keyup", keyup );
}
keyListener.prototype.isPressed = function(key){
  return this.pressedKeys[key] ? true : false;
};
let keys = new keyListener();
*/
/******************************************************************************
* Initialisations
*
*
******************************************************************************/

function initializeCanvas(){
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');

  if(window.innerWidth > window.innerHeight) {
    boardHeight = window.innerHeight * 0.95;
    boardWidth = boardHeight / 1.2;
  }else {
    boardWidth = window.innerWidth * 0.95;
    boardHeight = boardWidth / 1.2;
  }
  canvas.height = boardHeight;
  canvas.width = boardWidth;
}

function initializeBricks(levelNo){ bricksHelper.initializeBricks(bricks, levelNo, boardWidth, boardHeight);}

function initializePaddleAndBall(){
  let paddleWidth= boardWidth/5, paddleHeight= 10, paddleSpeed= 11;
  ball = {
    x: boardWidth/2, y: boardHeight/2, r: 10, col: 'blue', dx: 1, dy: -8
  };
  paddle = {
    height: paddleHeight, width: paddleWidth,
    x: (boardWidth - paddleWidth)/2, y: (boardHeight - paddleHeight-7),
    speed: paddleSpeed
  };
}

/******************************************************************************
* Draw Functions
*
*
******************************************************************************/

function drawBricks(){
  for(let i=0; i<bricks.length; i++)
    drawHelper.drawRectangle(ctx, bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h, bricks[i].color);
}
function drawBall() { drawHelper.drawCircle(ctx, ball.x, ball.y, ball.r, 0, Math.PI * 2, 'white'); }
function drawPaddle(){ drawHelper.drawRectangle(ctx, paddle.x, paddle.y, paddle.width, paddle.height, 'white'); }
function drawScoreLives(){
  const textSize = 0.025 * boardHeight;
  const textY = (0.04 * boardHeight);
  drawHelper.drawText(ctx, 'Lives - '+lives, textSize, textY, 'left', textSize+'px Arial', 'white');
  drawHelper.drawText(ctx, 'Score - '+score, (boardWidth - textSize), textY, 'right', textSize+'px Arial', 'white');
}
function draw(){
  ctx.clearRect(0, 0, boardWidth, boardHeight);
  drawScoreLives();
  drawBricks();
  drawBall();
  drawPaddle();
}
function motion(){
  ball.x += ball.dx;
  ball.y += ball.dy;
  if(rightPressed && paddle.x + paddle.width < boardWidth) { paddle.x += paddle.speed;}
  if(leftPressed && paddle.x > 0) { paddle.x -= paddle.speed;}
}

/******************************************************************************
* CollisionDetection
*
*
******************************************************************************/
function CollisionDetection(){
  if( CDHelper.ballCeiling(ball) ) ball.dy = -ball.dy;
  if( CDHelper.ballLeftRightWall(ball, boardWidth) ) ball.dx = -ball.dx;
  if(CDHelper.ballGround(ball, boardHeight)) document.location.reload();
  if(CDHelper.ballPaddleCollision(ball, paddle)) ball.dy = -ball.dy;

}




/******************************************************************************
* Lifecycle Methods
*
*
******************************************************************************/
function gameStart(){
  drawHelper.drawText(ctx, 'PRESS THE [SPACEBAR] TO START A NEW GAME', boardWidth/2, (boardHeight/2)-30, 'center', "16px Arial", 'white');
  drawHelper.drawText(ctx, 'MOVE THE PADDLE WITH < ARROW > KEYS ', boardWidth/2, 2*boardHeight/3, 'center', "14px Arial", 'white');
  draw();
  if(rightPressed || leftPressed)
    gameState = GAME_RUNNING;
}

function displayGameOver(){
  drawHelper.drawText(ctx, 'GAME OVER', boardWidth/2, boardHeight/2, 'center', '30px Arial', 'white');
  gameStarted = false;
}
function continueGame(){
  ball.x= boardWidth/2;
  ball.y= boardHeight - 50;
  ball.dx = 2;
  ball.dy = -8;
  paddle.x = (boardWidth - paddle.width)/2;
}






function loop(){

}



function checkGameStateAndRender(){

  switch (gameState) {
    case GAME_START:
      gameStart();
      break;
    case GAME_RUNNING:
      draw();
      motion();
      break;
    case GAME_OVER_WON:
      break;
    case GAME_OVER_LOST:
      break;
    default:
      console.log('Unknown Game State');
  }

  CollisionDetection();
  requestAnimationFrame(checkGameStateAndRender);
}

function InitializeGame(){
  initializeCanvas();
  initializeBricks(1);
  initializePaddleAndBall();

  checkGameStateAndRender();
  //requestAnimationFrame(draw);
}

window.onload = function() {
  InitializeGame();

}
