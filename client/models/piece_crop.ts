import PieceAnimated from './piece_animated';
import AnimationStep from './animation_step';
import GrowthStage from './growth_stage';
import Box from './box';
import Breakable from './breakable';
import { utils } from '../instances/utils';

export default class PieceCrop extends PieceAnimated implements PieceCropInterface {
  growthAge: number;
  growthStageIndex: number;
  growthStages: GrowthStage[];

  constructor(pieceCrop: PieceCropInterface) {
    super(pieceCrop);
    Object.assign(this, pieceCrop);
  }

  mutateToNewGrowthStage(gsIndex: number) {
    let newGrowthStage = this.growthStages[gsIndex];
    this.spriteNames = newGrowthStage.spriteNames;
    this.animationSteps = newGrowthStage.animationSteps;
    this.breakable.drops = newGrowthStage.drops;
  }
}

interface PieceCropInterface {
  typeName: string;
  id: number;
  gridPos: [number, number];
  box: Box;
  collidable: boolean;
  breakable: Breakable;
  grabbable: boolean;
  usable: boolean;
  value: number;
  animated: boolean;
  spriteNames: string[];
  animationSteps: AnimationStep[];
  animationCurrrent: number;
  animationAge: number;

  growthAge: number;
  growthStageIndex: number;
  growthStages: GrowthStage[];
}
