import * as PIXI from 'pixi.js';

import Box from '../../models/box';
import play from '../play/play';
import { createSpritesFromTilesheet, createBushSprites, displaySprites,
  createBGSprites, createPlayerSprites } from './sprites';
import { createKeyboard } from './keyboard';
import { applyOffset } from '../play/apply_offset';
import { pixiApp } from '../../instances/pixi_app';
import { pixiLoader } from '../../instances/pixi_loader';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
import { pixiState } from '../../instances/pixi_state';
import { piecePlayer } from '../../instances/pieces/piece_player';
import { createPieceBush } from '../../instances/pieces/piece_bush';
import { createPieceBackground } from '../../instances/pieces/piece_bg';
import { PieceNames } from '../../enums/piece_names';
const playerpng = require('../../assets/player.png');
const playerjson = require('../../assets/player.json');
const forestworldpng = require('../../assets/forestworld.png');
const forestworldjson = require('../../assets/forestworld.json');
import { TILE_SIZE } from '../../constants';

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
      createPiecePlayer();
      createPiecesBush(20);
      createPiecesBackgroundWhereEmpty();
      createSpritesFromTilesheet(forestworldpng, forestworldjson);
      createBushSprites();
      createBGSprites();
      createSpritesFromTilesheet(playerpng, playerjson);
      createPlayerSprites();
      displaySprites();
      createKeyboard();
      applyOffset(0, true);
      resolve(true);
    });
  })
}

function createPiecePlayer() {
  map.piecePlayer = piecePlayer;
}

function createPiecesBush(numBushes: number) {
  for (let index = 0; index < numBushes; index++) {
    let bushPiece = createPieceBush(index, map);
    if (bushPiece != null) {
      map.piecesAnimated[PieceNames.BUSH + ',' + index] = bushPiece;
    }
  }
}

export function createPiecesBackgroundWhereEmpty() {
  let openCoords = Object.keys(map.getOpenGridSpaces());
  openCoords.map((coord, index) => {
    let x = (Math.floor(parseInt(coord.split(',')[0])) * TILE_SIZE);
    let y = (Math.floor(parseInt(coord.split(',')[1])) * TILE_SIZE);
    let pieceBG = createPieceBackground(x, y, index);
    map.pieces[pieceBG.name + ',' + index] = pieceBG;
  });
}
