import Piece from '../../models/piece';
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
      resolveVelocity(piece, delta);
    }
  });

  let idsGrabbed: number[] = grabItems();

  gravitateItems(idsGrabbed);
}

function resolveVelocity(piece: Piece, delta: number) {
  let posChanged = false;
  if (Math.abs(piece.box.vx) > 0) {
    piece.box.x += (piece.box.vx * delta);
    piece.box.vx *= 0.9;
    if (Math.abs(piece.box.vx) < 0.1) {
      piece.box.vx = 0;
      if (piece.box.vy == 0) {
        piece.grabbable = true;
        piece.gridPos = map.getGridUpperLeftPos([piece.box.x, piece.box.y]);
        map.itemMap[piece.gridPos[0] + ',' + piece.gridPos[1]] = {
          mapName: 'piecesItem', pieceName: (piece.typeName + ',' + piece.id) };
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
          piece.gridPos = map.getGridUpperLeftPos([piece.box.x, piece.box.y]);
          map.itemMap[piece.gridPos[0] + ',' + piece.gridPos[1]] = {
            mapName: 'piecesItem', pieceName: (piece.typeName + ',' + piece.id) };
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
}

function grabItems() {
  let idsGrabbed: number[] = [];
  let itemsGrabbed = map.detectItemCollision(map.piecePlayer.box);
  if (itemsGrabbed.length > 0) {
    let typeCount: { [typeName: string] : number } = {};
    itemsGrabbed.map((item) => {
      idsGrabbed.push(item.id);
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
  return idsGrabbed;
}

function gravitateItems(idsGrabbed: number[]) {
  if (Object.keys(map.piecesItem).length > 0) {
    let gridPos = map.getGridPos([map.piecePlayer.box.x, map.piecePlayer.box.y]);
    let neighborItems = map.getNeighbors(gridPos, 2, 'item');
    neighborItems.map((item: Piece) => {
      if (!idsGrabbed.includes(item.id)) {
        let diffs = map.piecePlayer.box.distanceBetweenCenters(item.box);
        let totalDiff = Math.abs(diffs[0]) + Math.abs(diffs[1]);
        let vx = (50 / totalDiff) * (diffs[0]  / totalDiff);
        if (Math.abs(vx) > Math.abs(diffs[0])) {
          vx = diffs[0];
        }
        let vy = (50 / totalDiff) * (diffs[1]  / totalDiff);
        if (Math.abs(vy) > Math.abs(diffs[1])) {
          vy = diffs[1];
        }
        item.box.x += vx;
        item.box.y += vy;
        item.gridPos = map.getGridUpperLeftPos([item.box.x, item.box.y]);
        map.itemMap[item.gridPos[0] + ',' + item.gridPos[1]] = {
          mapName: 'piecesItem', pieceName: (item.typeName + ',' + item.id) };
        sprites[item.spriteNames[0] + ',' + item.id].x = (item.box.x / 3);
        sprites[item.spriteNames[0] + ',' + item.id].y = (item.box.y / 3);
      }
    });
  }
}
