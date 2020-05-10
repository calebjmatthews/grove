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
    spriteNames: ["row-4-col-7.png", "row-5-col-8.png"],
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
  let xy = map.getOpenGridXY();
  if (xy != null) {
    return new Box({
      x: xy[0],
      vx: 0,
      y: xy[1],
      vy: 0,
      width: 64,
      height: 64,
      boxName: PieceNames.BUSH
    });
  }
  return null;
}
