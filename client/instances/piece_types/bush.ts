import PieceType from '../../models/piece_type';
import AnimationStep from '../../models/animation_step';
import Breakable from '../../models/breakable';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { ParticleTypes } from '../../enums/particle_types';
import { ItemTypeNames } from '../../enums/item_type_names';

let drops: {[ itemName: string] : [number, number]} = {};
drops[ItemTypeNames.SCRAP_WOOD] = [0, 2];
drops[ItemTypeNames.BLUEBERRIES] = [0, 0.1];
export let bush = new PieceType({
  name: PieceTypeNames.BUSH,
  collidable: true,
  breakable: new Breakable({ durability: 3, particleType: ParticleTypes.RUBBLE_WOOD,
    drops: drops }),
  animated: true,
  animationSteps: [
    new AnimationStep({ spriteIndex: 0, duration: 400 }),
    new AnimationStep({ spriteIndex: 1, duration: 20 })
  ],
  spriteNames: ["bush_new.png", "bush_d.png"]
})
