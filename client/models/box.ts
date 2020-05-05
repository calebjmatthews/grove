export default class Box {
  x: number;
  vx: number;
  y: number;
  vy: number;
  width: number;
  height: number;
  spriteName: string;
  boxName: string;

  constructor(box: Box) {
    Object.assign(this, box);
  }
}
