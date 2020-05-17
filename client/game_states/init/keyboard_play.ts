import Key from '../../models/key';
import { map } from '../../instances/map';
import { Directions } from '../../enums/directions';
import { PlayerStatuses } from '../../enums/player_statuses';
import { PLAYER_SPEED } from '../../constants';

export function createKeyboardPlay() {
  let player = map.piecePlayer;
  let pBox = map.piecePlayer.box;

  let left = new Key("ArrowLeft");
  left.press = () => {
    // Change the pBox's velocity when the key is pressed
    pBox.vx = -PLAYER_SPEED;
    player.directionPending = Directions.LEFT;
  };
  left.release = () => {
    // If the left arrow has been released, and the right arrow isn't down
    //  stop the pBox
    if (!right.isDown) {
      pBox.vx = 0;
    }
  };

  let right = new Key("ArrowRight");
  right.press = () => {
    pBox.vx = PLAYER_SPEED;
    player.directionPending = Directions.RIGHT;
  };
  right.release = () => {
    if (!left.isDown) {
      pBox.vx = 0;
    }
  };

  let up = new Key("ArrowUp");
  up.press = () => {
    pBox.vy = -PLAYER_SPEED;
    player.directionPending = Directions.UP;
  };
  up.release = () => {
    if (!down.isDown) {
      pBox.vy = 0;
    }
  };

  let down = new Key("ArrowDown");
  down.press = () => {
    pBox.vy = PLAYER_SPEED;
    player.directionPending = Directions.DOWN;
  };
  down.release = () => {
    if (!up.isDown) {
      pBox.vy = 0;
    }
  };

  let space = new Key(" ");
  space.press = () => {
    if (player.statusPending != PlayerStatuses.STRIKING
      && player.statusCurrent != PlayerStatuses.STRIKING)
    player.statusPending = PlayerStatuses.STRIKING;
  };
  down.release = () => {
    if (!up.isDown) {
      pBox.vy = 0;
    }
  };
}