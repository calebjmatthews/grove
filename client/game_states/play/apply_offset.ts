import Offset from '../../models/offset';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
import { pixiContainers } from '../../instances/pixi_containers';
import { PieceTypeNames } from '../../enums/piece_type_names';

export function applyOffset(delta: number, run: boolean = false) {
  let oldOffset = new Offset(map.offset);
  if ((oldOffset.vx != 0 || oldOffset.vy != 0) || run) {

    let newOffset = new Offset(map.offset);
    newOffset.x += Math.floor((oldOffset.vx * (1 + delta)));
    newOffset.y += Math.floor((oldOffset.vy * (1 + delta)));
    map.offset = newOffset;

    let playerXY = map.piecePlayer.getXYAfterOffset([newOffset.x, newOffset.y]);
    pixiContainers[map.piecePlayer.typeName].x = playerXY[0];
    pixiContainers[map.piecePlayer.typeName].y = playerXY[1];

    pixiContainers[PieceTypeNames.BACKGROUND].x = newOffset.x;
    pixiContainers[PieceTypeNames.BACKGROUND].y = newOffset.y;
  }
}
