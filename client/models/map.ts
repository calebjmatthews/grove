import Box from './box';
import Piece from './piece';
import PieceAnimated from './piece_animated';
import PieceDirectional from './piece_directional';
import Collision from '../models/collision';
import { PieceNames } from '../enums/piece_names';

export default class Map {
  playerPiece: PieceDirectional = null;
  piecesAnimated: { [pieceName: string] : PieceAnimated } = {};

  detectCollision(box: Box) : Collision[] {
    let collisions: Collision[] = [];
    Object.keys(this.piecesAnimated).map((pieceName) => {
      let tBox = this.piecesAnimated[pieceName].box;
      if (box.x < tBox.x + tBox.width &&
        box.x + box.width > tBox.x &&
        box.y < tBox.y + tBox.height &&
        box.y + box.height > tBox.y) {
        collisions.push(new Collision({
          direction: box.compareCenters(tBox),
          collidesWith: tBox
        }))
      }
    });
    if (collisions.length > 0) {
      return collisions
    }
    return null;
  }
}
