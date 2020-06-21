import * as PIXI from 'pixi.js';
import ParticleGroup from '../../../models/particle_group';
import { sprites } from '../../../instances/sprites';
import { pixiContainers } from '../../../instances/pixi_containers';
import { ParticleTypes } from '../../../enums/particle_types';
import { PieceTypeNames } from '../../../enums/piece_type_names';
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
    let x = -(TILE_SIZE / 3) + (Math.random() * (TILE_SIZE/2));
    let vx = (0.5 + (Math.random() * 1.5));
    if (Math.random() < 0.5) {vx = -vx};
    let y = -(TILE_SIZE / 3) + (Math.random() * (TILE_SIZE/2));
    let vy = -(0.5 + (Math.random() * 1.5));
    let spriteProp: any = {
      x: x,
      vx: vx,
      y: y,
      originY: y,
      vy: vy,
      lastVY: vy
    }
    let particleSprite = new PIXI.Sprite(PIXI.utils.TextureCache[spriteFilename]);
    particleSprite.x = spriteProp.x;
    particleSprite.y = spriteProp.y;
    container.addChild(particleSprite);
    spriteNames.push(spriteName);
    spriteProps[spriteName] = spriteProp;
    sprites[spriteName] = particleSprite;
  }

  pixiContainers[ParticleTypes.RUBBLE_WOOD + ',' + containerId] = container;
  pixiContainers.main.addChild(container);
  container.x = xy[0]/3;
  container.y = xy[1]/3;

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
        pg.spriteProps[spriteName].x += (pg.spriteProps[spriteName].vx * delta);
        sprites[spriteName].x = pg.spriteProps[spriteName].x;
        pg.spriteProps[spriteName].vx *= 0.9;
        if (Math.abs(pg.spriteProps[spriteName].vx) < 0.1) {
          pg.spriteProps[spriteName].vx = 0;
        }
        pg.spriteProps[spriteName].y += (pg.spriteProps[spriteName].vy * delta);
        sprites[spriteName].y = pg.spriteProps[spriteName].y;

        if (pg.spriteProps[spriteName].y > pg.spriteProps[spriteName].originY) {
          pg.spriteProps[spriteName].vy = (pg.spriteProps[spriteName].lastVY * 0.8);
          pg.spriteProps[spriteName].lastVY = pg.spriteProps[spriteName].vy;
        }
        else {
          pg.spriteProps[spriteName].vy += 0.1;
        }
      });
    }
  });

  return particleGroup;
}
