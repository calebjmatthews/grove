import * as PIXI from 'pixi.js';
import Box from '../../models/box';
import PlayEvent from '../../models/play_event';
import Piece from '../../models/piece';
import Map from '../../models/map';
import { getKeyboardPlay } from '../init/keyboard_play';
import { map } from '../../instances/map';
import { player } from '../../instances/player';
import { sprites } from '../../instances/sprites';
import { pixiContainers } from '../../instances/pixi_containers';
import { pieceTypes } from '../../instances/piece_types';
import { utils } from '../../instances/utils';
import { handleImpact } from './handle_impact';
import { Directions } from '../../enums/directions';
import { PlayerStatuses } from '../../enums/player_statuses';
import { PieceTypeNames } from '../../enums/piece_type_names';

export function actAndAnimatePlayer(pendingBox: Box) {
  let pcPlayer = map.piecePlayer;
  let pBox = map.piecePlayer.box;
  let oldAnimationStep = pcPlayer.getCurrentAnimationStep();

  let diffX = pBox.x - pendingBox.x;
  let diffY = pBox.y - pendingBox.y;
  let directionOld = pcPlayer.directionCurrent;
  let directionNew: string = Directions.NONE;
  if (diffY != 0) {
    if (diffY < 0) directionNew = Directions.DOWN;
    else directionNew = Directions.UP;
  }
  else if (diffX != 0) {
    if (diffX < 0) directionNew = Directions.RIGHT;
    else directionNew = Directions.LEFT;
  }
  if (directionNew == Directions.NONE && pcPlayer.directionPending != directionOld) {
    directionNew = pcPlayer.directionPending;
  }

  let statusNew = false;
  if (pcPlayer.statusPending != pcPlayer.statusCurrent) {
    statusNew = true;
    if (pcPlayer.statusPending == PlayerStatuses.NORMAL) {
      pcPlayer.statusCurrent = PlayerStatuses.NORMAL;
      let keyboard = getKeyboardPlay();
      if (keyboard.z.isDown) {
        pcPlayer.statusPending = PlayerStatuses.STRIKING;
      }
    }
    else if (pcPlayer.statusPending == PlayerStatuses.STRIKING) {
      pcPlayer.statusCurrent = PlayerStatuses.STRIKING;
      map.playEvents.push(new PlayEvent((pMap) => {
        let targetPos = pcPlayer.getGridPosInFront(pMap.getGridPos([pcPlayer.box.x,
          pcPlayer.box.y]));
        let targetCrop = pMap.getCropByGridPos(targetPos);
        if (targetCrop) {
          pMap = handleImpact(targetCrop, pMap);
        }
        else {
          let targetPiece = pMap.getPieceByGridPos(targetPos);
          if (targetPiece) {
            if (targetPiece.breakable != null) {
              pMap = handleImpact(targetPiece, pMap);
            }
          }
          else {
            pMap.createAndDisplayPiece(PieceTypeNames.GRASS,
              (targetPos[0] + ',' + targetPos[1]), Math.floor(utils.rand() * 10000000),
              pieceTypes, pixiContainers, sprites);
            targetPiece = pMap.getPieceByGridPos(targetPos);
            pMap = handleImpact(targetPiece, pMap);
          }
        }
        pcPlayer.statusPending = PlayerStatuses.NORMAL;
        return pMap;
      }, (24-1)));
    }
  }

  let newStepIndex = pcPlayer.ageAnimationByDirectionAndStatus(directionNew, statusNew);
  if (newStepIndex != null) {
    let animStepMap = pcPlayer.directionAnimMap;
    if (pcPlayer.statusCurrent == PlayerStatuses.STRIKING) {
      animStepMap = pcPlayer.strikeAnimMap;
    }
    let newAnimationStep = animStepMap[pcPlayer.directionCurrent][newStepIndex];
    sprites[pcPlayer.spriteNames[oldAnimationStep.spriteIndex]].visible = false;
    sprites[pcPlayer.spriteNames[newAnimationStep.spriteIndex]].visible = true;
  }
  pBox.x = pendingBox.x;
  pBox.y = pendingBox.y;
  pixiContainers.player.x = pendingBox.x + map.offset.x;
  pixiContainers.player.y = pendingBox.y + map.offset.y;
}
