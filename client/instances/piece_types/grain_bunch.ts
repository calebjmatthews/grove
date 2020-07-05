import PieceType from '../../models/piece_type';
import Breakable from '../../models/breakable';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { ParticleTypes } from '../../enums/particle_types';
import { ItemTypeNames } from '../../enums/item_type_names';

let drops: {[ itemName: string] : [number, number]} = {};
drops[ItemTypeNames.SCRAP_WOOD] = [0, 2];
export let grainBunch = new PieceType({
  name: PieceTypeNames.GRAIN_BUNCH,
  collidable: true,
  breakable: new Breakable({ durability: 1, particleType: ParticleTypes.RUBBLE_WOOD,
    drops: drops }),
  animated: false,
  animationSteps: null,
  spriteNames: ["grain_bunch.png"]
})
