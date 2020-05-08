import * as PIXI from 'pixi.js';

import Piece from '../models/piece';
import PieceAnimated from '../models/piece_animated';
import PieceDirectional from '../models/piece_directional';
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
import { PieceTypes } from '../enums/piece_types';
import { Directions } from '../enums/directions';
const playerpng = require('../assets/player.png');
const playerjson = require('../assets/player.json');
const forestworldpng = require('../assets/forestworld.png');
const forestworldjson = require('../assets/forestworld.json');
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
    pixiLoader.add([playerpng.default, forestworldpng.default])
    .load(() => {
      createPlayerBox();
      createBushBoxes(20);
      createSpritesFromTilesheet(playerpng, playerjson);
      createSpritesFromTilesheet(forestworldpng, forestworldjson);
      createBushSprites();
      displaySprites();
      createKeyboard();
      resolve(true);
    });
  })
}

function createPlayerBox() {
  let animationStepMap: { [key: string] : AnimationStep[] } = {};
  animationStepMap[Directions.DOWN] = [
    new AS({ spriteIndex: 0, duration: 10}), new AS({ spriteIndex: 1, duration: 10}),
    new AS({ spriteIndex: 0, duration: 10}), new AS({ spriteIndex: 2, duration: 10})
  ]
  animationStepMap[Directions.LEFT] = [
    new AS({ spriteIndex: 3, duration: 10}), new AS({ spriteIndex: 4, duration: 10}),
    new AS({ spriteIndex: 3, duration: 10}), new AS({ spriteIndex: 5, duration: 10})
  ]
  animationStepMap[Directions.UP] = [
    new AS({ spriteIndex: 6, duration: 10}), new AS({ spriteIndex: 7, duration: 10}),
    new AS({ spriteIndex: 6, duration: 10}), new AS({ spriteIndex: 8, duration: 10})
  ]
  animationStepMap[Directions.RIGHT] = [
    new AS({ spriteIndex: 9, duration: 10}), new AS({ spriteIndex: 10, duration: 10}),
    new AS({ spriteIndex: 9, duration: 10}), new AS({ spriteIndex: 11, duration: 10})
  ]
  let playerPiece = new PieceDirectional({
    name: PieceNames.PLAYER,
    id: 0,
    box: new Box({
      x: ((window.innerWidth / 2) - 32),
      vx: 0,
      y: ((window.innerHeight / 2) - 32),
      vy: 0,
      width: 64,
      height: 64,
      boxName: PieceNames.PLAYER
    }),
    spriteNames: ["jplayer25.png", "jplayer1.png", "jplayer2.png", "jplayer8.png",
      "jplayer7.png", "jplayer33.png", "jplayer27.png", "jplayer5.png", "jplayer6.png",
      "jplayer4.png", "jplayer3.png", "jplayer34.png"],
    animationSteps: null,
    animationCurrrent: 0,
    animationAge: 0,
    type: PieceTypes.CARDINAL,
    animationStepMap: animationStepMap,
    directionCurrent: Directions.DOWN
  });
  map.pieces[PieceNames.PLAYER] = playerPiece;
}

function createBushBoxes(numBushes: number) {
  for (let index = 0; index < numBushes; index++) {
    let bushBox = createBushBox(index);
    if (bushBox != null) {
      let newBush = new PieceAnimated({
        name: PieceNames.BUSH,
        id: index,
        box: bushBox,
        spriteNames: ["forestworld37.png", "forestworld48.png"],
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

function createSpritesFromTilesheet(sheetPng: any, sheetJson: any) {
  Object.keys(sheetJson.frames).map((name) => {
    let frame: {h: number, w: number, x: number, y:number} =
      sheetJson.frames[name].frame;
    let rectange = new PIXI.Rectangle(frame.x, frame.y, frame.w, frame.h);
    let resource = pixiLoader.resources[sheetPng.default];
    let texture = new PIXI.Texture(resource.texture.baseTexture, rectange);
    let newSprite = new PIXI.Sprite(texture);
    newSprite.visible = false;
    pixiApp.stage.addChild(newSprite);
    sprites[name] = newSprite;
  })
}

function createBushSprites() {
  Object.keys(map.pieces).map((pieceName) => {
    let piece: PieceAnimated = map.pieces[pieceName];
    if (piece.name == PieceNames.BUSH) {
      piece.spriteNames.map((spriteName) => {
        let sprite = sprites[spriteName];
        if (sprite) {
          let newSprite = new PIXI.Sprite(sprite.texture);
          pixiApp.stage.addChild(newSprite);
          newSprite.visible = false;
          sprites[spriteName + ',' + piece.id] = newSprite;
        }
      });
      piece.setRandomAge();
    }
  });
}

function displaySprites() {
  Object.keys(map.pieces).map((pieceName) => {
    let piece: PieceDirectional = map.pieces[pieceName];
    let box = piece.box;
    if (piece.spriteNames.length == 1) {
      displaySprite(piece.spriteNames[0], box, 0);
    }
    else if (piece.type == PieceTypes.CARDINAL) {
      piece.spriteNames.map((spriteName, index) => {
        displaySprite(spriteName, box, index);
      });
    }
    else if (piece.spriteNames.length > 1) {
      piece.spriteNames.map((spriteName, index) => {
        displaySprite((spriteName + ',' + piece.id), box, index);
      });
      piece.setRandomAge();
    }
  })

  function displaySprite(spriteName: string, box: Box, index: number) {
    let dSprite = sprites[spriteName];
    dSprite.x = box.x;
    dSprite.y = box.y;
    dSprite.width = box.width;
    dSprite.height = box.height;
    if (index == 0) {
      dSprite.visible = true;
    }
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
