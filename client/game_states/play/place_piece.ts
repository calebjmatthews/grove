import { expendItems } from '../../game_states/play/expend_items';
import { map } from '../../instances/map';
import { pieceTypes } from '../../instances/piece_types/index';
import { pixiContainers } from '../../instances/pixi_containers';
import { sprites } from '../../instances/sprites';
import { utils } from '../../instances/utils';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { ItemTypeNames } from '../../enums/item_type_names';

export function placePiece(pieceTypeName: string) {
  let targetPos = map.piecePlayer.getGridPosInFront(map.getGridPos(
    [map.piecePlayer.box.x, map.piecePlayer.box.y]));
  let targetBg = map.getPieceByGridPos(targetPos);
  if (targetBg) {
    if (targetBg.typeName == PieceTypeNames.TILLED) {
      map.createAndDisplayPiece(pieceTypeName, (targetPos[0] + ',' + targetPos[1]),
        Math.floor(utils.rand() * 10000000), pieceTypes, pixiContainers, sprites);
      expendItems(ItemTypeNames.GRAIN_SEED, 1);
    }
  }
}
