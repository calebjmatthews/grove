import { movePlayerPending } from './move_player_pending';
import { actAndAnimatePlayer } from './animate_player';
import { animate } from './animate';
import { applyOffset } from './apply_offset';
import { determineOffset } from './determine_offset';

export default function play(delta: number) {
  let pendingBox = movePlayerPending(delta);
  actAndAnimatePlayer(pendingBox);
  animate();
  determineOffset(window.innerWidth, window.innerHeight);
  applyOffset(delta);
}
