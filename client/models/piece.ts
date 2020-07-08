import Box from './box';
import Breakable from './breakable';

// An object on the stage, represented by a bounding box and one or more sprites
export default class Piece implements PieceInterface {
  typeName: string;
  id: number;
  gridPos: [number, number];
  box: Box;
  collidable: boolean;
  breakable: Breakable;
  grabbable: boolean;
  value: number;
  animated: boolean;
  special?: any[];
  spriteNames: string[];

  constructor(piece: PieceInterface) {
    Object.assign(this, piece);
  }

  getXYAfterOffset(xy: number[]) {
    let newX = this.box.x + xy[0];
    let newY = this.box.y + xy[1];
    return [newX, newY];
  }

  getSpecial(specialName: string) {
    let fSpecial: any = null;
    if (this.special) {
      this.special.map((special: any) => {
        if (special.name == specialName) {
          fSpecial = special;
        }
      });
    }
    return fSpecial;
  }
}

interface PieceInterface {
  typeName: string;
  id: number;
  gridPos: [number, number];
  box: Box;
  collidable: boolean;
  breakable: Breakable;
  grabbable: boolean;
  value: number;
  animated: boolean;
  special?: any;
  spriteNames: string[];
}
