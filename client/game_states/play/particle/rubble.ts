import * as PIXI from 'pixi.js';
import ParticleGroup from '../../../models/particle_group';
import { sprites } from '../../../instances/sprites';
import { pixiContainers } from '../../../instances/pixi_containers';
import { ParticleTypes } from '../../../enums/particle_types';
import { PieceNames } from '../../../enums/piece_names';
import { TILE_SIZE } from '../../../constants';

export function rubbleParticlesCreate(numParticles: number, xy: [number, number]) {
  let spriteFilenames = ['forestpcl1.png', 'forestpcl2.png', 'forestpcl3.png'];

  let container = new PIXI.ParticleContainer();
  let containerId = Math.floor(Math.random() * 10000000);
  let spriteNames: string[] = [];
  let spriteProps: { [spriteName: string] : any } = {};

  for (let index = 0; index < numParticles; index++) {
    let spriteId = Math.floor(Math.random() * 10000000);
    let spriteFilename = spriteFilenames
      [Math.floor((Math.random() * spriteFilenames.length))];
    let spriteName = (spriteFilename + ',' + spriteId);
    let vx = (0.5 + (Math.random() * 4.5));
    if (Math.random() < 0.5) {vx = -vx};
    let vy = (0.5 + (Math.random() * 4.5));
    if (Math.random() < 0.5) {vy = -vy};
    let spriteProp: any = {
      x: -(TILE_SIZE / 4) + (Math.random() * (TILE_SIZE/2)),
      vx: vx,
      y: -(TILE_SIZE / 4) + (Math.random() * (TILE_SIZE/2)),
      vy: vy
    }
    let particleSprite = new PIXI.Sprite(sprites[spriteFilename].texture);
    particleSprite.width = 16;
    particleSprite.height = 16;
    container.addChild(particleSprite);
    spriteNames.push(spriteName);
    spriteProps[spriteName] = spriteProp;
    sprites[spriteName] = particleSprite;
  }

  pixiContainers[ParticleTypes.RUBBLE_WOOD + ',' + containerId] = container;
  pixiContainers[PieceNames.BACKGROUND].addChild(container);
  container.x = xy[0];
  container.y = xy[1];

  let particleGroup = new ParticleGroup({
    particleType: ParticleTypes.RUBBLE_WOOD,
    id: containerId,
    spriteNames: spriteNames,
    spriteProps: spriteProps,
    maxAge: 100,
    age: 0,
    animate: (pg: ParticleGroup, delta: number) => {
      pixiContainers[ParticleTypes.RUBBLE_WOOD + ',' + pg.id].alpha -= .01 * delta;
      pg.spriteNames.map((spriteName: string, index) => {
        sprites[spriteName].x += (pg.spriteProps[spriteName].vx * delta);
        pg.spriteProps[spriteName].vx *= 0.9;
        if (Math.abs(pg.spriteProps[spriteName].vx) < 0.1) {
          pg.spriteProps[spriteName].vx = 0;
        }
        sprites[spriteName].y += (pg.spriteProps[spriteName].vy * delta);
        pg.spriteProps[spriteName].vy *= 0.9;
        if (Math.abs(pg.spriteProps[spriteName].vy) < 0.1) {
          pg.spriteProps[spriteName].vy = 0;
        }
      });
    }
  });

  return particleGroup;
}
