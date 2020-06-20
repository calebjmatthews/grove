import * as PIXI from 'pixi.js';
import ParticleGroup from '../../../models/particle_group';
import { sprites } from '../../../instances/sprites';
import { pixiContainers } from '../../../instances/pixi_containers';
import { ParticleTypes } from '../../../enums/particle_types';
import { PieceTypeNames } from '../../../enums/piece_type_names';
import { TILE_SIZE } from '../../../constants';

var seed = 1337 ^ 0xDEADBEEF; // 32-bit seed with optional XOR value
// Pad seed with Phi, Pi and E.
// https://en.wikipedia.org/wiki/Nothing-up-my-sleeve_number
var rand = sfc32(0x9E3779B9, 0x243F6A88, 0xB7E15162, seed);

export function sparkleParticlesCreate(numParticles: number, xy: [number, number]) {
  let spriteFilenames = ['sparklepcl1.png', 'sparklepcl2.png', 'sparklepcl3.png'];

  let container = new PIXI.ParticleContainer(1000, { tint: true });
  let containerId = Math.floor(Math.random() * 10000000);
  let spriteNames: string[] = [];
  let spriteProps: { [spriteName: string] : any } = {};

  for (let index = 0; index < numParticles; index++) {
    let spriteId = Math.floor(Math.random() * 10000000);
    let spriteFilename = spriteFilenames
      [Math.floor((Math.random() * spriteFilenames.length))];
    let spriteName = (spriteFilename + ',' + spriteId);
    let vy = -(Math.random() * 1.5);
    let spriteProp: any = {
      x: -(TILE_SIZE / 3) + (rand() * (TILE_SIZE/2)),
      y: -(TILE_SIZE / 3) + (Math.random() * (TILE_SIZE/2)),
      vy: vy
    }
    let particleSprite = new PIXI.Sprite(PIXI.utils.TextureCache[spriteFilename]);
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
        sprites[spriteName].alpha = rand()
          * ((pg.maxAge - pg.age) / pg.maxAge);
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

function xmur3(str: string) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

function sfc32(a, b, c, d) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}
