import Piece from './piece';
import PieceAnimated from './piece_animated';
import PieceCrop from './piece_crop';
import Box from './box';
import AnimationStep from './animation_step';
import Breakable from './breakable';
import GrowthStage from './growth_stage';
import { utils } from '../instances/utils';
import { TILE_SIZE } from '../constants';

export default class PieceType implements PieceTypeInterface {
  name: string;
  collidable: boolean;
  breakable: Breakable;
  value: number;
  special?: any[];
  animated: boolean;
  animationSteps: AnimationStep[];
  spriteNames: string[];
  growthAge?: number;
  growthStageIndex?: number;
  growthStages?: GrowthStage[];

  constructor(pieceType: PieceTypeInterface) {
    Object.assign(this, pieceType);
  }

  createPiece(id: number, gridPos: [number, number], xy: [number, number]): any {
    let breakable = (this.breakable) ? Object.assign({}, this.breakable) : null;
    let piece = new Piece({
      typeName: this.name,
      id: id,
      gridPos: gridPos,
      box: new Box({
        x: xy[0],
        vx: 0,
        y: xy[1],
        vy: 0,
        width: TILE_SIZE,
        height: TILE_SIZE,
        boxName: this.name
      }),
      collidable: this.collidable,
      breakable: breakable,
      grabbable: false,
      usable: false,
      value: this.value,
      animated: this.animated,
      spriteNames: this.spriteNames
    });

    if (this.special != undefined) {
      piece.special = [];
      this.special.map((special, index) => {
        piece.special[index] = Object.assign({}, special);
        if (piece.special[index].name == 'sparkle') {
          piece.special[index].value = Math.floor(utils.rand() * (special.value-1)) + 1;
        }
      });
    }

    if (this.growthStages != undefined) {
      return new PieceCrop(Object.assign({}, piece, {
        growthAge: this.growthAge,
        growthStageIndex: this.growthStageIndex,
        growthStages: this.growthStages,
        animationSteps: this.animationSteps,
        animationCurrrent: 0,
        animationAge: 0
      }))
    }
    else if (this.animated == true) {
      return new PieceAnimated(Object.assign({}, piece, {
        animationSteps: this.animationSteps,
        animationCurrrent: 0,
        animationAge: 0
      }));
    }
    else {
      return piece;
    }
  }
}

interface PieceTypeInterface {
  name: string;
  collidable: boolean;
  breakable: Breakable;
  special?: any[];
  value: number;
  animated: boolean;
  animationSteps: AnimationStep[];
  spriteNames: string[];
  growthAge?: number;
  growthStageIndex?: number;
  growthStages?: GrowthStage[];
}
