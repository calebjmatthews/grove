import Box from './box';
import Piece from './piece';
import PieceAnimated from './piece_animated';
import PieceDirectional from './piece_directional';
import Collision from '../models/collision';
import { PieceNames } from '../enums/piece_names';
import { TILE_SIZE } from '../constants';

export default class Map {
  gridWidth: number = null;
  gridHeight: number = null;
  piecePlayer: PieceDirectional = null;
  piecesAnimated: { [pieceName: string] : PieceAnimated } = {};
  pieces: { [pieceName: string] : PieceAnimated } = {};

  createGrid(width: number, height: number) {
    this.gridWidth = Math.floor(width / TILE_SIZE);
    this.gridHeight = Math.floor(height / TILE_SIZE);
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
    console.log('this');
    console.log(this);
    console.log('gridSpaces');
    console.log(gridSpaces);
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

  getOpenGridXY(): [number, number] {
    let coords = Object.keys(this.getOpenGridSpaces());
    if (coords.length > 0) {
      let coord = coords[Math.floor(coords.length * Math.random())];
      let x = (Math.floor(parseInt(coord.split(',')[0])) * TILE_SIZE);
      let y = (Math.floor(parseInt(coord.split(',')[1])) * TILE_SIZE);
      return [x, y];
    }
    else {
      return null;
    }
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
}
