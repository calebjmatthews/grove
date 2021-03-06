import { movePlayerPending } from './move_player_pending';
import { actAndAnimatePlayer } from './animate_player';
import { animate } from './animate';
import { applyOffset } from './apply_offset';
import { particleAgeOut } from './particle/particle_age_out';
import { determineOffset } from './determine_offset';
import { moveItems } from './move_items';
import { handleHunger } from './handle_hunger';
import { pixiApp } from '../../instances/pixi_app';
import { pixiRenderer } from '../../instances/pixi_renderer';
import { pixiContainers } from '../../instances/pixi_containers';
const pc = pixiContainers;
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';

export default function play(delta: number) {
  let pendingBox = movePlayerPending(delta);
  actAndAnimatePlayer(pendingBox);
  // animate();
  determineOffset(window.innerWidth, window.innerHeight);
  applyOffset(delta);
  moveItems(delta);
  handleHunger();
  map.agePlayEvents();
  map.animateParticleGroups(delta);
  map.ageParticlesOut(pixiContainers);
  particleAgeOut();
  pixiRenderer.pr.render(pc.all);
}
