import Box from '../../models/box';
import Map from '../../models/map';
import PieceAnimated from '../../models/piece_animated';
import AnimationStep from '../../models/animation_step';
import { PieceNames } from '../../enums/piece_names';

export function createPieceBush(index: number, map: Map) {
  let newBush: PieceAnimated = null;
  let bushBox = findBushBox(map);
  newBush = new PieceAnimated({
    name: PieceNames.BUSH,
    id: index,
    box: bushBox,
    spriteNames: ["forestworld37.png", "forestworld48.png"],
    animationSteps: [
      new AnimationStep({ spriteIndex: 0, duration: 400 }),
      new AnimationStep({ spriteIndex: 1, duration: 20 })
    ],
    animationCurrrent: 0,
    animationAge: 0
  });
  return newBush;
}

function findBushBox(map: Map) {
  let testBush: Box = null;
  for (let loop = 0; loop < 100; loop++) {
    testBush = new Box({
      x: ((window.innerWidth * Math.random()) - 32),
      vx: 0,
      y: ((window.innerHeight * Math.random()) - 32),
      vy: 0,
      width: 64,
      height: 64,
      boxName: PieceNames.BUSH
    });
    if (map.detectCollision(testBush) == null) {
      return testBush;
    }
  }
  return null;
}
