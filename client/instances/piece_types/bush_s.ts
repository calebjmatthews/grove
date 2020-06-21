import PieceType from '../../models/piece_type';
import { PieceTypeNames } from '../../enums/piece_type_names';
import AnimationStep from '../../models/animation_step';

export let bush_s = new PieceType({
  name: PieceTypeNames.BUSH_S,
  collidable: true,
  breakable: true,
  durability: 3,
  special: [{ index: 0, name: 'sparkle', value: 20 }],
  animated: false,
  animationSteps: null,
  spriteNames: ["bush_s.png"]
})
