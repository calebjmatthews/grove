import { keySelect } from './key_select';
import { TOOLBAR_KEYS } from '../../constants';

export function createToolbar() {
  let toolbar = document.createElement("DIV");
  toolbar.setAttribute("class", "toolbar keyboard");
  let keys =
  TOOLBAR_KEYS.map((key) => {
    let div = document.createElement("DIV");
    div.setAttribute("id", key);
    div.setAttribute("class", "toolbar-item");
    if (key == '1') {
      div.setAttribute("class", "toolbar-item selected");
    }
    div.addEventListener("click", () => {
      keySelect(key);
    });
    div.appendChild(document.createTextNode(key));
    toolbar.appendChild(div);
  });
  let ele = document.getElementById('foot');
  ele.appendChild(toolbar);
}
