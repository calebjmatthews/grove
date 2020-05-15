import PieceType from '../../models/piece_type';
import { PieceTypeNames } from '../../enums/piece_type_names';
import AnimationStep from '../../models/animation_step';

export let stone = new PieceType({
  name: PieceTypeNames.STONE,
  collidable: true,
  breakable: true,
  durability: 5,
  animated: false,
  animationSteps: null,
  spriteNames: ["row-5-col-7.png"]
})
