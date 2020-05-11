import * as PIXI from 'pixi.js';

import Box from '../../models/box';
import { pixiApp } from '../../instances/pixi_app';
import { pixiLoader } from '../../instances/pixi_loader';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
import { pixiContainers } from '../../instances/pixi_containers';
import { PieceNames } from '../../enums/piece_names';

export function createSpritesFromTilesheet(sheetPng: any, sheetJson: any) {
  Object.keys(sheetJson.frames).map((name) => {
    let frame: {h: number, w: number, x: number, y:number} =
      sheetJson.frames[name].frame;
    let rectange = new PIXI.Rectangle(frame.x, frame.y, frame.w, frame.h);
    let resource = pixiLoader.resources[sheetPng.default];
    let texture = new PIXI.Texture(resource.texture.baseTexture, rectange);
    let newSprite = new PIXI.Sprite(texture);
    newSprite.visible = false;
    sprites[name] = newSprite;
  })
}

export function createPlayerSprites() {
  let playerContainer = new PIXI.Container();
  pixiApp.stage.addChild(playerContainer);
  map.piecePlayer.spriteNames.map((spriteName) => {
    let sprite = sprites[spriteName];
    sprite.visible = false;
    playerContainer.addChild(sprite);
  });
  pixiContainers[PieceNames.PLAYER] = playerContainer;
}

export function createBushSprites() {
  Object.keys(map.piecesAnimated).map((pieceName) => {
    let piece = map.piecesAnimated[pieceName];
    if (piece.name == PieceNames.BUSH) {
      piece.spriteNames.map((spriteName) => {
        let sprite = sprites[spriteName];
        if (sprite) {
          let newSprite = new PIXI.Sprite(sprite.texture);
          pixiApp.stage.addChild(newSprite);
          newSprite.visible = false;
          sprites[spriteName + ',' + piece.id] = newSprite;
        }
      });
      piece.setRandomAge();
    }
  });
}

export function createBGSprites() {
  Object.keys(map.pieces).map((pieceName) => {
    let piece = map.pieces[pieceName];
    let sprite = sprites[piece.spriteNames[0]];
    if (sprite) {
      let newSprite = new PIXI.Sprite(sprite.texture);
      pixiApp.stage.addChild(newSprite);
      newSprite.visible = false;
      sprites[piece.spriteNames[0] + ',' + piece.id] = newSprite;
    }
  });
}

export function displaySprites() {
  displayContainer(PieceNames.PLAYER, map.piecePlayer.box);
  map.piecePlayer.spriteNames.map((spriteName, index) => {
    displaySpriteInContainer(spriteName, map.piecePlayer.box, index);
  });
  Object.keys(map.piecesAnimated).map((pieceName) => {
    let piece = map.piecesAnimated[pieceName];
    let box = piece.box;
    piece.spriteNames.map((spriteName, index) => {
      displaySprite((spriteName + ',' + piece.id), box, index);
    });
    piece.setRandomAge();
  });
  Object.keys(map.pieces).map((pieceName) => {
    let piece = map.pieces[pieceName];
    let box = piece.box;
    displaySprite((piece.spriteNames[0] + ',' + piece.id), box, 0);
  });

  function displaySprite(spriteName: string, box: Box, index: number) {
    let dSprite = sprites[spriteName];
    dSprite.x = box.x;
    dSprite.y = box.y;
    dSprite.width = box.width;
    dSprite.height = box.height;
    if (index == 0) {
      dSprite.visible = true;
    }
  }

  function displayContainer(containerName: string, box: Box) {
    let tContainer = pixiContainers[containerName];
    tContainer.x = box.x;
    tContainer.y = box.y;
    tContainer.width = box.width;
    tContainer.height = box.height;
  }

  function displaySpriteInContainer(spriteName: string, box: Box, index: number) {
    let dSprite = sprites[spriteName];
    dSprite.width = box.width;
    dSprite.height = box.height;
    if (index == 0) {
      dSprite.visible = true;
    }
  }
}
