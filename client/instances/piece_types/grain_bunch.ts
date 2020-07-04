import PieceType from '../../models/piece_type';
import { PieceTypeNames } from '../../enums/piece_type_names';
import AnimationStep from '../../models/animation_step';

export let grainBunch = new PieceType({
  name: PieceTypeNames.GRAIN_BUNCH,
  collidable: true,
  breakable: true,
  durability: 1,
  animated: false,
  animationSteps: null,
  spriteNames: ["grain_bunch.png"]
})
