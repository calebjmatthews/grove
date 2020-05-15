import Box from './box';

// An object on the stage, represented by a bounding box and one or more sprites
export default class Piece implements PieceInterface {
  typeName: string;
  id: number;
  gridPos: [number, number];
  box: Box;
  collidable: boolean;
  breakable: boolean;
  durability: number;
  animated: boolean;
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
  typeName: string;
  id: number;
  gridPos: [number, number];
  box: Box;
  collidable: boolean;
  breakable: boolean;
  durability: number;
  animated: boolean;
  spriteNames: string[];
}
