import Box from './box';
import Piece from './piece';
import { utils } from '../instances/utils';
import { ITEM_SIZE } from '../constants';

export default class ItemType implements ItemTypeInterface {
  name: string;
  menuSprite: string;
  sceneSprite: string;

  constructor(itemType: ItemTypeInterface) {
    Object.assign(this, itemType);
  }

  createPiece(id: number, gridPos: [number, number], xy: [number, number]): any {
    let vx = 1.5 + (utils.rand() * 4.5);
    if (utils.rand() < 0.5) {
      vx = -vx;
    }
    let vy = -(3 + (utils.rand() * 3));
    if (utils.rand() < 0.5) {vx = -vx};
    let piece = new Piece({
      typeName: this.name,
      id: id,
      gridPos: gridPos,
      box: new Box({
        x: xy[0],
        vx: vx,
        y: xy[1],
        originY: xy[1],
        vy: vy,
        lastVY: vy,
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        boxName: this.name
      }),
      collidable: false,
      breakable: false,
      durability: null,
      animated: false,
      spriteNames: [this.sceneSprite]
    });

    return piece;
  }
}

interface ItemTypeInterface {
  name: string;
  menuSprite: string;
  sceneSprite: string;
}
