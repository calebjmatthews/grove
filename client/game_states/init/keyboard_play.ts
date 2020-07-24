import Key from '../../models/key';
import { map } from '../../instances/map';
import { player } from '../../instances/player';
import { keySelect, keyNameSel, keyActionMap } from '../play/key_select';
import { expendItems } from '../play/expend_items';
import { placePiece } from '../play/place_piece';
import { Directions } from '../../enums/directions';
import { PlayerStatuses } from '../../enums/player_statuses';
import { ItemTypeNames } from '../../enums/item_type_names';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { PLAYER_SPEED, TOOLBAR_KEYS } from '../../constants';

let keyboard: { [keyName: string] : Key } = {};

export function createKeyboardPlay() {
  let pcPlayer = map.piecePlayer;
  let pBox = map.piecePlayer.box;

  let left = new Key("ArrowLeft");
  left.press = () => {
    // Change the pBox's velocity when the key is pressed
    pBox.vx = -PLAYER_SPEED;
    pcPlayer.directionPending = Directions.LEFT;
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
    pcPlayer.directionPending = Directions.RIGHT;
  };
  right.release = () => {
    if (!left.isDown) {
      pBox.vx = 0;
    }
  };

  let up = new Key("ArrowUp");
  up.press = () => {
    pBox.vy = -PLAYER_SPEED;
    pcPlayer.directionPending = Directions.UP;
  };
  up.release = () => {
    if (!down.isDown) {
      pBox.vy = 0;
    }
  };

  let down = new Key("ArrowDown");
  down.press = () => {
    pBox.vy = PLAYER_SPEED;
    pcPlayer.directionPending = Directions.DOWN;
  };
  down.release = () => {
    if (!up.isDown) {
      pBox.vy = 0;
    }
  };

  let z = new Key("z");
  z.press = () => {
    if (keyActionMap[keyNameSel]) {
      switch (keyActionMap[keyNameSel].name) {
        case ItemTypeNames.IRONWOOD_BRANCH:
        if (pcPlayer.statusPending != PlayerStatuses.STRIKING
          && pcPlayer.statusCurrent != PlayerStatuses.STRIKING)
        pcPlayer.statusPending = PlayerStatuses.STRIKING;
        break;

        case ItemTypeNames.BLUEBERRIES:
        player.fullness += 50;
        if (player.fullness > 100) {
          player.fullness = 100;
        }
        expendItems(ItemTypeNames.BLUEBERRIES, 1);
        break;

        case ItemTypeNames.GRAIN_SEED:
        placePiece(PieceTypeNames.GRAIN);
        break;
      }
    }
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
