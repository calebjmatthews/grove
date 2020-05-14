import PieceType from '../../models/piece_type';
const PT = PieceType;
import { PieceTypeNames } from '../../enums/piece_type_names';
const PTN = PieceTypeNames;

let bt = new PieceType({
  name: PieceTypeNames.BACKGROUND,
  collidable: false,
  breakable: false,
  durability: 0,
  animated: false,
  animationSteps: null,
  spriteNames: null
});

export let grass = new PT(Object.assign({}, bt, {
  name: PTN.GRASS, spriteNames: ["row-6-col-1.png"] }));
export let dirt = new PT(Object.assign({}, bt, {
  name: PTN.DIRT, spriteNames: ["row-9-col-9.png"] }));
