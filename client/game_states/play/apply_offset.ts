import Offset from '../../models/offset';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
import { pixiContainers } from '../../instances/pixi_containers';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { TILE_SIZE } from '../../constants';

export function applyOffset(delta: number, run: boolean = false) {
  let oldOffset = new Offset(map.offset);
  if ((oldOffset.vx != 0 || oldOffset.vy != 0) || run) {

    let newOffset = new Offset(map.offset);
    newOffset.x += Math.floor((oldOffset.vx * (1 + delta)));
    newOffset.y += Math.floor((oldOffset.vy * (1 + delta)));
    if (newOffset.x > 0) { newOffset.x = 0; }
    let mapWidth = map.gridWidth * TILE_SIZE;
    if (newOffset.x < -mapWidth) { newOffset.x = -mapWidth; }
    if (newOffset.y > 0) { newOffset.y = 0; }
    let mapHeight = map.gridHeight * TILE_SIZE;
    if (newOffset.y < -mapHeight) { newOffset.y = -mapHeight; }
    map.offset = newOffset;

    if (map.piecePlayer) {
      let playerXY = map.piecePlayer.getXYAfterOffset([newOffset.x, newOffset.y]);
      pixiContainers.player.x = playerXY[0];
      pixiContainers.player.y = playerXY[1];
    }

    pixiContainers.main.x = newOffset.x;
    pixiContainers.main.y = newOffset.y;
  }
}
