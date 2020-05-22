import PieceType from '../../models/piece_type';
const PT = PieceType;
import { PieceTypeNames } from '../../enums/piece_type_names';
const PTN = PieceTypeNames;

let dt = new PieceType({
  name: null,
  collidable: true,
  breakable: false,
  durability: 0,
  animated: false,
  animationSteps: null,
  spriteNames: null
});

export let doorwayNW = new PT(Object.assign({}, dt, {
  name: PTN.DOORWAY_NW, spriteNames: ["doorway_nw.png"] }));
export let doorwayNE = new PT(Object.assign({}, dt, {
  name: PTN.DOORWAY_NE, spriteNames: ["doorway_ne.png"] }));
export let doorwaySE = new PT(Object.assign({}, dt, {
  name: PTN.DOORWAY_SE, spriteNames: ["doorway_se.png"] }));
export let doorwaySW = new PT(Object.assign({}, dt, {
  name: PTN.DOORWAY_SW, spriteNames: ["doorway_sw.png"] }));
