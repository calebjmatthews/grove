import Box from '../../models/box';
import Map from '../../models/map';
import PieceAnimated from '../../models/piece_animated';
import AnimationStep from '../../models/animation_step';
import { PieceTypeNames } from '../../enums/piece_type_names';

export function createPieceBush(index: number, map: Map) {
  let newBush: PieceAnimated = null;

  let location = map.getOpenGridLocation();
  if (location != null) {
    let bushBox = new Box({
      x: location.xy[0],
      vx: 0,
      y: location.xy[1],
      vy: 0,
      width: 64,
      height: 64,
      boxName: PieceTypeNames.BUSH
    });

    newBush = new PieceAnimated({
      typeName: PieceTypeNames.BUSH,
      id: index,
      gridPos: location.gridPos,
      box: bushBox,
      spriteNames: ["row-4-col-7.png", "row-5-col-8.png"],
      animationSteps: [
        new AnimationStep({ spriteIndex: 0, duration: 400 }),
        new AnimationStep({ spriteIndex: 1, duration: 20 })
      ],
      animationCurrrent: 0,
      animationAge: 0
    });
  }

  return newBush;
}
