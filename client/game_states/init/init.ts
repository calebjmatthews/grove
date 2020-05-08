import * as PIXI from 'pixi.js';

import Box from '../../models/box';
import play from '../play/play';
import { createSpritesFromTilesheet, createBushSprites, displaySprites }
  from './sprites';
import { createKeyboard } from './keyboard';
import { pixiApp } from '../../instances/pixi_app';
import { pixiLoader } from '../../instances/pixi_loader';
import { map } from '../../instances/map';
import { pixiState } from '../../instances/pixi_state';
import { piecePlayer } from '../../instances/pieces/piece_player';
import { createPieceBush } from '../../instances/pieces/piece_bush';
import { PieceNames } from '../../enums/piece_names';
const playerpng = require('../../assets/player.png');
const playerjson = require('../../assets/player.json');
const forestworldpng = require('../../assets/forestworld.png');
const forestworldjson = require('../../assets/forestworld.json');

let initializing = false;

export default function init() {
  if (!initializing) {
    initializing = true;

    map.createGrid(window.innerWidth, window.innerHeight);

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
