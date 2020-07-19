import Key from '../../models/key';
import { map } from '../../instances/map';
import { keySelect } from '../play/key_select';
import { Directions } from '../../enums/directions';
import { PlayerStatuses } from '../../enums/player_statuses';
import { PLAYER_SPEED, TOOLBAR_KEYS } from '../../constants';

let keyboard: { [keyName: string] : Key } = {};

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

  let z = new Key("z");
  z.press = () => {
    if (player.statusPending != PlayerStatuses.STRIKING
      && player.statusCurrent != PlayerStatuses.STRIKING)
    player.statusPending = PlayerStatuses.STRIKING;
  };

  keyboard['left'] = left;
  keyboard['right'] = right;
  keyboard['up'] = up;
  keyboard['down'] = down;
  keyboard['z'] = z;

  TOOLBAR_KEYS.map((keyName) => {
    let toolbarKey = new Key(keyName);
    toolbarKey.press = () => {
      keySelect(keyName);
    };
    keyboard[keyName] = toolbarKey;
  });
}

export function getKeyboardPlay() {
  return keyboard;
}
