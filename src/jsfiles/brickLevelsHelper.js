export function initializeBricks(bricks, levelNo, boardWidth, boardHeight){
  let brickGapX = 4 ;
  let brickX = brickGapX,
    brickY = (0.06 * boardHeight);
  let brickWidth = boardWidth / 10 - (brickGapX +1),
    brickHeight = 0.024 *boardHeight;
  let brickGapY = (0.4 * brickHeight);
  const no_bricks = 10;
  let colorList = ["#18582b","#0c905d","#00c78e","#33dbff","#3375ff","#5733ff","#FF7043", "#607D8B", "#E91E63", "#3F51B5"];

  let brick;
  if (levelNo == 1) {
    for (let i = 0; i < no_bricks; i++) {
      brick = {
        x: brickX,
        y: brickY,
        w: brickWidth,
        h: brickHeight,
        color: colorList[Math.floor( Math.random() * colorList.length )]
      };
      bricks.push(brick);
      brickX += brickWidth + brickGapX;
      if (brickX + brickWidth + brickGapX > boardWidth) {
        brickY += brickHeight + brickGapY;
        brickX = brickGapX;
      }
    }
  }
}
