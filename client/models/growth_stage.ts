import AnimationStep from './animation_step';

export default class GrowthStage {
  duration: number;
  spriteNames: string[];
  animationSteps: AnimationStep[];
  drops: {[ itemName: string] : [number, number]};

  constructor(growthStage: GrowthStage) {
    Object.assign(this, growthStage);
  }
}
