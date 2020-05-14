import PieceType from '../../models/piece_type';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { grass, dirt } from './background';
import { bush } from './bush';

let pieceTypes: { [typeName: string] : PieceType } = {};
[grass, dirt, bush]
.map((pieceType) => {
  pieceTypes[pieceType.name] = pieceType;
});
let newPiece = pieceTypes[PieceTypeNames.BUSH].createPiece(1000, [1, 1], [16, 16]);

export { pieceTypes };
