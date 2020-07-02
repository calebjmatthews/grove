import { Directions } from '../enums/directions';

export default class Box {
  x: number;
  vx: number;
  y: number;
  vy: number;
  lastVY?: number;
  originY?: number;
  width: number;
  height: number;
  boxName: string;

  constructor(box: BoxInterface) {
    Object.assign(this, box);
    if (box.lastVY == undefined) {
      this.lastVY = box.vy;
    }
    if (box.originY == undefined) {
      this.originY = box.y;
    }
  }

  getCenter() {
    return [(this.x + (this.width/2)), (this.y + (this.height/2))]
  }

  compareCenters(box: Box) {
    let tCenter = this.getCenter();
    let bCenter = box.getCenter();
    let xDiff = tCenter[0] - bCenter[0];
    let yDiff = tCenter[1] - bCenter[1];
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff < 0) {
        return Directions.LEFT;
      }
      else {
        return Directions.RIGHT;
      }
    }
    else {
      if (yDiff < 0) {
        return Directions.UP;
      }
      else {
        return Directions.DOWN;
      }
    }
    return Directions.UP;
  }
}

interface BoxInterface {
  x: number;
  vx: number;
  y: number;
  vy: number;
  lastVY?: number;
  originY?: number;
  width: number;
  height: number;
  boxName: string;
}
