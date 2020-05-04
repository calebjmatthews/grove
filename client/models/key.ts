export default class Key {
  name: string;
  isDown: boolean;
  isUp: boolean;
  press: () => void;
  release: () => void;
  downHandler: (ev: any) => void;
  upHandler: (ev: any) => void;
  unsubscribe: () => void;

  constructor(name: string) {
    this.name = name;
    this.isDown = false;
    this.isUp = true;
    this.press = undefined;
    this.release = undefined;

    this.downHandler = event => {
      if (event.key === this.name) {
        if (this.isUp && this.press) this.press();
        this.isDown = true;
        this.isUp = false;
        event.preventDefault();
      }
    };

    this.upHandler = event => {
      if (event.key === this.name) {
        if (this.isDown && this.release) this.release();
        this.isDown = false;
        this.isUp = true;
        event.preventDefault();
      }
    };

    const downListener = this.downHandler.bind(this);
    const upListener = this.upHandler.bind(this);

    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );

    // Detach event listeners
    this.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };

    return this;
  }
}
