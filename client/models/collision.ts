import Box from './box';

export default class Collision {
  direction: string;
  collidesWith: Box;

  constructor(collision: Collision) {
    Object.assign(this, collision);
  }
}
