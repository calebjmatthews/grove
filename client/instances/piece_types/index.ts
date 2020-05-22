import PieceType from '../../models/piece_type';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { grass, dirtSm, dirtN, dirtNE, dirtE, dirtSE, dirtS, dirtSW, dirtW, dirtNW,
  dirtM, dirtH, dirtV } from './background';
import { bush } from './bush';
import { stone } from './stone';
import { tree_nw, tree_sw, tree_ne, tree_se } from './tree';
import { circleGlyphNE, circleGlyphSE, circleGlyphSW, circleGlyphNW }
  from './circle_glyph';

let pieceTypes: { [typeName: string] : PieceType } = {};
[grass, dirtSm, dirtN, dirtNE, dirtE, dirtSE, dirtS, dirtSW, dirtW, dirtNW,
  dirtM, dirtH, dirtV, bush, stone, tree_nw, tree_sw, tree_ne, tree_se, circleGlyphNE,
  circleGlyphSE, circleGlyphSW, circleGlyphNW]
.map((pieceType) => {
  pieceTypes[pieceType.name] = pieceType;
});

export { pieceTypes };
