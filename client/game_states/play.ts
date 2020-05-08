import Box from '../models/box';
import PieceAnimated from '../models/piece_animated';
import PieceDirectional from '../models/piece_directional';
import { map } from '../instances/map';
import { sprites } from '../instances/sprites';
import { PieceNames } from '../enums/piece_names';
import { PieceTypes } from '../enums/piece_types';
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

  Object.keys(map.pieces).map((pieceName) => {
    let piece : PieceDirectional = map.pieces[pieceName];
    if (piece.type == PieceTypes.CARDINAL) {
      let pBox = map.pieces[PieceNames.PLAYER].box;
      let diffX = pBox.x - pendingBox.x;
      let diffY = pBox.y - pendingBox.y;
      let newDirection = Directions.NONE;
      if (diffY != 0) {
        if (diffY < 0) newDirection = Directions.DOWN;
        else newDirection = Directions.UP;
      }
      else if (diffX != 0) {
        if (diffX < 0) newDirection = Directions.RIGHT;
        else newDirection = Directions.LEFT;
      }

      let oldAnimationStep = piece.getCurrentAnimationStep();
      let newStepIndex = piece.ageAnimationByDirection(newDirection);
      if (newStepIndex != null) {
        let newAnimationStep = piece.animationStepMap[piece.directionCurrent]
          [newStepIndex];
        sprites[piece.spriteNames[oldAnimationStep.spriteIndex]].visible = false;
        sprites[piece.spriteNames[newAnimationStep.spriteIndex]].visible = true;
      }

      pBox.x = pendingBox.x;
      pBox.y = pendingBox.y;
      sprites[piece.getCurrentSpriteName()].x = pendingBox.x;
      sprites[piece.getCurrentSpriteName()].y = pendingBox.y;
    }
    else if (piece.animationAge != undefined) {
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
