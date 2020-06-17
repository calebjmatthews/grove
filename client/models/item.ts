export default class Item {
  name: string;
  sprite: string;

  constructor(item: Item) {
    Object.assign(this, item);
  }
}
