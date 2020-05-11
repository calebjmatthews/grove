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
  let bgContainer = new PIXI.Container();
  pixiApp.stage.addChild(bgContainer);
  bgContainer.width = window.innerWidth * 2;
  bgContainer.height = window.innerHeight * 2;
  bgContainer.x = -(window.innerWidth/2);
  bgContainer.y = -(window.innerHeight/2);
  Object.keys(map.pieces).map((pieceName) => {
    let piece = map.pieces[pieceName];
    let sprite = sprites[piece.spriteNames[0]];
    if (sprite) {
      let newSprite = new PIXI.Sprite(sprite.texture);
      pixiApp.stage.addChild(newSprite);
      newSprite.visible = false;
      sprites[piece.spriteNames[0] + ',' + piece.id] = newSprite;
      bgContainer.addChild(newSprite);
    }
  });
  pixiContainers[PieceNames.BACKGROUND] = bgContainer;
}

export function displaySprites() {
  let pContainer = pixiContainers[PieceNames.PLAYER];
  pContainer.x = map.piecePlayer.box.x;
  pContainer.y = map.piecePlayer.box.y;
  pContainer.width = map.piecePlayer.box.width;
  pContainer.height = map.piecePlayer.box.height;
  map.piecePlayer.spriteNames.map((spriteName, index) => {
    let dSprite = sprites[spriteName];
    dSprite.width = map.piecePlayer.box.width;
    dSprite.height = map.piecePlayer.box.height;
    if (index == 0) {
      dSprite.visible = true;
    }
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
}
