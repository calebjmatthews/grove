import ItemType from '../models/item_type';
import { ItemTypeNames } from '../enums/item_type_names';

let itemTypes: { [itemName: string] : ItemType } = {};
itemTypes[ItemTypeNames.SCRAP_WOOD] =
  new ItemType({
    name: ItemTypeNames.SCRAP_WOOD,
    menuSprite: "dist/working/items/wood.png",
    sceneSprite: "wood_sm.png"}
  );

export { itemTypes };
