import * as PIXI from 'pixi.js';

import { pixiApp } from '../../instances/pixi_app';
import { pixiContainers } from '../../instances/pixi_containers';
import { PieceTypeNames } from '../../enums/piece_type_names';

export function createPlayerContainer() {
  let playerContainer = new PIXI.Container();
  playerContainer.x = ((window.innerWidth) - 32);
  playerContainer.y = ((window.innerHeight) - 32);
  playerContainer.width = 64;
  playerContainer.height = 64;
  pixiApp.stage.addChild(playerContainer);
  pixiContainers[PieceTypeNames.PLAYER] = playerContainer;
}

export function createBGContainer() {
  let bgContainer = new PIXI.Container();
  pixiApp.stage.addChild(bgContainer);
  bgContainer.width = window.innerWidth * 2;
  bgContainer.height = window.innerHeight * 2;
  bgContainer.x = -(window.innerWidth/2);
  bgContainer.y = -(window.innerHeight/2);
  let bgTilingSprite = new PIXI.TilingSprite(PIXI.utils.TextureCache['grass.png']);
  bgTilingSprite.width = (window.innerWidth * 2) / 4;
  bgTilingSprite.height = (window.innerHeight * 2) / 4;
  bgTilingSprite.scale = new PIXI.Point(4, 4);
  bgContainer.addChild(bgTilingSprite);
  pixiContainers[PieceTypeNames.BACKGROUND] = bgContainer;
}
