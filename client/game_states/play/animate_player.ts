import * as PIXI from 'pixi.js';
import { rubbleParticlesCreate } from './particle/rubble';
import Box from '../../models/box';
import PlayEvent from '../../models/play_event';
import Piece from '../../models/piece';
import PieceAnimated from '../../models/piece_animated';
import Map from '../../models/map';
import { map } from '../../instances/map';
import { player } from '../../instances/player';
import { sprites } from '../../instances/sprites';
import { pixiContainers } from '../../instances/pixi_containers';
import { pieceTypes } from '../../instances/piece_types';
import { noteItemPickup } from './item_note';
import { Directions } from '../../enums/directions';
import { PlayerStatuses } from '../../enums/player_statuses';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { ItemNames } from '../../enums/item_names';

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
    }
    else if (pcPlayer.statusPending == PlayerStatuses.STRIKING) {
      pcPlayer.statusCurrent = PlayerStatuses.STRIKING;
      map.playEvents.push(new PlayEvent((pMap) => {
        let targetPos = pMap.getGridPos([pcPlayer.box.x, pcPlayer.box.y]);
        switch(pcPlayer.directionCurrent) {
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
            targetPiece.durability--;
            let particleNum = 3;
            if (targetPiece.durability <= 0) {
              particleNum = 10;
              map.destroyPiece(targetPiece, pixiContainers, sprites);
              let quantity = Math.floor(Math.random()*3);
              if (quantity > 0) {
                player.addToInventory(ItemNames.SCRAP_WOOD, quantity);
                noteItemPickup(ItemNames.SCRAP_WOOD, quantity);
              }
            }
            let particleGroup = rubbleParticlesCreate(particleNum,
              [(targetPiece.box.x + targetPiece.box.width/2),
                (targetPiece.box.y + targetPiece.box.height/2)]);
            pMap.particleGroups.push(particleGroup);
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
