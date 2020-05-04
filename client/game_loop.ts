import { pixiApp } from './pixi_app';
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
  sprites[SpriteNames.PLAYER].x += 1;
}
