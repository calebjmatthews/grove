import * as PIXI from 'pixi.js';
import { pieceTypeNameSel } from './piece_type_select';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
import { pixiContainers } from '../../instances/pixi_containers';
import { pieceTypes } from '../../instances/piece_types';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { utils } from '../../instances/utils';

export function handleCanvasClick() {
  let canvas = document.getElementById('center');
  canvas.addEventListener("click", (ev) => {
    if (pieceTypeNameSel != null) {
      let pieceTypeSel: any = {};
      if (pieceTypeNameSel != 'Delete') {
        pieceTypeSel = pieceTypes[pieceTypeNameSel];
      }
      let gridPos = map.getGridUpperLeftPos([(ev.x - map.offset.x),
        (ev.y - map.offset.y)])
      let selPiece = map.getPieceByGridPos(gridPos);
      if (selPiece && pieceTypeSel.growthStages == undefined) {
        map.destroyPiece(selPiece, pixiContainers, sprites);
      }
      else if (pieceTypeSel.growthStages != undefined) {
        map.destroyPieceCrop(selPiece, pixiContainers, sprites);
      }
      if (pieceTypeNameSel != 'Delete') {
        let newId = Math.floor(utils.rand() * 10000000);
        map.createAndDisplayPiece(pieceTypeNameSel, (gridPos[0] + ',' + gridPos[1]),
          newId, pieceTypes, pixiContainers, sprites);
      }
    }
  });
}
