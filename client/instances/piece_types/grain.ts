import PieceType from '../../models/piece_type';
import Breakable from '../../models/breakable';
import GrowthStage from '../../models/growth_stage';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { ParticleTypes } from '../../enums/particle_types';
import { ItemTypeNames } from '../../enums/item_type_names';

let growingDrops: {[ itemName: string] : [number, number]} = {};
growingDrops[ItemTypeNames.GRAIN_SEED] = [1, 1];
let matureDrops: {[ itemName: string] : [number, number]} = {};
matureDrops[ItemTypeNames.GRAIN_SEED] = [1, 1.5];
matureDrops[ItemTypeNames.GRAIN_BUNDLE] = [1, 3];
export let grain = new PieceType({
  name: PieceTypeNames.GRAIN,
  collidable: true,
  breakable: new Breakable({ durability: 1, particleType: ParticleTypes.RUBBLE_WOOD,
    drops: growingDrops }),
  value: null,
  animated: false,
  animationSteps: null,
  spriteNames: ["grain_grow0.png"],
  growthAge: 0,
  growthStageIndex: 0,
  growthStages: [
    new GrowthStage({ duration: 500, spriteNames: ["grain_grow0.png"],
      animationSteps: null, drops: growingDrops }),
    new GrowthStage({ duration: 2000, spriteNames: ["grain_grow1.png"],
      animationSteps: null, drops: growingDrops }),
    new GrowthStage({ duration: 2000, spriteNames: ["grain_grow2.png"],
      animationSteps: null, drops: growingDrops }),
    new GrowthStage({ duration: 2000, spriteNames: ["grain_grow3.png"],
      animationSteps: null, drops: growingDrops }),
    new GrowthStage({ duration: null, spriteNames: ["grain_grow4.png"],
      animationSteps: null, drops: matureDrops }),
  ]
});

let grainClone = new PieceType(grain);
export let grainMature = Object.assign(grainClone, {
  name: PieceTypeNames.GRAIN_MATURE,
  breakable: new Breakable({ durability: 1, particleType: ParticleTypes.RUBBLE_WOOD,
    drops: matureDrops }),
  spriteNames: ["grain_grow4.png"],
  growthAge: 10000,
  growthStageIndex: 4
});
