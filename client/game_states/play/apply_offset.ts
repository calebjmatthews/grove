import Offset from '../../models/offset';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
import { pixiContainers } from '../../instances/pixi_containers';
import { PieceNames } from '../../enums/piece_names';

export function applyOffset(delta: number, run: boolean = false) {
  let oldOffset = new Offset(map.offset);
  if ((oldOffset.vx != 0 || oldOffset.vy != 0) || run) {

    let newOffset = new Offset(map.offset);
    newOffset.x += Math.floor((oldOffset.vx * (1 + delta)));
    newOffset.y += Math.floor((oldOffset.vy * (1 + delta)));
    map.offset = newOffset;

    let playerXY = map.piecePlayer.getXYAfterOffset([newOffset.x, newOffset.y]);
    pixiContainers[map.piecePlayer.name].x = playerXY[0];
    pixiContainers[map.piecePlayer.name].y = playerXY[1];

    Object.keys(map.piecesAnimated).map((pieceName) => {
      let piece = map.piecesAnimated[pieceName];
      let pieceXY = piece.getXYAfterOffset([newOffset.x, newOffset.y]);
      piece.spriteNames.map((spriteName) => {
        let sprite = sprites[spriteName + ',' + piece.id];
        sprite.x = pieceXY[0];
        sprite.y = pieceXY[1];
      });
    });

    pixiContainers[PieceNames.BACKGROUND].x = newOffset.x;
    pixiContainers[PieceNames.BACKGROUND].y = newOffset.y;
  }
}
