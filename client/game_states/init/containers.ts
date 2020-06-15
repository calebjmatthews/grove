import * as PIXI from 'pixi.js';
import 'pixi-tilemap';

import { pixiApp } from '../../instances/pixi_app';
import { pixiContainers } from '../../instances/pixi_containers';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { TILE_SIZE } from '../../constants';

export function createPlayerContainer() {
  let playerContainer = new PIXI.Container();
  playerContainer.x = ((window.innerWidth) - 32);
  playerContainer.y = ((window.innerHeight) - 32);
  playerContainer.width = TILE_SIZE;
  playerContainer.height = TILE_SIZE;
  playerContainer.scale = new PIXI.Point(3, 3);
  pixiContainers.all.addChild(playerContainer);
  pixiContainers.player = playerContainer;
}

export function createMainContainer() {
  let allContainer = new PIXI.Container();
  pixiContainers.all = allContainer;
  let mainContainer = new PIXI.Container();
  mainContainer.width = window.innerWidth * 2;
  mainContainer.height = window.innerHeight * 2;
  mainContainer.x = -(window.innerWidth/2);
  mainContainer.y = -(window.innerHeight/2);
  mainContainer.scale = new PIXI.Point(3, 3);
  let bgTilingSprite = new PIXI.TilingSprite(PIXI.utils.TextureCache['grass.png']);
  bgTilingSprite.width = (window.innerWidth * 2) / 3;
  bgTilingSprite.height = (window.innerHeight * 2) / 3;
  mainContainer.addChild(bgTilingSprite);
  // pixiApp.stage.addChild(mainContainer);
  pixiContainers.main = mainContainer;
  pixiContainers.all.addChild(pixiContainers.main);
}

export function createTilemap() {
  pixiContainers.tilemap = new PIXI.tilemap.CompositeRectTileLayer();
  pixiContainers.main.addChild(pixiContainers.tilemap);
}
