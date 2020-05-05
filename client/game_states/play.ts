import Box from '../models/box';
import { map } from '../instances/map';
import { sprites } from '../instances/sprites';
import { BoxNames } from '../enums/box_names';

export default function play(delta: number) {
  let pendingBox = new Box(map.boxes[BoxNames.PLAYER]);
  pendingBox.x += (pendingBox.vx * (1 + delta));
  pendingBox.y += (pendingBox.vy * (1 + delta));
  let collision = map.detectCollision(pendingBox);
  if (collision != null) {
    console.log('collision');
    console.log(collision);
  }
  let pBox = map.boxes[BoxNames.PLAYER];
  pBox.x = pendingBox.x;
  pBox.y = pendingBox.y;
  sprites[BoxNames.PLAYER].x = pendingBox.x;
  sprites[BoxNames.PLAYER].y = pendingBox.y;
}
