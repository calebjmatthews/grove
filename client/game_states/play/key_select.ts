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
