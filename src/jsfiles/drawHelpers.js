export function drawRectangle(ctx, x, y, width, height, fillStyle){
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.closePath();
}

//context.arc(x,y,r,sAngle,eAngle,counterclockwise);
export function drawCircle(ctx, x, y, rad, startAngle, endAngle, fillStyle){
  ctx.beginPath();
  ctx.arc(x, y, rad, startAngle, endAngle);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.closePath();
}

//fillText(text,x,y)
export function drawText(ctx, text, x, y, textAlign, font, fillStyle){
  ctx.font = font;
  ctx.textAlign = textAlign;
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = fillStyle;
  ctx.fillText(text, x, y);
}

export function drawRoundedReactangle(ctx, x, y, width, height, fillStyle, borderRadius){
  ctx.beginPath();
  ctx.lineJoin = "round";
  ctx.lineWidth = borderRadius;
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = fillStyle;

  // Change origin and dimensions to match true size (a stroke makes the shape a bit larger)
  ctx.strokeRect(x+(borderRadius/2), y+(borderRadius/2), width-borderRadius, height-borderRadius);
  ctx.fillRect(x+(borderRadius/2), y+(borderRadius/2), width-borderRadius, height-borderRadius);
  //ctx.stroke();
  //ctx.fill();
  ctx.closePath();
}
