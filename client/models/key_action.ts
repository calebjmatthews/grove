export default class KeyAction {
  name: string;
  type: string;
  imgUrl: string;

  constructor(keyAction: KeyAction) {
    Object.assign(this, keyAction);
  }
}
