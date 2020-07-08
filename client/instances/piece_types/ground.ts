import PieceType from '../../models/piece_type';
const PT = PieceType;
import { PieceTypeNames } from '../../enums/piece_type_names';
const PTN = PieceTypeNames;

let bt = new PieceType({
  name: 'Name missing',
  collidable: false,
  breakable: null,
  value: null,
  animated: false,
  animationSteps: null,
  spriteNames: null
});

export let grass = new PT(Object.assign({}, bt, {
  name: PTN.GRASS, spriteNames: ["grass.png"] }));
export let dirtSm = new PT(Object.assign({}, bt, {
  name: PTN.DIRT_SM, spriteNames: ["dirt_sm.png"] }));
export let dirtN = new PT(Object.assign({}, bt, {
  name: PTN.DIRT_N, spriteNames: ["dirt_n.png"] }));
export let dirtNE = new PT(Object.assign({}, bt, {
  name: PTN.DIRT_NE, spriteNames: ["dirt_ne.png"] }));
export let dirtE = new PT(Object.assign({}, bt, {
  name: PTN.DIRT_E, spriteNames: ["dirt_e.png"] }));
export let dirtSE = new PT(Object.assign({}, bt, {
  name: PTN.DIRT_SE, spriteNames: ["dirt_se.png"] }));
export let dirtS = new PT(Object.assign({}, bt, {
  name: PTN.DIRT_S, spriteNames: ["dirt_s.png"] }));
export let dirtSW = new PT(Object.assign({}, bt, {
  name: PTN.DIRT_SW, spriteNames: ["dirt_sw.png"] }));
export let dirtW = new PT(Object.assign({}, bt, {
  name: PTN.DIRT_W, spriteNames: ["dirt_w.png"] }));
export let dirtNW = new PT(Object.assign({}, bt, {
  name: PTN.DIRT_NW, spriteNames: ["dirt_nw.png"] }));
export let dirtM = new PT(Object.assign({}, bt, {
  name: PTN.DIRT_M, spriteNames: ["dirt_m.png"] }));
export let dirtH = new PT(Object.assign({}, bt, {
  name: PTN.DIRT_H, spriteNames: ["dirt_h.png"] }));
export let dirtV = new PT(Object.assign({}, bt, {
  name: PTN.DIRT_V, spriteNames: ["dirt_v.png"] }));
