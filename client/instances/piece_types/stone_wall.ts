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

export let stoneWallB = new PT(Object.assign({}, st, {
  name: PTN.STONE_WALL_B, spriteNames: ["stone_wall_b.png"] }));
export let stoneWallW = new PT(Object.assign({}, st, {
  name: PTN.STONE_WALL_W, spriteNames: ["stone_wall_w.png"] }));
export let stoneWallM = new PT(Object.assign({}, st, {
  name: PTN.STONE_WALL_M, spriteNames: ["stone_wall_m.png"] }));
export let stoneWallA = new PT(Object.assign({}, st, {
  name: PTN.STONE_WALL_MA, spriteNames: ["stone_wall_ma.png"] }));
export let stoneWallE = new PT(Object.assign({}, st, {
  name: PTN.STONE_WALL_E, spriteNames: ["stone_wall_e.png"] }));
export let stoneWallT = new PT(Object.assign({}, st, {
  name: PTN.STONE_WALL_T, spriteNames: ["stone_wall_t.png"] }));
export let stoneWallWI = new PT(Object.assign({}, st, {
  name: PTN.STONE_WALL_WI, spriteNames: ["stone_wall_wi.png"] }));
