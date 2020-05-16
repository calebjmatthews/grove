import { movePlayerPending } from '../play/move_player_pending';
import { animate } from '../play/animate';
import { applyOffset } from '../play/apply_offset';
import { particleAgeOut } from '../play/particle/particle_age_out';
import { determineOffset } from '../play/determine_offset';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';

export default function edit(delta: number) {
  animate();
  applyOffset(delta);
  map.animateParticleGroups(delta);
}
