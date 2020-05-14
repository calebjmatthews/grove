import Piece from './piece';
import PieceAnimated from './piece_animated';
import Box from './box';
import AnimationStep from './animation_step';

export default class PieceType implements PieceTypeInterface {
  name: string;
  collidable: boolean;
  breakable: boolean;
  durability: number;
  animated: boolean;
  animationSteps: AnimationStep[];
  spriteNames: string[];

  constructor(pieceType: PieceTypeInterface) {
    Object.assign(this, pieceType);
  }

  createPiece(id: number, gridPos: [number, number], xy: [number, number]): any {
    let piece = new Piece({
      typeName: this.name,
      id: id,
      gridPos: gridPos,
      box: new Box({
        x: xy[0],
        vx: 0,
        y: xy[1],
        vy: 0,
        width: 64,
        height: 64,
        boxName: this.name
      }),
      spriteNames: this.spriteNames
    });

    if (this.animated == true) {
      return new PieceAnimated(Object.assign({}, piece, {
        animationSteps: this.animationSteps,
        animationCurrrent: 0,
        animationAge: 0
      }));
    }
    else {
      return piece;
    }
  }
}

interface PieceTypeInterface {
  name: string;
  collidable: boolean;
  breakable: boolean;
  durability: number;
  animated: boolean;
  animationSteps: AnimationStep[];
  spriteNames: string[];
}
