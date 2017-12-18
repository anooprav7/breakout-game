export function ballPaddleCollision(ball, paddle){
  if(( ball.x + ball.r >= paddle.x) &&
     ( ball.x - ball.r <= paddle.x + paddle.width ) &&
     ( ball.y + ball.r >= paddle.y )){
       return true;
     }
     return false;
}
export function ballLeftRightWall(ball, boardWidth){
  if(ball.x+ball.r > boardWidth || ball.x - ball.r <0)
    return true;
  return false;
}
export function ballCeiling(ball){
  if(ball.y- ball.r < 0) return true;
  return false;
}
export function ballGround(ball, boardHeight){
  if(ball.y > boardHeight - ball.r) return true;
  return false;
}
export function ballBrickGrid(ball, bricks){
  for(let i=0; i<bricks.length; i++){
    if( ballBrick(ball, bricks[i]) ){
      ball.dy = -ball.dy;
      bricks.splice(i, 1);
      return true;
    }
  }
}
function ballBrick(Ball, Brick){
  if(
      ( ((Ball.y+Ball.r >= Brick.y) && (Ball.y+Ball.r <= Brick.y + Brick.h))
          || ((Ball.y-Ball.r >= Brick.y) && (Ball.y-Ball.r <= Brick.y + Brick.h))
      ) &&
      ( ((Ball.x+Ball.r >= Brick.x) && (Ball.x+Ball.r <= Brick.x + Brick.w))
          || ((Ball.x-Ball.r >= Brick.x) && (Ball.x-Ball.r <= Brick.x + Brick.w))
      )
   ){
       return true;
}
}
