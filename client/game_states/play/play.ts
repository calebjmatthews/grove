import { movePlayerPending } from './move_player_pending';
import { actAndAnimatePlayer } from './animate_player';
import { animate } from './animate';
import { applyOffset } from './apply_offset';
import { particleAgeOut } from './particle/particle_age_out';
import { determineOffset } from './determine_offset';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';

export default function play(delta: number) {
  let pendingBox = movePlayerPending(delta);
  actAndAnimatePlayer(pendingBox);
  // animate();
  determineOffset(window.innerWidth, window.innerHeight);
  applyOffset(delta);
  map.agePlayEvents();
  map.animateParticleGroups(delta);
  particleAgeOut();
}
