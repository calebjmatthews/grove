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
  
  return pendingBox;
}
