import * as PIXI from 'pixi.js';
import Box from './box';
import Piece from './piece';
import PieceAnimated from './piece_animated';
import PiecePlayer from './piece_player';
import Collision from '../models/collision';
import Offset from '../models/offset';
import PlayEvent from '../models/play_event';
import ParticleGroup from '../models/particle_group';
import PieceType from '../models/piece_type';
import ItemType from '../models/item_type';
import { utils } from '../instances/utils';
import { PieceTypeNames } from '../enums/piece_type_names';
import { TILE_SIZE } from '../constants';

export default class Map {
  gridWidth: number = null;
  gridHeight: number = null;
  offset: Offset = null;
  piecePlayer: PiecePlayer = null;
  piecesItem: { [pieceName: string] : Piece } = {};
  piecesAnimated: { [pieceName: string] : PieceAnimated } = {};
  pieces: { [pieceName: string] : Piece } = {};
  pieceMap: { [coords: string] : { mapName: string, pieceName: string} } = {};
  collisionMap: { [coords: string] : { mapName: string, pieceName: string} } = {};
  sparkleMap: { [coords: string] : { mapName: string, pieceName: string} } = {};
  playEvents: PlayEvent[] = [];
  particleGroups: ParticleGroup[] = [];

  createGrid(screenWidth: number, screenHeight: number) {
    this.gridWidth = Math.floor(screenWidth / TILE_SIZE) * 2;
    this.gridHeight = Math.floor(screenHeight / TILE_SIZE) * 2;
    this.offset = new Offset({x: -(screenWidth/2), vx: 0, y: -(screenHeight/2), vy: 0});
  }

  getAllGridSpaces() {
    let gridSpaces: { [coords: string] : string } = {};
    for (let rowIndex = 0; rowIndex < this.gridHeight; rowIndex++) {
      for (let colIndex = 0; colIndex < this.gridWidth; colIndex++) {
        gridSpaces[(colIndex + ',' + rowIndex)] = null;
      }
    }
    return gridSpaces;
  }

  getOpenGridSpaces() {
    let gridSpaces = this.getAllGridSpaces();
    Object.keys(this.collisionMap).map((coord) => {
      let mapObj = this.collisionMap[coord];
      let piece = this[mapObj.mapName][mapObj.pieceName];
      let coords = (Math.floor((piece.box.x + (piece.box.width / 2)) / TILE_SIZE)
        + ',' + Math.floor((piece.box.y + (piece.box.height / 2)) / TILE_SIZE));
      gridSpaces[coords] = piece.typeName;
    });
    let openGridSpaces: { [coords: string] : string } = {};
    Object.keys(gridSpaces).map((coord: string) => {
      if (gridSpaces[coord] == null) {
        openGridSpaces[coord] = null;
      }
    });
    return openGridSpaces;
  }

  getOpenGridLocation(): { xy: [number, number], gridPos: [number, number] } {
    let coords = Object.keys(this.getOpenGridSpaces());
    if (coords.length > 0) {
      let coord = coords[Math.floor(coords.length * utils.rand())];
      let x = (Math.floor(parseInt(coord.split(',')[0])) * TILE_SIZE);
      let y = (Math.floor(parseInt(coord.split(',')[1])) * TILE_SIZE);
      return {xy: [x, y], gridPos: [Math.floor(parseInt(coord.split(',')[0])),
        Math.floor(parseInt(coord.split(',')[1]))]};
    }
    else {
      return null;
    }
  }

  getGridPos(xy: [number, number]): [number, number] {
    let gridX = Math.floor((xy[0] + (TILE_SIZE / 2)) / TILE_SIZE);
    let gridY = Math.floor((xy[1] + (TILE_SIZE / 2)) / TILE_SIZE);
    return [gridX, gridY];
  }

  getGridUpperLeftPos(xy: [number, number]): [number, number] {
    let gridX = Math.floor((xy[0]) / TILE_SIZE);
    let gridY = Math.floor((xy[1]) / TILE_SIZE);
    return [gridX, gridY];
  }

  getPieceByGridPos(gridPos: [number, number]) {
    let pieceMapObj = this.pieceMap[gridPos[0] + ',' + gridPos[1]];
    if (pieceMapObj) {
      return this[pieceMapObj.mapName][pieceMapObj.pieceName];
    }
    else {
      return null;
    }
  }

  createPieceMap() {
    this.pieceMap = {};
    this.collisionMap = {};
    Object.keys(this.piecesAnimated).map((pieceName, index) => {
      let piece = this.piecesAnimated[pieceName];
      this.pieceMap[(piece.gridPos[0] + ',' + piece.gridPos[1])] =
        {mapName: 'piecesAnimated', pieceName: pieceName};
      if (piece.collidable) {
        this.collisionMap[(piece.gridPos[0] + ',' + piece.gridPos[1])] =
          {mapName: 'piecesAnimated', pieceName: pieceName};
      }
    });
    Object.keys(this.pieces).map((pieceName, index) => {
      let piece = this.pieces[pieceName];
      this.pieceMap[(piece.gridPos[0] + ',' + piece.gridPos[1])] =
        {mapName: 'pieces', pieceName: pieceName};
      if (piece.collidable) {
        this.collisionMap[(piece.gridPos[0] + ',' + piece.gridPos[1])] =
          {mapName: 'pieces', pieceName: pieceName};
      }
      if (piece.special) {
        let sparkleSpecial = piece.getSpecial('sparkle');
        if (sparkleSpecial) {
          this.sparkleMap[(piece.gridPos[0] + ',' + piece.gridPos[1])] =
            {mapName: 'pieces', pieceName: pieceName};
        }
      }
    });
  }

  detectCollision(box: Box) : Collision[] {
    let collisions: Collision[] = [];
    let gridPos = this.getGridPos([(box.x), (box.y)]);
    let neighbors = this.getNeighbors(gridPos, 1);
    neighbors.map((neighbor) => {
      if (neighbor.collidable) {
        let tBox = neighbor.box;
        if (box.x < tBox.x + tBox.width &&
          box.x + box.width > tBox.x &&
          box.y < tBox.y + tBox.height &&
          box.y + box.height > tBox.y) {
          collisions.push(new Collision({
            direction: box.compareCenters(tBox),
            collidesWith: tBox
          }))
        }
      }
    });
    if (collisions.length > 0) {
      return collisions
    }
    return null;
  }

  agePlayEvents() {
    for (let index = this.playEvents.length-1; index >= 0; index--) {
      let playEvent = this.playEvents[index];
      playEvent.delay--;
      if (playEvent.delay <= 0) {
        let newMap = playEvent.resolve(this);
        this.setMap(newMap);
        this.playEvents.splice(index, 1);
      }
    }
  }

  setMap(map: Map) {
    Object.keys(map).map((key) => {
      this[key] = map[key];
    });
  }

  animateParticleGroups(delta: number) {
    let allChangedSpriteNames: string[] = [];
    this.particleGroups.map((particleGroup) => {
      particleGroup.animate(particleGroup, delta);
    });
  }

  createAndDisplayPiece(pieceTypeName: string, coord: string, id: number,
    pieceTypes: { [typeName: string] : PieceType },
    containers: {
      main: PIXI.Container,
      tilemap: PIXI.tilemap.CompositeRectTileLayer;
      player: PIXI.Container;
    },
    sprites: { [spriteName: string] : PIXI.Sprite }) {
    let piece = this.createPiece(pieceTypeName, coord, id, pieceTypes);
    this.displayPiece(piece, containers, sprites);
  }

  createPiece(pieceTypeName: string, coord: string, id: number,
    pieceTypes: { [typeName: string] : PieceType }) {
    let x = (Math.floor(parseInt(coord.split(',')[0])) * TILE_SIZE);
    let y = (Math.floor(parseInt(coord.split(',')[1])) * TILE_SIZE);
    let piece = pieceTypes[pieceTypeName].createPiece(id,
      [parseInt(coord.split(',')[0]), parseInt(coord.split(',')[1])], [x, y]);
    if (piece.animated) {
      this.piecesAnimated[pieceTypeName + ',' + id] = piece;
      this.pieceMap[(piece.gridPos[0] + ',' + piece.gridPos[1])] =
        {mapName: 'piecesAnimated', pieceName: (pieceTypeName + ',' + id)};
      if (piece.collidable) {
        this.collisionMap[(piece.gridPos[0] + ',' + piece.gridPos[1])] =
          {mapName: 'piecesAnimated', pieceName: (pieceTypeName + ',' + id)};
      }
    }
    else {
      this.pieces[pieceTypeName + ',' + id] = piece;
      this.pieceMap[(piece.gridPos[0] + ',' + piece.gridPos[1])] =
        {mapName: 'pieces', pieceName: (pieceTypeName + ',' + id)};
      if (piece.collidable) {
        this.collisionMap[(piece.gridPos[0] + ',' + piece.gridPos[1])] =
          {mapName: 'pieces', pieceName: (pieceTypeName + ',' + id)};
      }
      let specialSparkle = piece.getSpecial('sparkle');
      if (specialSparkle) {
        this.sparkleMap[(piece.gridPos[0] + ',' + piece.gridPos[1])] =
          {mapName: 'pieces', pieceName: (pieceTypeName + ',' + id)};
      }
    }
    return piece;
  }

  displayPiece(piece: any,
    containers: {
      main: PIXI.Container,
      tilemap: PIXI.tilemap.CompositeRectTileLayer;
      player: PIXI.Container;
    },
    sprites: { [spriteName: string] : PIXI.Sprite }) {
    if (piece.typeName == PieceTypeNames.PLAYER) {
      piece.spriteNames.map((spriteName: string, index: number) => {
        let newSprite = new PIXI.Sprite(PIXI.utils.TextureCache[spriteName]);
        if (index != 0) {
          newSprite.visible = false;
        }
        sprites[spriteName] = newSprite;
        containers.player.addChild(newSprite);
      });
    }
    else {
      containers.tilemap.addFrame(PIXI.utils.TextureCache[piece.spriteNames[0]],
        (piece.box.x/3), (piece.box.y/3));
    }
  }

  createAndDisplayPieceItem(itemTypeName: string, coord: string, id: number,
    itemTypes: { [typeName: string] : ItemType }, containers: {
      main: PIXI.Container,
      tilemap: PIXI.tilemap.CompositeRectTileLayer;
      player: PIXI.Container;
    },
    sprites: { [spriteName: string] : PIXI.Sprite }) {
    let x = (Math.floor(parseInt(coord.split(',')[0])) * TILE_SIZE);
    let y = (Math.floor(parseInt(coord.split(',')[1])) * TILE_SIZE);
    let piece = itemTypes[itemTypeName].createPiece(id,
      [parseInt(coord.split(',')[0]), parseInt(coord.split(',')[1])], [x, y]);
    this.piecesItem[itemTypeName + ',' + id] = piece;
    this.pieceMap[(piece.gridPos[0] + ',' + piece.gridPos[1])] =
      {mapName: 'piecesItem', pieceName: (itemTypeName + ',' + id)};

    let newSprite = new PIXI.Sprite(PIXI.utils
      .TextureCache[itemTypes[itemTypeName].sceneSprite]);
    newSprite.x = piece.box.x/3;
    newSprite.y = piece.box.y/3;
    sprites[itemTypes[itemTypeName].sceneSprite + ',' + id] = newSprite;
    containers.main.addChild(newSprite);
  }

  hidePiece(piece: any,
    containers: {
      main: PIXI.Container,
      tilemap: PIXI.tilemap.CompositeRectTileLayer;
      player: PIXI.Container;
    },
    sprites: { [spriteName: string] : PIXI.Sprite }) {
    containers.tilemap.addFrame(PIXI.utils.TextureCache["grass.png"],
      piece.box.x/3, piece.box.y/3);
  }

  destroyPiece(piece: any,
    containers: {
      main: PIXI.Container,
      tilemap: PIXI.tilemap.CompositeRectTileLayer;
      player: PIXI.Container;
    },
    sprites: { [spriteName: string] : PIXI.Sprite }) {
    this.hidePiece(piece, containers, sprites);
    if (piece.animated) {
      delete this.piecesAnimated[piece.name + ',' + piece.id];
    }
    else {
      delete this.pieces[piece.name + ',' + piece.id];
    }
    if (piece.collidable) {
      delete this.collisionMap[piece.gridPos[0] + ',' + piece.gridPos[1]];
    }
    let specialSparkle = piece.getSpecial('sparkle');
    if (specialSparkle) {
      delete this.sparkleMap[piece.gridPos[0] + ',' + piece.gridPos[1]];
    }
    delete this.pieceMap[piece.gridPos[0] + ',' + piece.gridPos[1]];
  }

  destroyAllPieces(containers: {
      main: PIXI.Container,
      tilemap: PIXI.tilemap.CompositeRectTileLayer;
      player: PIXI.Container;
    },
    sprites: { [spriteName: string] : PIXI.Sprite }) {
    Object.keys(this.pieces).map((pieceName) => {
      let piece = this.pieces[pieceName];
      this.destroyPiece(piece, containers, sprites);
    });
    Object.keys(this.piecesAnimated).map((pieceName) => {
      let piece = this.piecesAnimated[pieceName];
      this.destroyPiece(piece, containers, sprites);
    });
  }

  getNeighbors(gridPos: [number, number], offset: number) {
    let neighbors: any[] = [];
    for (let colOff = -offset; colOff <= offset; colOff++) {
      for (let rowOff = -offset; rowOff <= offset; rowOff++) {
        if (!(colOff == 0 && rowOff == 0)) {
          let piece =
            this.getPieceByGridPos([(gridPos[0] + colOff), (gridPos[1] + rowOff)]);
          if (piece) {
            neighbors.push(piece);
          }
        }
      }
    }
    return neighbors;
  }
}
