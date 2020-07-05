export default class Breakable {
  durability: number;
  particleType: string;
  drops: {[ itemName: string] : [number, number]};

  constructor(breakable: Breakable) {
    Object.assign(this, breakable);
  }
}
