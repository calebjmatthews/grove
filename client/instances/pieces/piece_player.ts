import PiecePlayer from '../../models/piece_player';
import AnimationStep from '../../models/animation_step';
import Box from '../../models/box';
const AS = AnimationStep;
import { Directions } from '../../enums/directions';
import { PieceNames } from '../../enums/piece_names';
import { PieceTypes } from '../../enums/piece_types';
import { PlayerStatuses } from '../../enums/player_statuses';

let directionAnimMap: { [key: string] : AnimationStep[] } = {};
directionAnimMap[Directions.DOWN] = [
  new AS({ spriteIndex: 0, duration: 10 }), new AS({ spriteIndex: 1, duration: 10 }),
  new AS({ spriteIndex: 0, duration: 10 }), new AS({ spriteIndex: 2, duration: 10 })
]
directionAnimMap[Directions.LEFT] = [
  new AS({ spriteIndex: 3, duration: 10 }), new AS({ spriteIndex: 4, duration: 10 }),
  new AS({ spriteIndex: 3, duration: 10 }), new AS({ spriteIndex: 5, duration: 10 })
]
directionAnimMap[Directions.UP] = [
  new AS({ spriteIndex: 6, duration: 10 }), new AS({ spriteIndex: 7, duration: 10 }),
  new AS({ spriteIndex: 6, duration: 10 }), new AS({ spriteIndex: 8, duration: 10 })
]
directionAnimMap[Directions.RIGHT] = [
  new AS({ spriteIndex: 9, duration: 10 }), new AS({ spriteIndex: 10, duration: 10 }),
  new AS({ spriteIndex: 9, duration: 10 }), new AS({ spriteIndex: 11, duration: 10 })
]

let strikeAnimMap: { [key: string] : AnimationStep[] } = {};
strikeAnimMap[Directions.DOWN] = [
  new AS({ spriteIndex: 12, duration: 8 }), new AS({ spriteIndex: 13, duration: 16 })
]
strikeAnimMap[Directions.LEFT] = [
  new AS({ spriteIndex: 14, duration: 8 }), new AS({ spriteIndex: 15, duration: 16 })
]
strikeAnimMap[Directions.UP] = [
  new AS({ spriteIndex: 16, duration: 8 }), new AS({ spriteIndex: 17, duration: 16 })
]
strikeAnimMap[Directions.RIGHT] = [
  new AS({ spriteIndex: 18, duration: 8 }), new AS({ spriteIndex: 19, duration: 16 })
]

let piecePlayer = new PiecePlayer({
  name: PieceNames.PLAYER,
  id: 0,
  gridPos: [null, null],
  box: new Box({
    x: ((window.innerWidth) - 32),
    vx: 0,
    y: ((window.innerHeight) - 32),
    vy: 0,
    width: 64,
    height: 64,
    boxName: PieceNames.PLAYER
  }),
  spriteNames: ["jplayer25.png", "jplayer1.png", "jplayer2.png", "jplayer8.png",
    "jplayer7.png", "jplayer33.png", "jplayer27.png", "jplayer5.png", "jplayer6.png",
    "jplayer4.png", "jplayer3.png", "jplayer34.png", "jplayer18.png", "jplayer10.png",
    "jplayer24.png", "jplayer16.png", "jplayer30.png", "jplayer14.png", "jplayer20.png",
    "jplayer12.png", ],
  animationSteps: null,
  animationCurrrent: 0,
  animationAge: 0,
  type: PieceTypes.CARDINAL,
  directionAnimMap: directionAnimMap,
  directionCurrent: Directions.DOWN,
  directionPending: Directions.DOWN,
  statusCurrent: PlayerStatuses.NORMAL,
  statusPending: PlayerStatuses.NORMAL,
  strikeAnimMap: strikeAnimMap
});

export { piecePlayer };
