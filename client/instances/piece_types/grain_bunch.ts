import PieceType from '../../models/piece_type';
import Breakable from '../../models/breakable';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { ParticleTypes } from '../../enums/particle_types';
import { ItemTypeNames } from '../../enums/item_type_names';

let drops: {[ itemName: string] : [number, number]} = {};
drops[ItemTypeNames.GRAIN_BUNDLE] = [0, 2];
drops[ItemTypeNames.GRAIN_SEED] = [0, 0.5];
export let grainBunch = new PieceType({
  name: PieceTypeNames.GRAIN_BUNCH,
  collidable: true,
  breakable: new Breakable({ durability: 1, particleType: ParticleTypes.RUBBLE_WOOD,
    drops: drops }),
  animated: false,
  animationSteps: null,
  spriteNames: ["grain_bunch.png"]
})
