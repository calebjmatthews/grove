import Box from './box';

// An object on the stage, represented by a bounding box and one or more sprites
export default class Piece implements PieceInterface {
  name: string;
  id: number;
  gridPos: [number, number];
  box: Box;
  spriteNames: string[];

  constructor(piece: PieceInterface) {
    Object.assign(this, piece);
  }

  getXYAfterOffset(xy: number[]) {
    let newX = this.box.x + xy[0];
    let newY = this.box.y + xy[1];
    return [newX, newY];
  }
}

interface PieceInterface {
  name: string;
  id: number;
  gridPos: [number, number];
  box: Box;
  spriteNames: string[];
}
