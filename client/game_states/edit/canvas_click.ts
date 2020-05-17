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

        if (selPiece.animated) {
          delete map.piecesAnimated[selPiece.name + ',' + selPiece.id];
        }
        else {
          delete map.pieces[selPiece.name + ',' + selPiece.id];
        }
        delete map.pieceMap[gridPos[0] + ',' + gridPos[1]];

        let newId = Math.floor(Math.random() * 10000000);
        let newName = pieceTypeNameSel + ',' + newId;
        let newPiece = pieceTypes[pieceTypeNameSel].createPiece(newId, gridPos,
          [selPiece.box.x, selPiece.box.y]);

        let dSprite = new PIXI.Sprite(PIXI.utils.TextureCache[newPiece.spriteNames[0]]);
        dSprite.x = newPiece.box.x;
        dSprite.y = newPiece.box.y;
        dSprite.width = newPiece.box.width;
        dSprite.height = newPiece.box.height;
        sprites[newName] = dSprite;
        pixiContainers[PieceTypeNames.BACKGROUND].addChild(dSprite);

        if (newPiece.animated) {
          map.piecesAnimated[newName] = newPiece;
          map.pieceMap[(gridPos[0] + ',' + gridPos[1])] = { mapName: 'piecesAnimated',
            pieceName: newName };
        }
        else {
          map.pieces[newName] = newPiece;
          map.pieceMap[(gridPos[0] + ',' + gridPos[1])] = { mapName: 'pieces',
            pieceName: newName };
        }
      }
  });
}
