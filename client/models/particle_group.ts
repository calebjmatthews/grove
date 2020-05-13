import * as PIXI from 'pixi.js';

export default class ParticleGroup {
  particleType: string;
  id: number;
  spriteNames: string[];
  spriteProps: { [spriteName: string] : any };
  maxAge: number;
  age: number;

  animate: (pg: ParticleGroup, delta: number) => void;

  constructor(particleGroup: ParticleGroup) {
    Object.assign(this, particleGroup);
  }
}
