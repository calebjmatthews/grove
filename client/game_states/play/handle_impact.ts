import Piece from '../../models/piece';
import Map from '../../models/map';
import ParticleGroup from '../../models/particle_group';
import { player } from '../../instances/player';
import { sprites } from '../../instances/sprites';
import { pixiContainers } from '../../instances/pixi_containers';
import { pieceTypes } from '../../instances/piece_types';
import { noteItemPickup } from './item_note';
import { rubbleParticlesCreate } from './particle/rubble';
import { sparkleParticlesCreate } from './particle/sparkle';
import { PieceTypeNames } from '../../enums/piece_type_names';
import { ItemNames } from '../../enums/item_names';

export function handleImpact(targetPiece: Piece, pMap: Map) {
  if (targetPiece.breakable == true) {
    let sparkleRes = checkSparkleBlast(targetPiece, pMap);
    if (sparkleRes == false) {
      targetPiece.durability--;
      if (targetPiece.durability <= 0) {
        pMap = destroyTarget(targetPiece, pMap);
      }
      else {
        pMap = chipTarget(targetPiece, pMap);
      }
    }
    pMap = incrementSparkles(pMap);
  }

  return pMap;
}

function chipTarget(targetPiece: Piece, pMap: Map) {
  let particleGroup: ParticleGroup = null;
  if (targetPiece.typeName == PieceTypeNames.BUSH
    || targetPiece.typeName == PieceTypeNames.BUSH_S) {
    particleGroup = rubbleParticlesCreate(3,
      [(targetPiece.box.x + targetPiece.box.width/2),
        (targetPiece.box.y + targetPiece.box.height/2)]);
  }

  pMap.particleGroups.push(particleGroup);
  return pMap;
}

function destroyTarget(targetPiece: Piece, pMap: Map) {
  pMap.destroyPiece(targetPiece, pixiContainers, sprites);
  let particleGroup: ParticleGroup = null;
  if (targetPiece.typeName == PieceTypeNames.BUSH
    || targetPiece.typeName == PieceTypeNames.BUSH_S) {
    let quantity = Math.floor(Math.random()*3);
    if (quantity > 0) {
      player.addToInventory(ItemNames.SCRAP_WOOD, quantity);
      noteItemPickup(ItemNames.SCRAP_WOOD, quantity);
    }
    particleGroup = rubbleParticlesCreate(10,
      [(targetPiece.box.x + targetPiece.box.width/2),
        (targetPiece.box.y + targetPiece.box.height/2)]);
  }

  pMap.particleGroups.push(particleGroup);
  return pMap;
}

function checkSparkleBlast(targetPiece: Piece, pMap: Map) {
  let sparkleRes = false;
  if (targetPiece.special) {
    let sparkleSpecial: any = targetPiece.getSpecial('sparkle');
    if (sparkleSpecial) {
      if (sparkleSpecial.value == 20) {
        sparkleRes = true;
        destroyTarget(targetPiece, pMap);
        let neighbors = pMap.getNeighbors(targetPiece.gridPos, 1);
        neighbors.map((nPiece) => {
          if (nPiece.breakable) {
            destroyTarget(nPiece, pMap);
          }
        });
        let particleGroup = sparkleParticlesCreate(20,
          [(targetPiece.box.x + targetPiece.box.width/2),
            (targetPiece.box.y + targetPiece.box.height/2)], 3);
        pMap.particleGroups.push(particleGroup);
      }
      else {
        targetPiece.special[sparkleSpecial.index].value = null;
        let particleGroup = sparkleParticlesCreate(3,
          [(targetPiece.box.x + targetPiece.box.width/2),
            (targetPiece.box.y + targetPiece.box.height/2)], 1, 'down');
        pMap.particleGroups.push(particleGroup);
      }
    }
  }
  return sparkleRes;
}

function incrementSparkles(pMap: Map) {
  Object.keys(pMap.sparkleMap).map((coords) => {
    let mapObj = pMap.sparkleMap[coords];
    let piece = pMap[mapObj.mapName][mapObj.pieceName];
    let sparkleSpecial = piece.getSpecial('sparkle');
    if (sparkleSpecial.value == 20) {
      let particleGroup = sparkleParticlesCreate(5,
        [(piece.box.x + piece.box.width/2),
          (piece.box.y + piece.box.height/2)]);
      pMap.particleGroups.push(particleGroup);
      piece.special[sparkleSpecial.index].value = 1;
    }
    else if (sparkleSpecial.value == 18) {
      let particleGroup = sparkleParticlesCreate(1,
        [(piece.box.x + piece.box.width/2),
          (piece.box.y + piece.box.height/2)]);
      pMap.particleGroups.push(particleGroup);
      piece.special[sparkleSpecial.index].value++;
    }
    else if (sparkleSpecial.value != null) {
      piece.special[sparkleSpecial.index].value++;
    }
  });
  return pMap;
}
