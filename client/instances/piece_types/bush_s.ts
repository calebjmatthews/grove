import PieceType from '../../models/piece_type';
import AnimationStep from '../../models/animation_step';
import Breakable from '../../models/breakable';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { ParticleTypes } from '../../enums/particle_types';
import { ItemTypeNames } from '../../enums/item_type_names';

let drops: {[ itemName: string] : [number, number]} = {};
drops[ItemTypeNames.SCRAP_WOOD] = [1, 4];
export let bush_s = new PieceType({
  name: PieceTypeNames.BUSH_S,
  collidable: true,
  breakable: new Breakable({ durability: 3, particleType: ParticleTypes.RUBBLE_WOOD,
    drops: drops }),
  special: [{ index: 0, name: 'sparkle', value: 20 }],
  animated: false,
  animationSteps: null,
  spriteNames: ["bush_s.png"]
})
