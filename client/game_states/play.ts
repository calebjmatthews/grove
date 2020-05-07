import Box from '../models/box';
import PieceAnimated from '../models/piece_animated';
import { map } from '../instances/map';
import { sprites } from '../instances/sprites';
import { PieceNames } from '../enums/piece_names';
import { Directions } from '../enums/directions';

export default function play(delta: number) {
  let pendingBox = new Box(map.pieces[PieceNames.PLAYER].box);
  pendingBox.x += (pendingBox.vx * (1 + delta));
  pendingBox.y += (pendingBox.vy * (1 + delta));
  let collisions = map.detectCollision(pendingBox);
  if (collisions != null) {
    collisions.map((collision) => {
      switch(collision.direction) {
        case Directions.UP:
        pendingBox.y = (collision.collidesWith.y - pendingBox.height);
        break;

        case Directions.RIGHT:
        pendingBox.x = (collision.collidesWith.x + collision.collidesWith.width);
        break;

        case Directions.DOWN:
        pendingBox.y = (collision.collidesWith.y + collision.collidesWith.height);
        break;

        case Directions.LEFT:
        pendingBox.x = (collision.collidesWith.x - pendingBox.width);
        break;
      }
    });
  }
  let pBox = map.pieces[PieceNames.PLAYER].box;
  pBox.x = pendingBox.x;
  pBox.y = pendingBox.y;
  sprites['jplayer1.png'].x = pendingBox.x;
  sprites['jplayer1.png'].y = pendingBox.y;

  Object.keys(map.pieces).map((pieceName) => {
    let piece : PieceAnimated = map.pieces[pieceName];
    if (piece.animationAge != undefined) {
      let oldAnimationStep = piece.animationSteps[piece.animationCurrrent];
      let newStepIndex = piece.ageAnimation();
      if (newStepIndex != null) {
        let newAnimationStep = piece.animationSteps[newStepIndex];
        sprites[pieceName + ',' + oldAnimationStep.spriteIndex].visible = false;
        sprites[pieceName + ',' + newAnimationStep.spriteIndex].visible = true;
      }
    }
  })
}
