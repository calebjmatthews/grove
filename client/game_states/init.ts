import * as PIXI from 'pixi.js';

import Box from '../models/box';
import Key from '../models/key';
import play from './play';
import { pixiApp } from '../instances/pixi_app';
import { pixiLoader } from '../instances/pixi_loader';
import { boxes } from '../instances/boxes';
import { sprites } from '../instances/sprites';
import { pixiState } from '../instances/pixi_state';
import { SpriteNames } from '../enums/sprite_names';
const jplayer1 = require('../assets/jplayer1.png');

let initializing = false;

export default function init() {
  if (!initializing) {
    initializing = true;
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
      type = "canvas";
    }
    PIXI.utils.sayHello(type);

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    pixiApp.renderer.view.style.position = "absolute";
    pixiApp.renderer.view.style.display = "block";
    pixiApp.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(pixiApp.view);

    loadTextures()
    .then(() => {
      pixiState.s = play;
    });
  }
}

function loadTextures() : Promise<boolean> {
  return new Promise((resolve) => {
    pixiLoader.add(jplayer1.default)
    .load(() => {
      createPlayerBox();
      createSprites();
      createKeyboard();
      resolve(true);
    });
  })
}

function createSprites() {
  let player = new PIXI.Sprite(pixiLoader.resources[jplayer1.default].texture);

  //Add the pBox to the stage
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
    vx: 0,
    y: 0,
    vy: 0,
    width: 64,
    height: 64,
    spriteName: jplayer1.default
  });
  boxes[SpriteNames.PLAYER] = playerBox;
}

function createKeyboard() {
  let left = new Key("ArrowLeft");
  let up = new Key("ArrowUp");
  let right = new Key("ArrowRight");
  let down = new Key("ArrowDown");

  let pBox = boxes[SpriteNames.PLAYER];

  left.press = () => {
    // Change the pBox's velocity when the key is pressed
    pBox.vx = -5;
    pBox.vy = 0;
  };

  left.release = () => {
    // If the left arrow has been released, and the right arrow isn't down,
    //  and the pBox isn't moving vertically:
    //  Stop the pBox
    if (!right.isDown && pBox.vy === 0) {
      pBox.vx = 0;
    }
  };

  up.press = () => {
    pBox.vy = -5;
    pBox.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && pBox.vx === 0) {
      pBox.vy = 0;
    }
  };

  right.press = () => {
    pBox.vx = 5;
    pBox.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && pBox.vy === 0) {
      pBox.vx = 0;
    }
  };

  down.press = () => {
    pBox.vy = 5;
    pBox.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && pBox.vx === 0) {
      pBox.vy = 0;
    }
  };
}
