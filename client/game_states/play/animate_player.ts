import Box from '../../models/box';
import { map } from '../../instances/map';
import { Directions } from '../../enums/directions';
import { sprites } from '../../instances/sprites';

export function animatePlayer(pendingBox: Box) {
  let pPiece = map.piecePlayer;
  let pBox = pPiece.box;
  let diffX = pBox.x - pendingBox.x;
  let diffY = pBox.y - pendingBox.y;
  let newDirection = Directions.NONE;
  if (diffY != 0) {
    if (diffY < 0) newDirection = Directions.DOWN;
    else newDirection = Directions.UP;
  }
  else if (diffX != 0) {
    if (diffX < 0) newDirection = Directions.RIGHT;
    else newDirection = Directions.LEFT;
  }
  let oldAnimationStep = pPiece.getCurrentAnimationStep();
  let newStepIndex = pPiece.ageAnimationByDirection(newDirection);
  if (newStepIndex != null) {
    let newAnimationStep = pPiece.animationStepMap[pPiece.directionCurrent]
      [newStepIndex];
    sprites[pPiece.spriteNames[oldAnimationStep.spriteIndex]].visible = false;
    sprites[pPiece.spriteNames[newAnimationStep.spriteIndex]].visible = true;
  }
  pBox.x = pendingBox.x;
  pBox.y = pendingBox.y;
  sprites[pPiece.getCurrentSpriteName()].x = pendingBox.x + map.offset.x;
  sprites[pPiece.getCurrentSpriteName()].y = pendingBox.y + map.offset.y;
}
