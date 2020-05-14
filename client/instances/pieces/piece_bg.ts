import Box from '../../models/box';
import Piece from '../../models/piece';
import { PieceTypeNames } from '../../enums/piece_type_names';

export function createPieceBackground(x: number, y: number, index: number,
  gridPos: [number, number]) {
  let pieceName = PieceTypeNames.GRASS;
  let spriteNames = ["row-6-col-1.png"];
  if (Math.random() <= 0.25) {
    pieceName = PieceTypeNames.DIRT;
    spriteNames = ["row-9-col-9.png"];
  }
  return new Piece({
    typeName: pieceName,
    id: index,
    gridPos: gridPos,
    box: new Box({
      x: x,
      vx: 0,
      y: y,
      vy: 0,
      width: 64,
      height: 64,
      boxName: pieceName
    }),
    spriteNames: spriteNames
  });
}
