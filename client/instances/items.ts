import Item from '../models/item';
import { ItemNames } from '../enums/item_names';

let items: { [itemName: string] : Item } = {};
items[ItemNames.SCRAP_WOOD] =
  new Item({ name: ItemNames.SCRAP_WOOD, sprite: "dist/working/items/wood.png" });

export { items };
