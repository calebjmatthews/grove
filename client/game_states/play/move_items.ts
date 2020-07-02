import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';

export function moveItems() {
  Object.keys(map.piecesItem).map((pieceName) => {
    let piece = map.piecesItem[pieceName];
    let posChanged = false;
    if (piece.box.x > 0) {
      piece.box.x += piece.box.vx;
      piece.box.vx *= 0.9;
      if (Math.abs(piece.box.vx) < 0.1) {
        piece.box.vx = 0;
      }
      posChanged = true;
    }
    if (piece.box.y > 0) {
      piece.box.y += piece.box.vy;
      piece.box.vy *= 0.9;
      if (Math.abs(piece.box.vy) < 0.1) {
        piece.box.vy = 0;
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
