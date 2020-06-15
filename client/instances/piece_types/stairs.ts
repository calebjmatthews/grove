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

export let stairsSmN = new PT(Object.assign({}, bt, {
  name: PTN.STAIRS_SM_N, spriteNames: ["stairs_sm_n.png"] }));
export let stairsSmS = new PT(Object.assign({}, bt, {
  name: PTN.STAIRS_SM_S, spriteNames: ["stairs_sm_s.png"] }));
export let stairsNW = new PT(Object.assign({}, bt, {
  name: PTN.STAIRS_NW, spriteNames: ["stairs_nw.png"] }));
export let stairsN = new PT(Object.assign({}, bt, {
  name: PTN.STAIRS_N, spriteNames: ["stairs_n.png"] }));
export let stairsNE = new PT(Object.assign({}, bt, {
  name: PTN.STAIRS_NE, spriteNames: ["stairs_ne.png"] }));
export let stairsSW = new PT(Object.assign({}, bt, {
  name: PTN.STAIRS_SW, spriteNames: ["stairs_sw.png"] }));
export let stairsS = new PT(Object.assign({}, bt, {
  name: PTN.STAIRS_S, spriteNames: ["stairs_s.png"] }));
export let stairsSE = new PT(Object.assign({}, bt, {
  name: PTN.STAIRS_N, spriteNames: ["stairs_n.png"] }));
