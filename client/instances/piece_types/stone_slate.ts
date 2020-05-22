import PieceType from '../../models/piece_type';
const PT = PieceType;
import { PieceTypeNames } from '../../enums/piece_type_names';
const PTN = PieceTypeNames;

let st = new PieceType({
  name: null,
  collidable: true,
  breakable: false,
  durability: 0,
  animated: false,
  animationSteps: null,
  spriteNames: null
});

export let stoneSlateW = new PT(Object.assign({}, st, {
  name: PTN.STONE_SLATE_W, spriteNames: ["stone_slate_w.png"] }));
export let stoneSlateM = new PT(Object.assign({}, st, {
  name: PTN.STONE_SLATE_M, spriteNames: ["stone_slate_m.png"] }));
export let stoneSlateE = new PT(Object.assign({}, st, {
  name: PTN.STONE_SLATE_E, spriteNames: ["stone_slate_e.png"] }));
