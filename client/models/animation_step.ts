export default class AnimationStep {
  spriteIndex: number;
  duration: number;

  constructor(animationStep: AnimationStep) {
    Object.assign(this, animationStep);
  }
}
