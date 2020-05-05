import Box from './box';
import Collision from '../models/collision';
import { BoxNames } from '../enums/box_names';

export default class Map {
  boxes: { [boxName: string] : Box } = {};

  detectCollision(box: Box) : Collision[] {
    let collisions: Collision[] = [];
    Object.keys(this.boxes).map((boxName) => {
      let tBox = this.boxes[boxName];
      // So a pending player box cannot collide with the existing
      if ((box.boxName == BoxNames.PLAYER && tBox.boxName != box.boxName)
        || box.boxName != BoxNames.PLAYER) {
        if (box.x < tBox.x + tBox.width &&
          box.x + box.width > tBox.x &&
          box.y < tBox.y + tBox.height &&
          box.y + box.height > tBox.y) {
          collisions.push(new Collision({
            direction: box.compareCenters(tBox),
            collidesWith: tBox
          }))
        }
      }
    });
    if (collisions.length > 0) {
      return collisions
    }
    return null;
  }
}
