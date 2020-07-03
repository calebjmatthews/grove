import * as PIXI from 'pixi.js';
import 'pixi-tilemap';

let pixiContainers: {
  all: PIXI.Container,
  main: PIXI.Container,
  tilemap: PIXI.tilemap.CompositeRectTileLayer;
  player: PIXI.Container;
  item: PIXI.ParticleContainer;
} = {
  all: null,
  main: null,
  tilemap: null,
  player: null,
  item: null
};

export { pixiContainers };
