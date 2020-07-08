import ItemType from '../models/item_type';
import { ItemTypeNames } from '../enums/item_type_names';

let itemTypes: { [itemName: string] : ItemType } = {};
itemTypes[ItemTypeNames.SCRAP_WOOD] =
  new ItemType({
    name: ItemTypeNames.SCRAP_WOOD,
    value: 3,
    menuSprite: "dist/working/items/wood.png",
    sceneSprite: "wood_sm.png"}
  );
itemTypes[ItemTypeNames.GRASS_BUNDLE] =
  new ItemType({
    name: ItemTypeNames.GRASS_BUNDLE,
    value: 2,
    menuSprite: "dist/working/items/grass_bundle.png",
    sceneSprite: "grass_bundle_sm.png"}
  );
itemTypes[ItemTypeNames.GRASS_SEED] =
  new ItemType({
    name: ItemTypeNames.GRASS_SEED,
    value: 20,
    menuSprite: "dist/working/items/grass_seed.png",
    sceneSprite: "grass_seed_sm.png"}
  );
itemTypes[ItemTypeNames.GRAIN_BUNDLE] =
  new ItemType({
    name: ItemTypeNames.GRAIN_BUNDLE,
    value: 15,
    menuSprite: "dist/working/items/grain_bundle.png",
    sceneSprite: "grain_bundle_sm.png"}
  );
itemTypes[ItemTypeNames.GRAIN_SEED] =
  new ItemType({
    name: ItemTypeNames.GRAIN_SEED,
    value: 60,
    menuSprite: "dist/working/items/grain_seed.png",
    sceneSprite: "grain_seed_sm.png"}
  );
itemTypes[ItemTypeNames.BLUEBERRIES] =
  new ItemType({
    name: ItemTypeNames.BLUEBERRIES,
    value: 10,
    menuSprite: "dist/working/items/blueberries.png",
    sceneSprite: "blueberries_sm.png"}
  );

export { itemTypes };
