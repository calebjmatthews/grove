import * as PIXI from 'pixi.js';

import Box from '../../models/box';
import { pixiApp } from '../../instances/pixi_app';
import { pixiLoader } from '../../instances/pixi_loader';
import { map } from '../../instances/map';
import { sprites } from '../../instances/sprites';
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
    pixiApp.stage.addChild(newSprite);
    sprites[name] = newSprite;
  })
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

export function displaySprites() {
  map.piecePlayer.spriteNames.map((spriteName, index) => {
    displaySprite(spriteName, map.piecePlayer.box, index);
  });
  Object.keys(map.piecesAnimated).map((pieceName) => {
    let piece = map.piecesAnimated[pieceName];
    let box = piece.box;
    if (piece.spriteNames.length == 1) {
      displaySprite(piece.spriteNames[0], box, 0);
    }
    else if (piece.spriteNames.length > 1) {
      piece.spriteNames.map((spriteName, index) => {
        displaySprite((spriteName + ',' + piece.id), box, index);
      });
      piece.setRandomAge();
    }
  })

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
