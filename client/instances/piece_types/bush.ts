import PieceType from '../../models/piece_type';
import { PieceTypeNames } from '../../enums/piece_type_names';
import AnimationStep from '../../models/animation_step';

export let bush = new PieceType({
  name: PieceTypeNames.BUSH,
  collidable: true,
  breakable: true,
  durability: 3,
  animated: true,
  animationSteps: [
    new AnimationStep({ spriteIndex: 0, duration: 400 }),
    new AnimationStep({ spriteIndex: 1, duration: 20 })
  ],
  spriteNames: ["row-4-col-7.png", "row-5-col-8.png"]
})
