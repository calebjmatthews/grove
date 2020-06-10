import Box from '../../models/box';
import { map } from '../../instances/map';
import { pixiContainers } from '../../instances/pixi_containers';
import { sprites } from '../../instances/sprites';
import { Directions } from '../../enums/directions';
import { PlayerStatuses } from '../../enums/player_statuses';
import { TILE_SIZE } from '../../constants';

export function movePlayerPending(delta: number) {
  let oldBox = map.piecePlayer.box;
  let pendingBox = new Box(oldBox);
  if ((pendingBox.vx != 0 || pendingBox.vy != 0)
    && map.piecePlayer.statusCurrent == PlayerStatuses.NORMAL) {
    pendingBox.x += (pendingBox.vx * (1 + delta));
    pendingBox.y += (pendingBox.vy * (1 + delta));
    let collisions = map.detectCollision(pendingBox);
    if (collisions != null) {
      collisions.map((collision) => {
        switch(collision.direction) {
          case Directions.UP:
          pendingBox.y = (collision.collidesWith.y - pendingBox.height);
          break;

          case Directions.RIGHT:
          pendingBox.x = (collision.collidesWith.x + collision.collidesWith.width);
          break;

          case Directions.DOWN:
          pendingBox.y = (collision.collidesWith.y + collision.collidesWith.height);
          break;

          case Directions.LEFT:
          pendingBox.x = (collision.collidesWith.x - pendingBox.width);
          break;
        }
      });
    }
  }

  let oldGridPos = map.getGridUpperLeftPos([oldBox.x, oldBox.y]);
  let newGridPos = map.getGridUpperLeftPos([pendingBox.x, pendingBox.y]);
  if (oldGridPos[0] != newGridPos[0]) {
    let uBound = Math.floor(-map.offset.y / TILE_SIZE)-1;
    let dBound = Math.floor((-map.offset.y + window.innerHeight) / TILE_SIZE)+1;
    // Hide leftmost col, show rightmost col
    if (oldGridPos[0] < newGridPos[0]) {
      let hideCol = Math.floor(-map.offset.x / TILE_SIZE)-1;
      map.toggleColHide(hideCol, uBound, dBound, false, pixiContainers, sprites);
      let showCol = Math.floor((-map.offset.x + window.innerWidth) / TILE_SIZE)+1;
      map.toggleColHide(showCol, uBound, dBound, true, pixiContainers, sprites);
    }
    // Hide rightmost col, show leftmost col
    else {
      let hideCol = Math.floor((-map.offset.x + window.innerWidth) / TILE_SIZE)+1;
      map.toggleColHide(hideCol, uBound, dBound, false, pixiContainers, sprites);
      let showCol = Math.floor(-map.offset.x / TILE_SIZE)-1;
      map.toggleColHide(showCol, uBound, dBound, true, pixiContainers, sprites);
    }
  }
  if (oldGridPos[1] != newGridPos[1]) {
    let lBound = Math.floor(-map.offset.x / TILE_SIZE)-1;
    let rBound = Math.floor((-map.offset.x + window.innerWidth) / TILE_SIZE)+1;
    // Hide top row, show bottom row
    if (oldGridPos[1] < newGridPos[1]) {
      let hideRow = Math.floor(-map.offset.y / TILE_SIZE)-1;
      map.toggleRowHide(hideRow, lBound, rBound, false, pixiContainers, sprites);
      let showRow = Math.floor((-map.offset.y + window.innerHeight) / TILE_SIZE)+1;
      map.toggleRowHide(showRow, lBound, rBound, true, pixiContainers, sprites);
    }
    // Hide bottom row, show top row
    else {
      let hideRow = Math.floor((-map.offset.y + window.innerHeight) / TILE_SIZE)+1;
      map.toggleRowHide(hideRow, lBound, rBound, false, pixiContainers, sprites);
      let showRow = Math.floor(-map.offset.y / TILE_SIZE)-1;
      map.toggleRowHide(showRow, lBound, rBound, true, pixiContainers, sprites);
    }
  }

  return pendingBox;
}
