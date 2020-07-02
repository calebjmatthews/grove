import * as PIXI from 'pixi.js';
import ParticleGroup from '../../../models/particle_group';
import { sprites } from '../../../instances/sprites';
import { pixiContainers } from '../../../instances/pixi_containers';
import { utils } from '../../../instances/utils';
import { ParticleTypes } from '../../../enums/particle_types';
import { PieceTypeNames } from '../../../enums/piece_type_names';
import { TILE_SIZE } from '../../../constants';

export function sparkleParticlesCreate(numParticles: number, xy: [number, number],
  spread: number = 1, direction: string = 'up') {
  let spriteFilenames = ['sparklepcl1.png', 'sparklepcl2.png', 'sparklepcl3.png'];

  let container = new PIXI.ParticleContainer(1000, { tint: true });
  let containerId = Math.floor(utils.rand() * 10000000);
  let spriteNames: string[] = [];
  let spriteProps: { [spriteName: string] : any } = {};

  for (let index = 0; index < numParticles; index++) {
    let spriteId = Math.floor(utils.rand() * 10000000);
    let spriteFilename = spriteFilenames
      [Math.floor((utils.rand() * spriteFilenames.length))];
    let spriteName = (spriteFilename + ',' + spriteId);
    let vy = -(utils.rand() * 1.5);
    if (direction == 'down') {
      vy = -vy
    }
    let spriteProp: any = {
      x: -((TILE_SIZE / 3) * spread) + (utils.rand() * (TILE_SIZE/2) * spread),
      y: -((TILE_SIZE / 3) * spread) + (utils.rand() * (TILE_SIZE/2) * spread),
      vy: vy
    }
    let particleSprite = new PIXI.Sprite(PIXI.utils.TextureCache[spriteFilename]);
    particleSprite.x = spriteProp.x;
    particleSprite.y = spriteProp.y;
    container.addChild(particleSprite);
    spriteNames.push(spriteName);
    spriteProps[spriteName] = spriteProp;
    sprites[spriteName] = particleSprite;
  }

  pixiContainers[ParticleTypes.SPARKLE + ',' + containerId] = container;
  pixiContainers.main.addChild(container);
  container.x = xy[0]/3;
  container.y = xy[1]/3;

  let particleGroup = new ParticleGroup({
    particleType: ParticleTypes.SPARKLE,
    id: containerId,
    spriteNames: spriteNames,
    spriteProps: spriteProps,
    maxAge: 100,
    age: 0,
    animate: (pg: ParticleGroup, delta: number) => {
      pg.spriteNames.map((spriteName: string, index) => {
        sprites[spriteName].alpha *= (1 - (0.2 * utils.rand()));
        if (sprites[spriteName].alpha <= 0.05) {
          sprites[spriteName].alpha = ((pg.maxAge - pg.age) / pg.maxAge);
        }
        sprites[spriteName].x = pg.spriteProps[spriteName].x;
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
