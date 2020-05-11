import { map } from '../../instances/map';
import { TILE_SIZE, PLAYER_SPEED } from '../../constants';

const SCROLL_SPEED = 12;

export function determineOffset(screenWidth: number, screenHeight: number) {
  let pieceXY = map.piecePlayer.getXYAfterOffset([map.offset.x, map.offset.y]);
  pieceXY[0] += (TILE_SIZE/2);
  pieceXY[1] += (TILE_SIZE/2);
  let xPercent = (pieceXY[0] / screenWidth);
  let yPercent = (pieceXY[1] / screenHeight);
  if (xPercent < 0.45) {
    map.offset.vx = ((0.45 - xPercent) * (PLAYER_SPEED * SCROLL_SPEED));
  }
  else if (xPercent > 0.55) {
    map.offset.vx = ((0.55 - xPercent) * (PLAYER_SPEED * SCROLL_SPEED));
  }
  else {
    map.offset.vx = 0;
  }

  if (yPercent < 0.45) {
    map.offset.vy = ((0.45 - yPercent) * (PLAYER_SPEED * SCROLL_SPEED));
  }
  else if (yPercent > 0.55) {
    map.offset.vy = ((0.55 - yPercent) * (PLAYER_SPEED * SCROLL_SPEED));
  }
  else {
    map.offset.vy = 0;
  }
}
