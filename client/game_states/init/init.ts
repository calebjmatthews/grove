import * as PIXI from 'pixi.js';

import Box from '../../models/box';
import Piece from '../../models/piece';
import edit from '../edit/edit';
import scene_select from '../scene_select/scene_select';
import { createBGContainer, createPlayerContainer } from './sprites';
import { createKeyboardPlay } from './keyboard_play';
import { createKeyboardEdit } from './keyboard_edit';
import { createPalatte } from '../edit/palatte';
import { createMapButtons } from '../edit/map_buttons';
import { createSceneButtons } from '../scene_select/scene_buttons';
import { handleCanvasClick } from '../edit/canvas_click';
import { applyOffset } from '../play/apply_offset';
import { pixiApp } from '../../instances/pixi_app';
import { pixiLoader } from '../../instances/pixi_loader';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
import { pixiState } from '../../instances/pixi_state';
import { pieceTypes } from '../../instances/piece_types/index';
import { piecePlayer } from '../../instances/piece_types/player';
import { pixiContainers } from '../../instances/pixi_containers';
import { PieceTypeNames } from '../../enums/piece_type_names';
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

    if (location.pathname.includes('edit')) {
      loadEditTextures()
      .then(() => {
        pixiState.s = edit;
      });
    }
    else {
      loadPlayTextures()
      .then(() => {
        pixiState.s = scene_select;
      });
    }
  }
}

function loadPlayTextures() : Promise<boolean> {
  return new Promise((resolve) => {
    pixiLoader.add(["player.json", "forestworld.json", "forestparticles.json"])
    .load(() => {
      createBGContainer();
      createPlayerContainer();
      createPiecesDestructable((map.gridWidth * map.gridHeight) / 5);
      createPiecesBackgroundWhereEmpty();
      createPiecePlayer();
      createKeyboardPlay();
      createSceneButtons();
      applyOffset(0, true);
      resolve(true);
    });
  })
}

function loadEditTextures() {
  return new Promise((resolve) => {
    pixiLoader.add(["player.json", "forestworld.json", "forestparticles.json"])
    .load(() => {
      createBGContainer();
      createKeyboardEdit();
      applyOffset(0, true);
      createMapButtons();
      createPalatte();
      handleCanvasClick();
      resolve(true);
    });
  })
}

function createPiecePlayer() {
  map.piecePlayer = piecePlayer;
  map.displayPiece(piecePlayer, pixiContainers, sprites);
}

function createPiecesDestructable(numDestr: number) {
  for (let index = 0; index < numDestr; index++) {
    let location = map.getOpenGridLocation();
    let pieceTypeName = PieceTypeNames.BUSH;
    if (Math.random() < 0.25) {
      pieceTypeName = PieceTypeNames.STONE_SLATE_M;
    }
    map.createAndDisplayPiece(pieceTypeName,
      (location.gridPos[0] + ',' + location.gridPos[1]), index, pieceTypes,
      pixiContainers, sprites);
  }
}

export function createPiecesBackgroundWhereEmpty() {
  let openCoords = Object.keys(map.getOpenGridSpaces());
  openCoords.map((coord, index) => {
    if (Math.random() < 0.25) {
      map.createAndDisplayPiece(PieceTypeNames.DIRT_SM, coord, index, pieceTypes,
        pixiContainers, sprites);
    }
  });
}
