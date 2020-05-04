import { pixiApp } from './instances/pixi_app';
import init from './game_states/init';
import { pixiState } from './instances/pixi_state';

export default function initGameLoop() {
  pixiState.s = init;
  pixiApp.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta: number) {
  pixiState.s(delta);
}
