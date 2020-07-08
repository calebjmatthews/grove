import PieceType from '../../models/piece_type';
const PT = PieceType;
import { PieceTypeNames } from '../../enums/piece_type_names';
const PTN = PieceTypeNames;

let bt = new PieceType({
  name: null,
  collidable: true,
  breakable: null,
  value: null,
  animated: false,
  animationSteps: null,
  spriteNames: null
});

export let barN = new PT(Object.assign({}, bt, {
  name: PTN.BAR_N, spriteNames: ["bar_n.png"] }));
export let barS = new PT(Object.assign({}, bt, {
  name: PTN.BAR_S, spriteNames: ["bar_s.png"] }));
