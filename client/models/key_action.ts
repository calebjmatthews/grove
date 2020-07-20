export default class KeyAction {
  name: string;
  type: string;

  constructor(keyAction: KeyAction) {
    Object.assign(this, keyAction);
  }
}
