import Box from '../../models/box';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
import { pixiContainers } from '../../instances/pixi_containers';
import { Directions } from '../../enums/directions';
import { PlayerStatuses } from '../../enums/player_statuses';

export function actAndAnimatePlayer(pendingBox: Box) {
  let player = map.piecePlayer;
  let pBox = player.box;

  if (player.statusPending != player.statusCurrent) {
    if (player.statusPending == PlayerStatuses.STRIKING) {
      console.log('Bam!');
      player.statusCurrent = PlayerStatuses.STRIKING;
    }
  }

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
  let oldAnimationStep = player.getCurrentAnimationStep();
  let newStepIndex = player.ageAnimationByDirection(directionNew);
  if (newStepIndex != null) {
    let newAnimationStep = player.directionAnimMap[player.directionCurrent]
      [newStepIndex];
    sprites[player.spriteNames[oldAnimationStep.spriteIndex]].visible = false;
    sprites[player.spriteNames[newAnimationStep.spriteIndex]].visible = true;
  }
  pBox.x = pendingBox.x;
  pBox.y = pendingBox.y;
  pixiContainers[player.name].x = pendingBox.x + map.offset.x;
  pixiContainers[player.name].y = pendingBox.y + map.offset.y;
}
