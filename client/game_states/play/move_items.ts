import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';

export function moveItems(delta: number) {
  Object.keys(map.piecesItem).map((pieceName) => {
    let piece = map.piecesItem[pieceName];
    let posChanged = false;
    if (Math.abs(piece.box.vx) > 0) {
      piece.box.x += (piece.box.vx * delta);
      piece.box.vx *= 0.95;
      if (Math.abs(piece.box.vx) < 0.1) {
        piece.box.vx = 0;
      }
      posChanged = true;
    }
    if (piece.box.vy != 0) {
      piece.box.y += (piece.box.vy * delta);
      if (piece.box.y > piece.box.originY) {
        if (piece.box.lastVY < -0.45) {
          piece.box.vy = (piece.box.lastVY * 0.7);
          piece.box.lastVY = piece.box.vy;
        }
        else {
          piece.box.vy = 0;
        }
      }
      else {
        piece.box.vy += 0.3;
      }
      posChanged = true;
    }

    if (posChanged) {
      let sprite = sprites[piece.spriteNames[0] + ',' + piece.id];
      sprite.x = piece.box.x/3;
      sprite.y = piece.box.y/3;
    }
  });
}
