import PieceAnimated from './piece_animated';
import AnimationStep from './animation_step';
import Box from './box';
import Breakable from './breakable';
import { utils } from '../instances/utils';
import { Directions } from '../enums/directions';

export default class PieceDirectional extends PieceAnimated implements
  PieceDirectionalInterface {
  directionAnimMap: { [key: string] : AnimationStep[] };
  directionCurrent: string;
  directionPending: string;

  constructor(pieceDirectional: PieceDirectionalInterface) {
    super(pieceDirectional);
    Object.assign(this, pieceDirectional);
  }

  ageAnimationByDirection(direction: string) {
    // If matching direction of movement, age current directional animation
    if (direction == this.directionCurrent) {
      let newStepIndex = null;
      this.animationAge++;
      let cStep = this.directionAnimMap[this.directionCurrent][this.animationCurrrent];
      if (this.animationAge >= cStep.duration) {
        this.animationCurrrent++;
        newStepIndex = this.animationCurrrent;
        if (this.animationCurrrent >=
          this.directionAnimMap[this.directionCurrent].length) {
          this.animationCurrrent = 0;
          newStepIndex = this.animationCurrrent;
        }
        this.animationAge = 0;
      }
      return newStepIndex;
    }
    // If no direction of movement, change to initial animation step (if not there
    //  already) and do not age
    else if (direction == Directions.NONE) {
      let newStepIndex = 0;
      if (this.animationCurrrent != newStepIndex) {
        this.animationCurrrent = newStepIndex;
        this.animationAge = 0;
      }
      return newStepIndex;
    }
    // If a new direction of movement, change to a random animation step within the new
    //  directional animation with a random age
    else {
      this.directionCurrent = direction;
      let newStepIndex = Math.floor(this.directionAnimMap[direction].length
        * utils.rand());
      this.animationCurrrent = newStepIndex
      this.animationAge = Math.floor(this.directionAnimMap[direction]
        [newStepIndex].duration * utils.rand());
      return newStepIndex;
    }
  }

  getCurrentAnimationStep() {
    return this.directionAnimMap[this.directionCurrent][this.animationCurrrent];
  }

  getCurrentSpriteName() {
    return this.spriteNames[this.directionAnimMap[this.directionCurrent]
      [this.animationCurrrent].spriteIndex];
  }

  getGridPosInFront(targetPos: [number, number]) {
    switch(this.directionCurrent) {
      case (Directions.DOWN):
      targetPos[1]++;
      break;
      case (Directions.LEFT):
      targetPos[0]--;
      break;
      case (Directions.UP):
      targetPos[1]--;
      break;
      case (Directions.RIGHT):
      targetPos[0]++;
      break;
    }
    return targetPos;
  }
}

interface PieceDirectionalInterface {
  typeName: string;
  id: number;
  gridPos: [number, number];
  box: Box;
  collidable: boolean;
  breakable: Breakable;
  grabbable: boolean;
  usable: boolean;
  value: number;
  animated: boolean;
  spriteNames: string[];
  animationSteps: AnimationStep[];
  animationCurrrent: number;
  animationAge: number;

  directionAnimMap: { [key: string] : AnimationStep[] };
  directionCurrent: string;
  directionPending: string;
}
