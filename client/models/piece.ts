import Box from './box';

// An object on the stage, represented by a bounding box and one or more sprites
export default class Piece implements PieceInterface {
  name: string;
  id: number;
  box: Box;
  spriteNames: string[];

  constructor(piece: PieceInterface) {
    Object.assign(this, piece);
  }
}

interface PieceInterface {
  name: string;
  id: number;
  box: Box;
  spriteNames: string[];
}
