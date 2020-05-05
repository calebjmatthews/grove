import Box from '../models/box';
import { map } from '../instances/map';
import { sprites } from '../instances/sprites';
import { BoxNames } from '../enums/box_names';
import { Directions } from '../enums/directions';

export default function play(delta: number) {
  let pendingBox = new Box(map.boxes[BoxNames.PLAYER]);
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
  let pBox = map.boxes[BoxNames.PLAYER];
  pBox.x = pendingBox.x;
  pBox.y = pendingBox.y;
  sprites[BoxNames.PLAYER].x = pendingBox.x;
  sprites[BoxNames.PLAYER].y = pendingBox.y;
}
