import PieceAnimated from './piece_animated';
import AnimationStep from './animation_step';
import Box from './box';
import { Directions } from '../enums/directions';

export default class PieceDirectional extends PieceAnimated implements
  PieceDirectionalInterface {
  type: string;
  animationStepMap: { [key: string] : AnimationStep[] };
  directionCurrent: string;

  constructor(pieceDirectional: PieceDirectionalInterface) {
    super(pieceDirectional);
    Object.assign(this, pieceDirectional);
  }

  ageAnimationByDirection(direction: string) {
    // If matching direction of movement, age current directional animation
    if (direction == this.directionCurrent) {
      let newStepIndex = null;
      this.animationAge++;
      let cStep = this.animationStepMap[this.directionCurrent][this.animationCurrrent];
      if (this.animationAge >= cStep.duration) {
        this.animationCurrrent++;
        newStepIndex = this.animationCurrrent;
        if (this.animationCurrrent >=
          this.animationStepMap[this.directionCurrent].length) {
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
      let newStepIndex = Math.floor(this.animationStepMap[direction].length
        * Math.random());
      this.animationCurrrent = newStepIndex
      this.animationAge = Math.floor(this.animationStepMap[direction]
        [newStepIndex].duration * Math.random());
      return newStepIndex;
    }
  }

  getCurrentAnimationStep() {
    return this.animationStepMap[this.directionCurrent][this.animationCurrrent];
  }

  getCurrentSpriteName() {
    return this.spriteNames[this.animationStepMap[this.directionCurrent]
      [this.animationCurrrent].spriteIndex];
  }
}

interface PieceDirectionalInterface {
  name: string;
  id: number;
  box: Box;
  spriteNames: string[];
  animationSteps: AnimationStep[];
  animationCurrrent: number;
  animationAge: number;

  type: string;
  animationStepMap: { [key: string] : AnimationStep[] };
  directionCurrent: string;
}