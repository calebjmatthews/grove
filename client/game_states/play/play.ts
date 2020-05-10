import { movePlayerPending } from './move_player_pending';
import { animatePlayer } from './animate_player';
import { animate } from './animate';

export default function play(delta: number) {
  let pendingBox = movePlayerPending(delta);
  animatePlayer(pendingBox);
  animate();
}
