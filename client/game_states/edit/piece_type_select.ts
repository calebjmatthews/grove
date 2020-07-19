export let pieceTypeNameSel = null;

export function setPieceTypeSelect(newPieceTypeName: string) {
  if (pieceTypeNameSel) {
    let oldEle = document.getElementById(pieceTypeNameSel);
    oldEle.setAttribute("class", "toolbar-item");
  }
  pieceTypeNameSel = newPieceTypeName;
  let newEle = document.getElementById(pieceTypeNameSel);
  newEle.setAttribute("class", "toolbar-item selected");
}
