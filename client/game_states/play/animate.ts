import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';

export function animate() {
  Object.keys(map.piecesAnimated).map((pieceName) => {
    let piece = map.piecesAnimated[pieceName];
    let oldAnimationStep = piece.animationSteps[piece.animationCurrrent];
    let oldSpriteName = piece.spriteNames[oldAnimationStep.spriteIndex];
    let newStepIndex = piece.ageAnimation();
    if (newStepIndex != null) {
      let newAnimationStep = piece.animationSteps[newStepIndex];
      let newSpriteName = piece.spriteNames[newAnimationStep.spriteIndex];
      sprites[oldSpriteName + ',' + piece.id].visible = false;
      sprites[newSpriteName + ',' + piece.id].visible = true;
    }
  })
}
