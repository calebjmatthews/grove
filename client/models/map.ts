import Box from './box';

export default class Map {
  boxes: { [spriteName: string] : Box } = {};

  detectCollision(box: Box) {
    let collidesWith = null;
    Object.keys(this.boxes).map((boxName) => {
      let tBox = this.boxes[boxName];
      if (box.x < tBox.x + tBox.width &&
        box.x + box.width > tBox.x &&
        box.y < tBox.y + tBox.height &&
        box.y + box.height > tBox.y) {
        collidesWith = tBox;
      }
    });
    return collidesWith;
  }
}
