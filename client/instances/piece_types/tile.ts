import PieceType from '../../models/piece_type';
const PT = PieceType;
import { PieceTypeNames } from '../../enums/piece_type_names';
const PTN = PieceTypeNames;

let tt = new PieceType({
  name: 'Name missing',
  collidable: false,
  breakable: null,
  value: null,
  animated: false,
  animationSteps: null,
  spriteNames: null
});

export let tileCracked = new PT(Object.assign({}, tt, {
  name: PTN.TILE_CRACKED, spriteNames: ["tile_cracked.png"] }));
export let tileCrowns = new PT(Object.assign({}, tt, {
  name: PTN.TILE_CROWNS, spriteNames: ["tile_crowns.png"] }));
export let tileFace = new PT(Object.assign({}, tt, {
  name: PTN.TILE_FACE, spriteNames: ["tile_face.png"] }));
export let tileGlyphCracked = new PT(Object.assign({}, tt, {
  name: PTN.TILE_GLYPH_CRACKED, spriteNames: ["tile_glyph_cracked.png"] }));
export let tileHatch = new PT(Object.assign({}, tt, {
  name: PTN.TILE_HATCH, spriteNames: ["tile_hatch.png"] }));
export let tileRectangles = new PT(Object.assign({}, tt, {
  name: PTN.TILE_RECTANGLES, spriteNames: ["tile_rectangles.png"] }));
export let tilesFour = new PT(Object.assign({}, tt, {
  name: PTN.TILES_FOUR, spriteNames: ["tiles_four.png"] }));
