export default class Offset {
  x: number;
  vx: number;
  y: number;
  vy: number;

  constructor(offset: Offset) {
    Object.assign(this, offset);
  }
}
