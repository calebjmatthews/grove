import KeyAction from '../../models/key_action';
import { unsetKeyAction } from './key_select';
import { player } from '../../instances/player';
import { itemTypes } from '../../instances/item_types';

export function expendItems(typeName: string, count: number, silent: boolean = false) {
  player.removeFromInventory(typeName, count);
  let itemType = itemTypes[typeName];
  if (itemType.usable) {
    unsetKeyAction(null, new KeyAction({ name: typeName, type: 'item',
      imgUrl: itemType.menuSprite, quantity: count }));
  }
}
