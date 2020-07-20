import KeyAction from '../../models/key_action';
import { TOOLBAR_KEYS } from '../../constants';

export let keyNameSel = '1';
export function keySelect(newKeyName: string) {
  if (keyNameSel) {
    let oldEle = document.getElementById(keyNameSel);
    oldEle.setAttribute("class", "toolbar-item");
  }
  keyNameSel = newKeyName;
  let newEle = document.getElementById(keyNameSel);
  newEle.setAttribute("class", "toolbar-item selected");
}

export let keyActionMap: {[keyName : string]: KeyAction} = {};
export function setKeyAction(keyName: string, newKeyAction: KeyAction) {
  if (newKeyAction) {
    let oldEle = document.getElementById(keyName);
  }
  keyActionMap[keyName] = newKeyAction;
}
