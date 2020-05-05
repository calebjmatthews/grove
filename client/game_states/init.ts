import * as PIXI from 'pixi.js';

import Box from '../models/box';
import Key from '../models/key';
import play from './play';
import { pixiApp } from '../instances/pixi_app';
import { pixiLoader } from '../instances/pixi_loader';
import { map } from '../instances/map';
import { sprites } from '../instances/sprites';
import { pixiState } from '../instances/pixi_state';
import { SpriteNames } from '../enums/sprite_names';
const jplayer1 = require('../assets/jplayer1.png');
const bush = require('../assets/bush.png');

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
    pixiLoader.add([jplayer1.default, bush.default])
    .load(() => {
      createPlayerBox();
      createBushBoxes(20);
      createSprites();
      createKeyboard();
      resolve(true);
    });
  })
}

function createPlayerBox() {
  let playerBox = new Box({
    x: ((window.innerWidth / 2) - 32),
    vx: 0,
    y: ((window.innerHeight / 2) - 32),
    vy: 0,
    width: 64,
    height: 64,
    spriteName: jplayer1.default
  });
  map.boxes[SpriteNames.PLAYER] = playerBox;
}

function createBushBoxes(numBushes: number) {
  for (let index = 0; index < numBushes; index++) {
    let newBush = createBushBox(index);
    if (newBush != null) {
      map.boxes[SpriteNames.BUSH + index] = newBush;
    }
  }

  function createBushBox(index: number) {
    let testBush: Box = null;
    for (let loop = 0; loop < 100; loop++) {
      testBush = new Box({
        x: ((window.innerWidth * Math.random()) - 32),
        vx: 0,
        y: ((window.innerHeight * Math.random()) - 32),
        vy: 0,
        width: 64,
        height: 64,
        spriteName: bush.default
      });
      if (map.detectCollision(testBush) == null) {
        return testBush;
      }
    }
    return null;
  }
}

function createSprites() {
  Object.keys(map.boxes).map((boxName) => {
    let box = map.boxes[boxName];
    let boxSprite = new PIXI.Sprite(pixiLoader.resources[box.spriteName].texture);
    pixiApp.stage.addChild(boxSprite);
    let pBox = map.boxes[boxName];
    boxSprite.x = pBox.x;
    boxSprite.y = pBox.y;
    boxSprite.width = pBox.width;
    boxSprite.height = pBox.height;
    sprites[boxName] = boxSprite;
  })
}

function createKeyboard() {
  let left = new Key("ArrowLeft");
  let up = new Key("ArrowUp");
  let right = new Key("ArrowRight");
  let down = new Key("ArrowDown");

  let pBox = map.boxes[SpriteNames.PLAYER];

  left.press = () => {
    // Change the pBox's velocity when the key is pressed
    pBox.vx = -5;
  };

  left.release = () => {
    // If the left arrow has been released, and the right arrow isn't down,
    //  and the pBox isn't moving vertically:
    //  Stop the pBox
    if (!right.isDown) {
      pBox.vx = 0;
    }
  };

  up.press = () => {
    pBox.vy = -5;
  };
  up.release = () => {
    if (!down.isDown) {
      pBox.vy = 0;
    }
  };

  right.press = () => {
    pBox.vx = 5;
  };
  right.release = () => {
    if (!left.isDown) {
      pBox.vx = 0;
    }
  };

  down.press = () => {
    pBox.vy = 5;
  };
  down.release = () => {
    if (!up.isDown) {
      pBox.vy = 0;
    }
  };
}
