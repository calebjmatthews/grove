import { pieceTypes } from '../../instances/piece_types';
import { setPieceTypeSelect } from './piece_type_select';

export function createPalatte() {
  let ele = document.getElementById('foot');
  let palette = document.createElement("DIV");
  palette.setAttribute("class", "toolbar");

  let div = document.createElement("DIV");
  div.setAttribute("id", 'Delete');
  div.setAttribute("class", "toolbar-item");
  let img = document.createElement("IMG");
  div.appendChild(document.createTextNode('DEL'));
  div.addEventListener("click", () => {
    setPieceTypeSelect('Delete');
  });
  palette.appendChild(div);

  Object.keys(pieceTypes).map((pieceTypeName) => {
    let pieceType = pieceTypes[pieceTypeName];
    let div = document.createElement("DIV");
    div.setAttribute("id", pieceType.name);
    div.setAttribute("class", "toolbar-item");
    let img = document.createElement("IMG");
    img.setAttribute("src", ("dist/working/forest/" + pieceType.spriteNames[0]));
    // let textNode = document.createTextNode(pieceType.name);
    div.appendChild(img);
    div.addEventListener("click", () => {
      setPieceTypeSelect(pieceType.name);
    });
    palette.appendChild(div);
  });
  ele.appendChild(palette);
}
