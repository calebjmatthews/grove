import * as PIXI from 'pixi.js';
import { rubbleParticlesCreate } from './particle/rubble';
import Box from '../../models/box';
import PlayEvent from '../../models/play_event';
import Piece from '../../models/piece';
import PieceAnimated from '../../models/piece_animated';
import Map from '../../models/map';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
import { pixiContainers } from '../../instances/pixi_containers';
import { pieceTypes } from '../../instances/piece_types';
import { Directions } from '../../enums/directions';
import { PlayerStatuses } from '../../enums/player_statuses';
import { PieceTypeNames } from '../../enums/piece_type_names';

export function actAndAnimatePlayer(pendingBox: Box) {
  let player = map.piecePlayer;
  let pBox = player.box;
  let oldAnimationStep = player.getCurrentAnimationStep();

  let diffX = pBox.x - pendingBox.x;
  let diffY = pBox.y - pendingBox.y;
  let directionOld = player.directionCurrent;
  let directionNew: string = Directions.NONE;
  if (diffY != 0) {
    if (diffY < 0) directionNew = Directions.DOWN;
    else directionNew = Directions.UP;
  }
  else if (diffX != 0) {
    if (diffX < 0) directionNew = Directions.RIGHT;
    else directionNew = Directions.LEFT;
  }
  if (directionNew == Directions.NONE && player.directionPending != directionOld) {
    directionNew = player.directionPending;
  }

  let statusNew = false;
  if (player.statusPending != player.statusCurrent) {
    statusNew = true;
    if (player.statusPending == PlayerStatuses.NORMAL) {
      player.statusCurrent = PlayerStatuses.NORMAL;
    }
    else if (player.statusPending == PlayerStatuses.STRIKING) {
      player.statusCurrent = PlayerStatuses.STRIKING;
      map.playEvents.push(new PlayEvent((pMap) => {
        let targetPos = pMap.getGridPos([player.box.x, player.box.y]);
        switch(player.directionCurrent) {
          case (Directions.DOWN):
          targetPos[1]++;
          break;
          case (Directions.LEFT):
          targetPos[0]--;
          break;
          case (Directions.UP):
          targetPos[1]--;
          break;
          case (Directions.RIGHT):
          targetPos[0]++;
          break;
        }
        let targetPiece = pMap.getPieceByGridPos(targetPos);
        if (targetPiece) {
          let targetType = pieceTypes[targetPiece.typeName];
          if (targetPiece.typeName == PieceTypeNames.BUSH) {
            map.destroyPiece(targetPiece, pixiContainers, sprites);
            let particleGroup = rubbleParticlesCreate(10,
              [(targetPiece.box.x + targetPiece.box.width/2),
                (targetPiece.box.y + targetPiece.box.height/2)]);
            pMap.particleGroups.push(particleGroup);
          }
        }
        player.statusPending = PlayerStatuses.NORMAL;
        return pMap;
      }, (24-1)));
    }
  }

  let newStepIndex = player.ageAnimationByDirectionAndStatus(directionNew, statusNew);
  if (newStepIndex != null) {
    let animStepMap = player.directionAnimMap;
    if (player.statusCurrent == PlayerStatuses.STRIKING) {
      animStepMap = player.strikeAnimMap;
    }
    let newAnimationStep = animStepMap[player.directionCurrent][newStepIndex];
    sprites[player.spriteNames[oldAnimationStep.spriteIndex]].visible = false;
    sprites[player.spriteNames[newAnimationStep.spriteIndex]].visible = true;
  }
  pBox.x = pendingBox.x;
  pBox.y = pendingBox.y;
  pixiContainers[player.typeName].x = pendingBox.x + map.offset.x;
  pixiContainers[player.typeName].y = pendingBox.y + map.offset.y;
}
