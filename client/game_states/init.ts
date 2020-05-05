import * as PIXI from 'pixi.js';

import Piece from '../models/piece';
import PieceAnimated from '../models/piece_animated';
import Box from '../models/box';
import Key from '../models/key';
import AnimationStep from '../models/animation_step';
const AS = AnimationStep;
import play from './play';
import { pixiApp } from '../instances/pixi_app';
import { pixiLoader } from '../instances/pixi_loader';
import { map } from '../instances/map';
import { sprites } from '../instances/sprites';
import { pixiState } from '../instances/pixi_state';
import { PieceNames } from '../enums/piece_names';
const jplayer1 = require('../assets/jplayer1.png');
const bush = require('../assets/bush.png');
const bush2 = require('../assets/bush2.png');
import { PLAYER_SPEED } from '../constants';

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
    pixiLoader.add([jplayer1.default, bush.default, bush2.default])
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
  let playerPiece = new Piece({
    box: new Box({
      x: ((window.innerWidth / 2) - 32),
      vx: 0,
      y: ((window.innerHeight / 2) - 32),
      vy: 0,
      width: 64,
      height: 64,
      boxName: PieceNames.PLAYER
    }),
    spriteNames: [jplayer1.default]
  });
  map.pieces[PieceNames.PLAYER] = playerPiece;
}

function createBushBoxes(numBushes: number) {
  for (let index = 0; index < numBushes; index++) {
    let bushBox = createBushBox(index);
    if (bushBox != null) {
      let newBush = new PieceAnimated({
        box: bushBox,
        spriteNames: [bush.default, bush2.default],
        animationSteps: [
          new AS({ spriteIndex: 0, duration: 400 }),
          new AS({ spriteIndex: 1, duration: 20 })
        ],
        animationCurrrent: 0,
        animationAge: 0
      })
      map.pieces[PieceNames.BUSH + ',' + index] = newBush;
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
        boxName: PieceNames.BUSH
      });
      if (map.detectCollision(testBush) == null) {
        return testBush;
      }
    }
    return null;
  }
}

function createSprites() {
  Object.keys(map.pieces).map((pieceName) => {
    let piece = map.pieces[pieceName];
    let box = piece.box;
    if (piece.spriteNames.length == 1) {
      let newSprite = createSprite(piece.spriteNames[0], box);
      sprites[pieceName] = newSprite;
    }
    else if (piece.spriteNames.length > 1) {
      piece.spriteNames.map((spriteName, index) => {
        let newSprite = createSprite(spriteName, box);
        if (index > 0) {
          newSprite.visible = false;
        }
        sprites[pieceName + ',' + index] = newSprite;
      });
      piece.setRandomAge();
    }
  })

  function createSprite(spriteName: string, box: Box) {
    let newSprite = new PIXI.Sprite(pixiLoader.resources[spriteName].texture);
    pixiApp.stage.addChild(newSprite);
    newSprite.x = box.x;
    newSprite.y = box.y;
    newSprite.width = box.width;
    newSprite.height = box.height;
    return newSprite;
  }
}

function createKeyboard() {
  let left = new Key("ArrowLeft");
  let up = new Key("ArrowUp");
  let right = new Key("ArrowRight");
  let down = new Key("ArrowDown");

  let pBox = map.pieces[PieceNames.PLAYER].box;

  left.press = () => {
    // Change the pBox's velocity when the key is pressed
    pBox.vx = -PLAYER_SPEED;
  };

  left.release = () => {
    // If the left arrow has been released, and the right arrow isn't down
    //  stop the pBox
    if (!right.isDown) {
      pBox.vx = 0;
    }
  };

  up.press = () => {
    pBox.vy = -PLAYER_SPEED;
  };
  up.release = () => {
    if (!down.isDown) {
      pBox.vy = 0;
    }
  };

  right.press = () => {
    pBox.vx = PLAYER_SPEED;
  };
  right.release = () => {
    if (!left.isDown) {
      pBox.vx = 0;
    }
  };

  down.press = () => {
    pBox.vy = PLAYER_SPEED;
  };
  down.release = () => {
    if (!up.isDown) {
      pBox.vy = 0;
    }
  };
}
