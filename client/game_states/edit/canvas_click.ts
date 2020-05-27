import * as PIXI from 'pixi.js';
import { pieceTypeNameSel } from './piece_type_select';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
import { pixiContainers } from '../../instances/pixi_containers';
import { pieceTypes } from '../../instances/piece_types';
import { PieceTypeNames } from '../../enums/piece_type_names';

export function handleCanvasClick() {
  let canvas = document.getElementsByTagName('canvas')[0];
  canvas.addEventListener("click", (ev) => {
    if (pieceTypeNameSel != null) {
      let gridPos = map.getGridUpperLeftPos([(ev.x - map.offset.x),
        (ev.y - map.offset.y)])
      let selPiece = map.getPieceByGridPos(gridPos);
      if (selPiece) {
        map.destroyPiece(selPiece, pixiContainers, sprites);
      }
      if (pieceTypeNameSel != 'Delete') {
        let newId = Math.floor(Math.random() * 10000000);
        map.createAndDisplayPiece(pieceTypeNameSel, (gridPos[0] + ',' + gridPos[1]),
          newId, pieceTypes, pixiContainers, sprites);
      }
    }
  });
}
