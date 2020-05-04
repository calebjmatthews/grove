import { pixiApp } from './pixi_app';
import { boxes } from './boxes';
import { sprites } from './sprites';
import { SpriteNames } from './enums/sprite_names';

let state: (delta: number) => void = play;

export default function initGameLoop() {
  pixiApp.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta: number) {
  state(delta);
}

function play(delta: number) {
  let pBox = sprites[SpriteNames.PLAYER];
  pBox.x += 1;
  sprites[SpriteNames.PLAYER].x = pBox.x;
}
