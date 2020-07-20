export default class KeyAction {
  name: string;
  type: string;
  imgUrl: string;
  quantity: number;

  constructor(keyAction: KeyAction) {
    Object.assign(this, keyAction);
  }
}
