import Box from './box';
import Piece from './piece';
import Collision from '../models/collision';
import { PieceNames } from '../enums/piece_names';

export default class Map {
  pieces: { [pieceName: string] : Piece } = {};

  detectCollision(box: Box) : Collision[] {
    let collisions: Collision[] = [];
    Object.keys(this.pieces).map((pieceName) => {
      let tBox = this.pieces[pieceName].box;
      // So a pending player box cannot collide with the existing
      if ((box.boxName == PieceNames.PLAYER && tBox.boxName != box.boxName)
        || box.boxName != PieceNames.PLAYER) {
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
