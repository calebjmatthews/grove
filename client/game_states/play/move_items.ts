import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
import { player } from '../../instances/player';
import { pixiContainers } from '../../instances/pixi_containers';
import { noteItemPickup } from './item_note';
import { ItemTypeNames } from '../../enums/item_type_names';

export function moveItems(delta: number) {
  Object.keys(map.piecesItem).map((pieceName) => {
    let piece = map.piecesItem[pieceName];
    if (piece) {
      let posChanged = false;
      if (Math.abs(piece.box.vx) > 0) {
        piece.box.x += (piece.box.vx * delta);
        piece.box.vx *= 0.9;
        if (Math.abs(piece.box.vx) < 0.1) {
          piece.box.vx = 0;
          if (piece.box.vy == 0) {
            piece.grabbable = true;
          }
        }
        posChanged = true;
      }
      if (piece.box.vy != 0) {
        piece.box.y += (piece.box.vy * delta);
        if (piece.box.y > piece.box.originY) {
          if (piece.box.lastVY < -1.0) {
            piece.box.vy = (piece.box.lastVY * 0.7);
            piece.box.lastVY = piece.box.vy;
          }
          else {
            piece.box.vy = 0;
            if (piece.box.vx == 0) {
              piece.grabbable = true;
            }
          }
        }
        else {
          piece.box.vy += 0.3;
        }
        posChanged = true;
      }

      if (posChanged) {
        let sprite = sprites[piece.spriteNames[0] + ',' + piece.id];
        sprite.x = piece.box.x/3;
        sprite.y = piece.box.y/3;
      }

      let itemsGrabbed = map.detectItemCollision(map.piecePlayer.box);
      if (itemsGrabbed.length > 0) {
        let typeCount: { [typeName: string] : number } = {};
        itemsGrabbed.map((item) => {
          if (typeCount[item.typeName] == undefined) {
            typeCount[item.typeName] = 1;
          }
          else {
            typeCount[item.typeName]++;
          }
          delete map.piecesItem[item.typeName + ',' + item.id];
          pixiContainers.item.removeChild(sprites[item.spriteNames[0] + ',' + item.id]);
          delete sprites[item.spriteNames[0] + ',' + item.id];
        });
        Object.keys(typeCount).map((typeName) => {
          let count = typeCount[typeName];
          player.addToInventory(typeName, count);
          noteItemPickup(typeName, count);
        });
      }
    }
  });
}
