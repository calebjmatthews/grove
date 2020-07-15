import PieceType from '../../models/piece_type';
import Breakable from '../../models/breakable';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { ParticleTypes } from '../../enums/particle_types';
import { ItemTypeNames } from '../../enums/item_type_names';

let drops: {[ itemName: string] : [number, number]} = {};
export let dirt = new PieceType({
  name: PieceTypeNames.DIRT,
  collidable: false,
  breakable: new Breakable({ durability: 1, particleType: ParticleTypes.RUBBLE_WOOD,
    drops: drops }),
  special: [{ index: 0, name: "sprite_map", value: {
    "0,0,0,0": "dirt_sm.png",
    "1,0,0,0": "dirt_n.png",
    "0,1,0,0": "dirt_e.png",
    "0,0,1,0": "dirt_s.png",
    "0,0,0,1": "dirt_w.png",
    "1,1,0,0": "dirt_ne.png",
    "0,1,1,0": "dirt_se.png",
    "0,0,1,1": "dirt_sw.png",
    "1,0,0,1": "dirt_nw.png",
    "1,0,1,0": "dirt_v.png",
    "0,1,0,1": "dirt_h.png",
    "0,1,1,1": "dirt_gn.png",
    "1,0,1,1": "dirt_ge.png",
    "1,1,0,1": "dirt_gs.png",
    "1,1,1,0": "dirt_gw.png",
    "1,1,1,1": "dirt_m.png"
  } }],
  value: null,
  animated: false,
  animationSteps: null,
  spriteNames: ["dirt_m.png"]
})
