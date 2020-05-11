import Key from '../../models/key';
import { map } from '../../instances/map';
import { PLAYER_SPEED } from '../../constants';

export function createKeyboard() {
  let pBox = map.piecePlayer.box;

  let left = new Key("ArrowLeft");
  left.press = () => {
    // Change the pBox's velocity when the key is pressed
    pBox.vx = -PLAYER_SPEED;
  };
  left.release = () => {
    // If the left arrow has been released, and the right arrow isn't down
    //  stop the pBox
    if (!right.isDown) {
      pBox.vx = 0;
    }
  };

  let up = new Key("ArrowUp");
  up.press = () => {
    pBox.vy = -PLAYER_SPEED;
  };
  up.release = () => {
    if (!down.isDown) {
      pBox.vy = 0;
    }
  };

  let right = new Key("ArrowRight");
  right.press = () => {
    pBox.vx = PLAYER_SPEED;
  };
  right.release = () => {
    if (!left.isDown) {
      pBox.vx = 0;
    }
  };

  let down = new Key("ArrowDown");
  down.press = () => {
    pBox.vy = PLAYER_SPEED;
  };
  down.release = () => {
    if (!up.isDown) {
      pBox.vy = 0;
    }
  };
}
