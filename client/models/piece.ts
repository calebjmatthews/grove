import Box from './box';

// An object on the stage, represented by a bounding box and one or more sprites
export default class Piece {
  box: Box;
  spriteNames: string[];

  constructor(piece: Piece) {
    Object.assign(this, piece);
  }
}
