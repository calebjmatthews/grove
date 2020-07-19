import PieceType from '../../models/piece_type';
import Breakable from '../../models/breakable';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { ParticleTypes } from '../../enums/particle_types';
import { ItemTypeNames } from '../../enums/item_type_names';

export let tilled = new PieceType({
  name: PieceTypeNames.TILLED,
  collidable: false,
  breakable: null,
  special: [{ index: 0, name: "sprite_map", value: {
    "0,0,0,0": "tilled_sm.png",
    "1,0,0,0": "tilled_n.png",
    "0,1,0,0": "tilled_e.png",
    "0,0,1,0": "tilled_s.png",
    "0,0,0,1": "tilled_w.png",
    "1,1,0,0": "tilled_ne.png",
    "0,1,1,0": "tilled_se.png",
    "0,0,1,1": "tilled_sw.png",
    "1,0,0,1": "tilled_nw.png",
    "1,0,1,0": "tilled_v.png",
    "0,1,0,1": "tilled_h.png",
    "0,1,1,1": "tilled_gn.png",
    "1,0,1,1": "tilled_ge.png",
    "1,1,0,1": "tilled_gs.png",
    "1,1,1,0": "tilled_gw.png",
    "1,1,1,1": "tilled_m.png"
  } }],
  value: null,
  animated: false,
  animationSteps: null,
  spriteNames: ["tilled_sm.png"]
})
