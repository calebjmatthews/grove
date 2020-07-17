import PieceType from '../../models/piece_type';
import Breakable from '../../models/breakable';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { ParticleTypes } from '../../enums/particle_types';
import { ItemTypeNames } from '../../enums/item_type_names';

let drops: {[ itemName: string] : [number, number]} = {};
drops[ItemTypeNames.GRASS_BUNDLE] = [0, 0.2];
drops[ItemTypeNames.GRASS_SEED] = [0, 0.05];
export let grass = new PieceType({
  name: PieceTypeNames.GRASS,
  collidable: false,
  breakable: new Breakable({ durability: 1, particleType: ParticleTypes.RUBBLE_WOOD,
    drops: drops }),
  value: null,
  animated: false,
  animationSteps: null,
  spriteNames: ["grass.png"]
})
