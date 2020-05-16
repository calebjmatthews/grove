import { pieceTypes } from '../../instances/piece_types';
import { setPieceTypeSelect } from './piece_type_select';

export function createPalatte() {
  let ele = document.getElementById('foot');
  Object.keys(pieceTypes).map((pieceTypeName) => {
    let pieceType = pieceTypes[pieceTypeName];
    let div = document.createElement("DIV");
    div.setAttribute("id", pieceType.name);
    div.setAttribute("class", "palette-item");
    let textNode = document.createTextNode(pieceType.name);
    div.appendChild(textNode);
    div.addEventListener("click", () => {
      setPieceTypeSelect(pieceType.name);
    });
    ele.appendChild(div);
  })
}
