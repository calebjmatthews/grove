export default class Box {
  x: number;
  y: number;
  width: number;
  height: number;
  spriteName: string;

  constructor(box: Box) {
    Object.assign(this, box);
  }
}
