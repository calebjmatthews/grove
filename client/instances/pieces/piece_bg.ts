import Box from '../../models/box';
import Piece from '../../models/piece';
import { PieceNames } from '../../enums/piece_names';

export function createPieceBackground(x: number, y: number, index: number) {
  let pieceName = PieceNames.GRASS;
  let spriteNames = ["forestworld51.png"];
  if (Math.random() <= 0.25) {
    pieceName = PieceNames.DIRT;
    spriteNames = ["forestworld89.png"];
  }
  return new Piece({
    name: pieceName,
    id: index,
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
