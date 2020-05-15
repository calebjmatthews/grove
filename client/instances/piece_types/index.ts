import PieceType from '../../models/piece_type';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { grass, dirt } from './background';
import { bush } from './bush';
import { stone } from './stone';

let pieceTypes: { [typeName: string] : PieceType } = {};
[grass, dirt, bush, stone]
.map((pieceType) => {
  pieceTypes[pieceType.name] = pieceType;
});

export { pieceTypes };
