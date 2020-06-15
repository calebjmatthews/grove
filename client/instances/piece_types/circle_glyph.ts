import PieceType from '../../models/piece_type';
const PT = PieceType;
import { PieceTypeNames } from '../../enums/piece_type_names';
const PTN = PieceTypeNames;

let bt = new PieceType({
  name: 'Name missing',
  collidable: false,
  breakable: false,
  durability: 0,
  animated: false,
  animationSteps: null,
  spriteNames: null
});

export let circleGlyphNE = new PT(Object.assign({}, bt, {
  name: PTN.CIRCLE_GLYPH_NE, spriteNames: ["circle_glyph_ne.png"] }));
export let circleGlyphSE = new PT(Object.assign({}, bt, {
  name: PTN.CIRCLE_GLYPH_SE, spriteNames: ["circle_glyph_se.png"] }));
export let circleGlyphSW = new PT(Object.assign({}, bt, {
  name: PTN.CIRCLE_GLYPH_SW, spriteNames: ["circle_glyph_sw.png"] }));
export let circleGlyphNW = new PT(Object.assign({}, bt, {
  name: PTN.CIRCLE_GLYPH_NW, spriteNames: ["circle_glyph_nw.png"] }));
