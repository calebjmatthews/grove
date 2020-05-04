import { boxes } from '../instances/boxes';
import { sprites } from '../instances/sprites';
import { SpriteNames } from '../enums/sprite_names';

export default function play(delta: number) {
  let pBox = boxes[SpriteNames.PLAYER];
  pBox.x += 1;
  sprites[SpriteNames.PLAYER].x = pBox.x;
}
