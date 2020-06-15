import { map } from '../../../instances/map';
import { pixiContainers } from '../../../instances/pixi_containers';
import { PieceTypeNames } from '../../../enums/piece_type_names';

export function particleAgeOut() {
  for (let index = map.particleGroups.length-1; index >= 0; index--) {
    let pg = map.particleGroups[index];
    if (pg.age < pg.maxAge) {
      pg.age++;
    }
    else {
      pixiContainers.main
        .removeChild(pixiContainers[pg.particleType + ',' + pg.id]);
      map.particleGroups.splice(index, 1);
    }
  }
}
