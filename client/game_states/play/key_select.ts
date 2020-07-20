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
  let gooetkRes: { keyName: string, type: string } = null;
  if (keyName == null) {
    gooetkRes = getOpenOrExistingToolbarKey(newKeyAction);
    if (gooetkRes.type == 'open') {
      keyName = gooetkRes.keyName;
    }
  }
  if (keyName != null) {
    let ele = document.getElementById(keyName);
    let oldImg = document.getElementById(keyName + '-img');
    if (oldImg) {
      ele.removeChild(oldImg);
    }
    if (newKeyAction) {
      let newImg = document.createElement("IMG");
      newImg.setAttribute('src', newKeyAction.imgUrl);
      ele.appendChild(newImg);
    }
    keyActionMap[keyName] = newKeyAction;
  }
}

function getOpenOrExistingToolbarKey(newKeyAction: KeyAction):
  { keyName: string, type: string } {
  for (let index = 0; index < TOOLBAR_KEYS.length; index++) {
    let keyName = TOOLBAR_KEYS[index];
    if (keyActionMap[keyName] != undefined) {
      if (keyActionMap[keyName].name == newKeyAction.name) {
        return { keyName: keyName, type: 'existing' };
      }
    }
  }

  for (let index = 0; index < TOOLBAR_KEYS.length; index++) {
    let keyName = TOOLBAR_KEYS[index];
    if (keyActionMap[keyName] == undefined) {
      return { keyName: keyName, type: 'open' };
    }
  }

  return null;
}
