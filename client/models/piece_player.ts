import PieceDirectional from './piece_directional';
import AnimationStep from './animation_step';
import Box from './box';
import { Directions } from '../enums/directions';
import { PlayerStatuses } from '../enums/player_statuses';

export default class PiecePlayer extends PieceDirectional implements
  PiecePlayerInterface {
  statusCurrent: string;
  statusPending: string;
  strikeAnimMap: { [key: string] : AnimationStep[] };

  constructor(piecePlayer: PiecePlayerInterface) {
    super(piecePlayer);
    Object.assign(this, piecePlayer);
  }

  ageAnimationByDirectionAndStatus(direction: string, statusNew: boolean) {
    if (statusNew) {
      this.animationCurrrent = 0;
      this.animationAge = 0;
    }
    switch (this.statusPending) {
      case (PlayerStatuses.STRIKING):
      let newStepIndex = null;
      this.animationAge++;
      let cStep = this.strikeAnimMap[this.directionCurrent][this.animationCurrrent];
      if (statusNew) {
        newStepIndex = this.animationCurrrent;
      }
      else if (this.animationAge >= cStep.duration) {
        this.animationCurrrent++;
        newStepIndex = this.animationCurrrent;
        this.animationAge = 0;
      }
      return newStepIndex;
      break;

      case (PlayerStatuses.NORMAL):
      // If matching direction of movement, age current directional animation
      if (direction == this.directionCurrent) {
        let newStepIndex = null;
        this.animationAge++;
        let cStep = this.directionAnimMap[this.directionCurrent][this.animationCurrrent];
        if (this.animationAge >= cStep.duration) {
          this.animationCurrrent++;
          newStepIndex = this.animationCurrrent;
          if (this.animationCurrrent >=
            this.directionAnimMap[this.directionCurrent].length) {
            this.animationCurrrent = 0;
            newStepIndex = this.animationCurrrent;
          }
          this.animationAge = 0;
        }
        return newStepIndex;
      }
      // If no direction of movement, change to initial animation step (if not there
      //  already) and do not age
      else if (direction == Directions.NONE) {
        let newStepIndex = 0;
        if (this.animationCurrrent != newStepIndex) {
          this.animationCurrrent = newStepIndex;
          this.animationAge = 0;
        }
        return newStepIndex;
      }
      // If a new direction of movement, change to a random animation step within the new
      //  directional animation with a random age
      else {
        this.directionCurrent = direction;
        let newStepIndex = Math.floor(this.directionAnimMap[direction].length
          * Math.random());
        this.animationCurrrent = newStepIndex
        this.animationAge = Math.floor(this.directionAnimMap[direction]
          [newStepIndex].duration * Math.random());
        return newStepIndex;
      }
      break;
    }
  }

  getCurrentAnimationStep() {
    let animMap = this.directionAnimMap;
    if (this.statusCurrent == PlayerStatuses.STRIKING) {
      animMap = this.strikeAnimMap;
    }
    return animMap[this.directionCurrent][this.animationCurrrent];
  }

  getCurrentSpriteName() {
    let animStep = this.getCurrentAnimationStep();
    return this.spriteNames[animStep.spriteIndex];
  }
}

interface PiecePlayerInterface {
  typeName: string;
  id: number;
  gridPos: [number, number];
  box: Box;
  collidable: boolean;
  breakable: boolean;
  durability: number;
  animated: boolean;
  spriteNames: string[];
  animationSteps: AnimationStep[];
  animationCurrrent: number;
  animationAge: number;
  directionAnimMap: { [key: string] : AnimationStep[] };
  directionCurrent: string;
  directionPending: string;

  statusCurrent: string;
  statusPending: string;
  strikeAnimMap: { [key: string] : AnimationStep[] };
}
