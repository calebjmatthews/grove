import ParticleGroup from '../../../models/particle_group';
import { rubbleParticlesCreate } from './rubble';
import { sparkleParticlesCreate } from './sparkle';
import { ParticleTypes } from '../../../enums/particle_types';

export function particlesCreate(particleType: string, numParticles: number,
  xy: [number, number], spread: number = 1, direction: string = 'up'): ParticleGroup {
  switch (particleType){
    case (ParticleTypes.RUBBLE_WOOD):
    return rubbleParticlesCreate(numParticles, xy);
    break;

    case (ParticleTypes.SPARKLE):
    return sparkleParticlesCreate(numParticles, xy, spread, direction);
    break;
  }
}
