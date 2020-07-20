import KeyAction from '../../models/key_action';
import { noteItemPickup } from './item_note';
import { setKeyAction } from './key_select';
import { player } from '../../instances/player';
import { itemTypes } from '../../instances/item_types';

export function collectItems(typeName: string, count: number, silent: boolean = false) {
  player.addToInventory(typeName, count);
  let itemType = itemTypes[typeName];
  if (itemType.usable) {
    setKeyAction(null, new KeyAction({ name: typeName, type: 'item',
      imgUrl: itemType.menuSprite, quantity: count }));
  }
  if (!silent) {
    noteItemPickup(typeName, count);
  }
}
