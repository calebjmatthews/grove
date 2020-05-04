import { boxes } from '../instances/boxes';
import { sprites } from '../instances/sprites';
import { SpriteNames } from '../enums/sprite_names';

export default function play(delta: number) {
  let pBox = boxes[SpriteNames.PLAYER];
  pBox.x += (pBox.vx * (1 + delta));
  pBox.y += (pBox.vy * (1 + delta));
  sprites[SpriteNames.PLAYER].x = pBox.x;
  sprites[SpriteNames.PLAYER].y = pBox.y;
}
