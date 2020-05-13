import * as PIXI from 'pixi.js';
import Box from './box';
import Piece from './piece';
import PieceAnimated from './piece_animated';
import PiecePlayer from './piece_player';
import Collision from '../models/collision';
import Offset from '../models/offset';
import PlayEvent from '../models/play_event';
import ParticleGroup from '../models/particle_group';
import { PieceNames } from '../enums/piece_names';
import { TILE_SIZE } from '../constants';

export default class Map {
  gridWidth: number = null;
  gridHeight: number = null;
  offset: Offset = null;
  piecePlayer: PiecePlayer = null;
  piecesAnimated: { [pieceName: string] : PieceAnimated } = {};
  pieces: { [pieceName: string] : Piece } = {};
  pieceMap: { [coords: string] : { mapName: string, pieceName: string} } = null;
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
    Object.keys(this.piecesAnimated).map((pieceName) => {
      let piece = this.piecesAnimated[pieceName];
      let coords = (Math.floor((piece.box.x + (piece.box.width / 2)) / TILE_SIZE)
        + ',' + Math.floor((piece.box.y + (piece.box.height / 2)) / TILE_SIZE));
      gridSpaces[coords] = piece.name;
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
      let coord = coords[Math.floor(coords.length * Math.random())];
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

  getPieceByGridPos(gridPos: [number, number]) {
    if (this.pieceMap == null) {
      this.createPieceMap();
    }
    let pieceMapObj = this.pieceMap[gridPos[0] + ',' + gridPos[1]];
    return this[pieceMapObj.mapName][pieceMapObj.pieceName];
  }

  createPieceMap() {
    this.pieceMap = {};
    Object.keys(this.piecesAnimated).map((pieceName, index) => {
      let piece = this.piecesAnimated[pieceName];
      this.pieceMap[(piece.gridPos[0] + ',' + piece.gridPos[1])] =
        {mapName: 'piecesAnimated', pieceName: pieceName};
    });
    Object.keys(this.pieces).map((pieceName, index) => {
      let piece = this.pieces[pieceName];
      this.pieceMap[(piece.gridPos[0] + ',' + piece.gridPos[1])] =
        {mapName: 'pieces', pieceName: pieceName};
    });
  }

  detectCollision(box: Box) : Collision[] {
    let collisions: Collision[] = [];
    Object.keys(this.piecesAnimated).map((pieceName) => {
      let tBox = this.piecesAnimated[pieceName].box;
      if (box.x < tBox.x + tBox.width &&
        box.x + box.width > tBox.x &&
        box.y < tBox.y + tBox.height &&
        box.y + box.height > tBox.y) {
        collisions.push(new Collision({
          direction: box.compareCenters(tBox),
          collidesWith: tBox
        }))
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
}
