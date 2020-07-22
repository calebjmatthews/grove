import PieceType from '../../models/piece_type';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { grass } from './grass';
import { dirt } from './dirt';
import { tilled } from './tilled';
import { bush } from './bush';
import { bush_s } from './bush_s';
import { grassBunch } from './grass_bunch';
import { grain, grainMature } from './grain';
import { tree_nw, tree_sw, tree_ne, tree_se } from './tree';
import { circleGlyphNE, circleGlyphSE, circleGlyphSW, circleGlyphNW }
  from './circle_glyph';
import { barN, barS } from './bar';
import { doorwayNW, doorwayNE, doorwaySE, doorwaySW } from './doorway';
import { stairsSmN, stairsSmS, stairsNW, stairsN, stairsNE, stairsSW, stairsS,
  stairsSE } from './stairs';
import { stoneRailNW, stoneRailW, stoneRailSW, stoneRailNE, stoneRailE, stoneRailSE,
  stoneRailH, stoneRailHA } from './stone_rail';
import { stoneSlateW, stoneSlateM, stoneSlateE } from './stone_slate';
import { stoneWallB, stoneWallW, stoneWallM, stoneWallA, stoneWallE, stoneWallT,
  stoneWallWI } from './stone_wall';
import { tileCracked, tileCrowns, tileFace, tileGlyphCracked, tileHatch, tileRectangles,
  tilesFour } from './tile';

let pieceTypes: { [typeName: string] : PieceType } = {};
[grass, dirt, tilled, bush, bush_s, grassBunch, grain, grainMature, tree_nw, tree_sw,
  tree_ne, tree_se, circleGlyphNE,
  circleGlyphSE, circleGlyphSW, circleGlyphNW, barN, barS, doorwayNW, doorwayNE,
  doorwaySE, doorwaySW, stairsSmN, stairsSmS, stairsNW, stairsN, stairsNE, stairsSW,
  stairsS, stairsSE, stoneRailNW, stoneRailW, stoneRailSW, stoneRailNE, stoneRailE,
  stoneRailSE, stoneRailH, stoneRailHA, stoneSlateW, stoneSlateM, stoneSlateE,
  stoneWallB, stoneWallW, stoneWallM, stoneWallA, stoneWallE, stoneWallT, stoneWallWI,
  tileCracked, tileCrowns, tileFace, tileGlyphCracked, tileHatch, tileRectangles,
  tilesFour]
.map((pieceType) => {
  pieceTypes[pieceType.name] = pieceType;
});

export { pieceTypes };
