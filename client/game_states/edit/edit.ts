import { pieceTypeNameSel } from './piece_type_select';
import { animate } from '../play/animate';
import { applyOffset } from '../play/apply_offset';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
import { pixiRenderer } from '../../instances/pixi_renderer';
import { pixiContainers } from '../../instances/pixi_containers';
const pc = pixiContainers;

export default function edit(delta: number) {
  // animate();
  applyOffset(delta);
  map.animateParticleGroups(delta);
  pixiRenderer.pr.render(pc.all);
}
