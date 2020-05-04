import * as PIXI from 'pixi.js';

import Box from './box';
import { pixiApp } from './pixi_app';
import { pixiLoader } from './pixi_loader';
import { boxes } from './boxes';
import { sprites } from './sprites';
import { SpriteNames } from './enums/sprite_names';
const jplayer1 = require('./assets/jplayer1.png');

export default function init() : Promise<boolean> {
  let type = "WebGL";
  if (!PIXI.utils.isWebGLSupported()){
    type = "canvas";
  }
  PIXI.utils.sayHello(type);

  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  pixiApp.renderer.view.style.position = "absolute";
  pixiApp.renderer.view.style.display = "block";
  pixiApp.renderer.resize(window.innerWidth, window.innerHeight);
  document.body.appendChild(pixiApp.view);
  return loadTextures();
}

function loadTextures() : Promise<boolean> {
  return new Promise((resolve) => {
    pixiLoader.add(jplayer1.default)
    .load(() => {
      createPlayerBox();
      createSprites();
      resolve(true);
    });
  })
}

function createSprites() {
  let player = new PIXI.Sprite(pixiLoader.resources[jplayer1.default].texture);

  //Add the cat to the stage
  pixiApp.stage.addChild(player);
  let pBox = boxes[SpriteNames.PLAYER];
  player.x = pBox.x;
  player.y = pBox.y;
  player.width = pBox.width;
  player.height = pBox.height;

  sprites[SpriteNames.PLAYER] = player;
}

function createPlayerBox() {
  let playerBox = new Box({
    x: 0,
    y: 0,
    width: 64,
    height: 64,
    spriteName: jplayer1.default
  });
  boxes[SpriteNames.PLAYER] = playerBox;
}
