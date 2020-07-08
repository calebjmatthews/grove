import { player } from '../../instances/player';
import { sprites } from '../../instances/sprites';
import { pixiContainers } from '../../instances/pixi_containers';
import { UINames } from '../../enums/ui_names';

const HIDING_BAR_HEIGHT = 56;
const HUNGER_RATE = 0.02;
const MAX_FULLNESS = 100;

export function handleHunger() {
  let newFullness = player.fullness - HUNGER_RATE;
  updateFullness(newFullness);
}

export function updateFullness(fullness: number) {
  let lastBarHeight = HIDING_BAR_HEIGHT
    - Math.floor((player.fullness / MAX_FULLNESS) * HIDING_BAR_HEIGHT);
  player.fullness = fullness;
  let newBarHeight = HIDING_BAR_HEIGHT
    - Math.floor((fullness / MAX_FULLNESS) * HIDING_BAR_HEIGHT);
  if (newBarHeight != lastBarHeight) {
    sprites[UINames.FULLNESS_HIDE].height = newBarHeight;
  }
}
