import Map from './map';

export default class PlayEvent {
  resolve: (map: Map) => Map;
  delay: number;

  constructor(resolve: (map: Map) => Map, delay: number) {
    this.resolve = resolve;
    this.delay = delay;
  }
}
