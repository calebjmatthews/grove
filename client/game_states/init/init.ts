import * as PIXI from 'pixi.js';
import 'pixi-tilemap';

import Box from '../../models/box';
import Piece from '../../models/piece';
import Offset from '../../models/offset';
import edit from '../edit/edit';
import play from '../play/play';
import scene_select from '../scene_select/scene_select';
import { createMainContainer, createPlayerContainer, createTilemap,
  createItemContainer, createUIContainer } from './containers';
import { createKeyboardPlay } from './keyboard_play';
import { createKeyboardEdit } from './keyboard_edit';
import { createPalatte } from '../edit/palatte';
import { createMapButtons } from '../edit/map_buttons';
import { createSceneButtons } from '../scene_select/scene_buttons';
import { createItemNoteContainer } from '../play/item_note';
import { handleCanvasClick } from '../edit/canvas_click';
import { applyOffset } from '../play/apply_offset';
import { pixiApp } from '../../instances/pixi_app';
import { pixiRenderer } from '../../instances/pixi_renderer';
import { pixiLoader } from '../../instances/pixi_loader';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
import { pixiState } from '../../instances/pixi_state';
import { pieceTypes } from '../../instances/piece_types/index';
import { piecePlayer } from '../../instances/piece_types/player';
import { pixiContainers } from '../../instances/pixi_containers';
const pc = pixiContainers;
import { utils } from '../../instances/utils';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { TILE_SIZE } from '../../constants';

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
    pixiRenderer.pr = PIXI.autoDetectRenderer({
      width: window.innerWidth,
      height: window.innerHeight
    });
    document.body.appendChild(pixiRenderer.pr.view);

    if (location.pathname.includes('edit')) {
      loadEditTextures()
      .then(() => {
        pixiState.s = edit;
      });
    }
    else if (location.pathname.includes('gen')) {
      loadGenTextures()
      .then(() => {
        pixiState.s = play;
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
    pixiLoader.add(["player.json", "forestworld.json", "particles.json", "items.json",
    "ui.json"])
    .load(() => {
      createMainContainer();
      createPlayerContainer();
      createTilemap();
      createItemContainer();
      createPiecePlayer();
      createKeyboardPlay();
      createSceneButtons();
      createItemNoteContainer();
      createUIContainer();
      applyOffset(0, true);
      resolve(true);
    });
  })
}

function loadGenTextures() {
  return new Promise((resolve) => {
    pixiLoader.add(["player.json", "forestworld.json", "particles.json", "items.json",
    "ui.json"])
    .load(() => {
      map.gridWidth = 65;
      map.gridHeight = 40;
      map.offset = new Offset({ x: 0, vx: 0, y: 0, vy: 0 });
      createMainContainer();
      createPlayerContainer();
      createTilemap();
      createItemContainer();
      console.log('Before createPiecesDestructable');
      createPiecesDestructable((map.gridWidth * map.gridHeight) / 5);
      console.log('Before createPiecesBackgroundWhereEmpty');
      createPiecesBackgroundWhereEmpty();
      createPiecePlayer();
      createKeyboardPlay();
      createSceneButtons();
      createItemNoteContainer();
      createUIContainer();
      applyOffset(0, true);
      console.log('end');
      resolve(true);
    });
  })
}

function loadEditTextures() {
  return new Promise((resolve) => {
    pixiLoader.add(["player.json", "forestworld.json", "particles.json", "items.json",
    "ui.json"])
    .load(() => {
      map.gridWidth = 65;
      map.gridHeight = 40;
      map.offset = new Offset({ x: 0, vx: 0, y: 0, vy: 0 });
      createMainContainer();
      createTilemap();
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
  map.displayPiece(piecePlayer, pc, sprites);
}

function createPiecesDestructable(numDestr: number) {
  for (let index = 0; index < numDestr; index++) {
    let location = map.getOpenGridLocation();
    let pieceTypeName = PieceTypeNames.BUSH;
    if (utils.rand() < 0.25) {
      pieceTypeName = PieceTypeNames.BUSH_S;
    }
    map.createAndDisplayPiece(pieceTypeName,
      (location.gridPos[0] + ',' + location.gridPos[1]), index, pieceTypes,
      pc, sprites);
  }
}

export function createPiecesBackgroundWhereEmpty() {
  let openCoords = Object.keys(map.getOpenGridSpaces());
  openCoords.map((coord, index) => {
    if (utils.rand() < 0.25) {
      map.createAndDisplayPiece(PieceTypeNames.DIRT_SM, coord, index, pieceTypes,
        pc, sprites);
    }
    else {
      map.createAndDisplayPiece(PieceTypeNames.GRASS, coord, index, pieceTypes,
        pc, sprites);
    }
  });
}
