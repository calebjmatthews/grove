import Box from '../../models/box';
import Piece from '../../models/piece';
import { PieceNames } from '../../enums/piece_names';

export function createPieceBackground(x: number, y: number, index: number,
  gridPos: [number, number]) {
  let pieceName = PieceNames.GRASS;
  let spriteNames = ["row-6-col-1.png"];
  if (Math.random() <= 0.25) {
    pieceName = PieceNames.DIRT;
    spriteNames = ["row-9-col-9.png"];
  }
  return new Piece({
    name: pieceName,
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
