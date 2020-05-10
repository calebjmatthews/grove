import Offset from '../../models/offset';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';

export function applyOffset(delta: number) {
  let oldOffset = new Offset(map.offset);
  if (oldOffset.vx != 0 || oldOffset.vy != 0) {
    let newOffset = new Offset(map.offset);
    newOffset.x += (oldOffset.vx * (1 + delta));
    newOffset.y += (oldOffset.vy * (1 + delta));
    map.offset = newOffset;

    let playerXY = map.piecePlayer.getXYAfterOffset([newOffset.x, newOffset.y]);
    map.piecePlayer.spriteNames.map((spriteName) => {
      let sprite = sprites[spriteName];
      sprite.x = playerXY[0];
      sprite.y = playerXY[1];
    });

    Object.keys(map.piecesAnimated).map((pieceName) => {
      let piece = map.piecesAnimated[pieceName];
      let pieceXY = piece.getXYAfterOffset([newOffset.x, newOffset.y]);
      piece.spriteNames.map((spriteName) => {
        let sprite = sprites[spriteName + ',' + piece.id];
        sprite.x = pieceXY[0];
        sprite.y = pieceXY[1];
      });
    });

    Object.keys(map.pieces).map((pieceName) => {
      let piece = map.pieces[pieceName];
      let pieceXY = piece.getXYAfterOffset([newOffset.x, newOffset.y]);
      let sprite = sprites[(piece.spriteNames[0] + ',' + piece.id)];
      sprite.x = pieceXY[0];
      sprite.y = pieceXY[1];
    });
  }
}
