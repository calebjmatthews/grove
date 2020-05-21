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
  name: PTN.TREE_NW, spriteNames: ["tree_nw.png"] }));
export let tree_sw = new PT(Object.assign({}, tt, {
  name: PTN.TREE_SW, spriteNames: ["tree_sw.png"] }));
export let tree_ne = new PT(Object.assign({}, tt, {
  name: PTN.TREE_NE, spriteNames: ["tree_ne.png"] }));
export let tree_se = new PT(Object.assign({}, tt, {
  name: PTN.TREE_SE, spriteNames: ["tree_se.png"] }));
