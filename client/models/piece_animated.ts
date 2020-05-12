import Piece from './piece';
import AnimationStep from './animation_step';
import Box from './box';

export default class PieceAnimated extends Piece implements PieceAnimatedInterface {
  animationSteps: AnimationStep[];
  animationCurrrent: number;
  animationAge: number;

  constructor(pieceAnimated: PieceAnimatedInterface) {
    super(pieceAnimated);

    Object.assign(this, pieceAnimated);
  }

  ageAnimation() {
    let newStepIndex = null;
    this.animationAge++;
    let cStep = this.animationSteps[this.animationCurrrent];
    if (this.animationAge >= cStep.duration) {
      this.animationCurrrent++;
      newStepIndex = this.animationCurrrent;
      if (this.animationCurrrent >= this.animationSteps.length) {
        this.animationCurrrent = 0;
        newStepIndex = this.animationCurrrent;
      }
      this.animationAge = 0;
    }
    return newStepIndex;
  }

  setRandomAge() {
    let cAnimationStep = this.animationSteps[this.animationCurrrent];
    this.animationAge = Math.floor(Math.random() * cAnimationStep.duration);
  }

  getCurrentSpriteName() {
    return (this.spriteNames[this.animationSteps[this.animationCurrrent].spriteIndex]
      + ',' + this.id);
  }
}

interface PieceAnimatedInterface {
  name: string;
  id: number;
  gridPos: [number, number];
  box: Box;
  spriteNames: string[];
  
  animationSteps: AnimationStep[];
  animationCurrrent: number;
  animationAge: number;
}
