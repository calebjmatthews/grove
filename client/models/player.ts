export default class Player implements PlayerInterface {
  fullness: number;
  inventory: { [itemName: string] : number };

  addToInventory(itemName: string, quantity: number) {
    if (this.inventory[itemName] == undefined) {
      this.inventory[itemName] = 0;
    }
    this.inventory[itemName] += quantity;
  }

  removeFromInventory(itemName: string, quantity: number): boolean {
    if (this.inventory[itemName]) {
      if (this.inventory[itemName] >= quantity) {
        this.inventory[itemName] -= quantity;
        if (this.inventory[itemName] == 0) {
          delete this.inventory[itemName];
        }
        return true;
      }
    }
    return false;
  }

  constructor(player: PlayerInterface = null) {
    if (player != null) {
      Object.assign(this, player);
    }
    else {
      this.fullness = 100;
      this.inventory = {};
    }
  }
}

interface PlayerInterface {
  inventory: { [itemName: string] : number };
}
