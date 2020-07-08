import PieceType from '../../models/piece_type';
const PT = PieceType;
import { PieceTypeNames } from '../../enums/piece_type_names';
const PTN = PieceTypeNames;

let rt = new PieceType({
  name: null,
  collidable: true,
  breakable: null,
  value: null,
  animated: false,
  animationSteps: null,
  spriteNames: null
});

export let stoneRailNW = new PT(Object.assign({}, rt, {
  name: PTN.STONE_RAIL_NW, spriteNames: ["stone_rail_nw.png"] }));
export let stoneRailW = new PT(Object.assign({}, rt, {
  name: PTN.STONE_RAIL_W, spriteNames: ["stone_rail_w.png"] }));
export let stoneRailSW = new PT(Object.assign({}, rt, {
  name: PTN.STONE_RAIL_SW, spriteNames: ["stone_rail_sw.png"] }));
export let stoneRailNE = new PT(Object.assign({}, rt, {
  name: PTN.STONE_RAIL_NE, spriteNames: ["stone_rail_ne.png"] }));
export let stoneRailE = new PT(Object.assign({}, rt, {
  name: PTN.STONE_RAIL_E, spriteNames: ["stone_rail_e.png"] }));
export let stoneRailSE = new PT(Object.assign({}, rt, {
  name: PTN.STONE_RAIL_SE, spriteNames: ["stone_rail_se.png"] }));
export let stoneRailH = new PT(Object.assign({}, rt, {
  name: PTN.STONE_RAIL_H, spriteNames: ["stone_rail_h.png"] }));
export let stoneRailHA = new PT(Object.assign({}, rt, {
  name: PTN.STONE_RAIL_HA, spriteNames: ["stone_rail_ha.png"] }));
