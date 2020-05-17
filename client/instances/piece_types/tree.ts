import PieceType from '../../models/piece_type';
const PT = PieceType;
import { PieceTypeNames } from '../../enums/piece_type_names';
const PTN = PieceTypeNames;

let tt = new PieceType({
  name: null,
  collidable: true,
  breakable: false,
  durability: 0,
  animated: false,
  animationSteps: null,
  spriteNames: null
});

export let tree_nw = new PT(Object.assign({}, tt, {
  name: PTN.TREE_NW, spriteNames: ["row-3-col-1.png"] }));
export let tree_sw = new PT(Object.assign({}, tt, {
  name: PTN.TREE_SW, spriteNames: ["row-4-col-1.png"] }));
export let tree_ne = new PT(Object.assign({}, tt, {
  name: PTN.TREE_NE, spriteNames: ["row-3-col-2.png"] }));
export let tree_se = new PT(Object.assign({}, tt, {
  name: PTN.TREE_SE, spriteNames: ["row-4-col-2.png"] }));
