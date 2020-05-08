import * as PIXI from 'pixi.js';

import Box from '../models/box';
import Key from '../models/key';
import play from './play';
import { pixiApp } from '../instances/pixi_app';
import { pixiLoader } from '../instances/pixi_loader';
import { map } from '../instances/map';
import { sprites } from '../instances/sprites';
import { pixiState } from '../instances/pixi_state';
import { piecePlayer } from '../instances/pieces/piece_player';
import { createPieceBush } from '../instances/pieces/piece_bush';
import { PieceNames } from '../enums/piece_names';
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
  map.piecePlayer = piecePlayer;
}

function createBushBoxes(numBushes: number) {
  for (let index = 0; index < numBushes; index++) {
    let bushPiece = createPieceBush(index, map);
    if (bushPiece != null) {
      map.piecesAnimated[PieceNames.BUSH + ',' + index] = bushPiece;
    }
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
  Object.keys(map.piecesAnimated).map((pieceName) => {
    let piece = map.piecesAnimated[pieceName];
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
  map.piecePlayer.spriteNames.map((spriteName, index) => {
    displaySprite(spriteName, map.piecePlayer.box, index);
  });
  Object.keys(map.piecesAnimated).map((pieceName) => {
    let piece = map.piecesAnimated[pieceName];
    let box = piece.box;
    if (piece.spriteNames.length == 1) {
      displaySprite(piece.spriteNames[0], box, 0);
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

  let pBox = map.piecePlayer.box;

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
