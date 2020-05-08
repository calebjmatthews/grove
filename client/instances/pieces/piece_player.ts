import PieceDirectional from '../../models/piece_directional';
import AnimationStep from '../../models/animation_step';
import Box from '../../models/box';
const AS = AnimationStep;
import { Directions } from '../../enums/directions';
import { PieceNames } from '../../enums/piece_names';
import { PieceTypes } from '../../enums/piece_types';

let animationStepMap: { [key: string] : AnimationStep[] } = {};
animationStepMap[Directions.DOWN] = [
  new AS({ spriteIndex: 0, duration: 10}), new AS({ spriteIndex: 1, duration: 10}),
  new AS({ spriteIndex: 0, duration: 10}), new AS({ spriteIndex: 2, duration: 10})
]
animationStepMap[Directions.LEFT] = [
  new AS({ spriteIndex: 3, duration: 10}), new AS({ spriteIndex: 4, duration: 10}),
  new AS({ spriteIndex: 3, duration: 10}), new AS({ spriteIndex: 5, duration: 10})
]
animationStepMap[Directions.UP] = [
  new AS({ spriteIndex: 6, duration: 10}), new AS({ spriteIndex: 7, duration: 10}),
  new AS({ spriteIndex: 6, duration: 10}), new AS({ spriteIndex: 8, duration: 10})
]
animationStepMap[Directions.RIGHT] = [
  new AS({ spriteIndex: 9, duration: 10}), new AS({ spriteIndex: 10, duration: 10}),
  new AS({ spriteIndex: 9, duration: 10}), new AS({ spriteIndex: 11, duration: 10})
]
let piecePlayer = new PieceDirectional({
  name: PieceNames.PLAYER,
  id: 0,
  box: new Box({
    x: ((window.innerWidth / 2) - 32),
    vx: 0,
    y: ((window.innerHeight / 2) - 32),
    vy: 0,
    width: 64,
    height: 64,
    boxName: PieceNames.PLAYER
  }),
  spriteNames: ["jplayer25.png", "jplayer1.png", "jplayer2.png", "jplayer8.png",
    "jplayer7.png", "jplayer33.png", "jplayer27.png", "jplayer5.png", "jplayer6.png",
    "jplayer4.png", "jplayer3.png", "jplayer34.png"],
  animationSteps: null,
  animationCurrrent: 0,
  animationAge: 0,
  type: PieceTypes.CARDINAL,
  animationStepMap: animationStepMap,
  directionCurrent: Directions.DOWN
});

export { piecePlayer };
