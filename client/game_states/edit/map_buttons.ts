import { map } from '../../instances/map';
import { pieceTypes } from '../../instances/piece_types';
import { pixiContainers } from '../../instances/pixi_containers';
import { sprites } from '../../instances/sprites';

let scenes = [
  require("../../editing/scene1.json"),
  require("../../editing/scene2.json")
];

export function createMapButtons() {
  let ele = document.getElementById('foot');
  let buttonContainer = document.createElement("DIV");
  buttonContainer.setAttribute("class", "button-container");

  scenes.map((scene, index) => {
    let loadButton = document.createElement("DIV");
    loadButton.setAttribute("id", "scene" + (index+1));
    loadButton.setAttribute("class", "button");
    loadButton.appendChild(document.createTextNode('Load scene ' + (index+1)));
    loadButton.addEventListener("click", () => {
      map.destroyAllPieces(pixiContainers, sprites);
      Object.keys(scene.pieceMap).map((coord) => {
        let mapObj = scene.pieceMap[coord];
        let nameSplit = mapObj.pieceName.split(',');
        map.createAndDisplayPiece(nameSplit[0], coord, nameSplit[1], pieceTypes,
          pixiContainers, sprites);
      });
      Object.keys(scene.cropMap).map((coord) => {
        let mapObj = scene.cropMap[coord];
        let nameSplit = mapObj.pieceName.split(',');
        map.createAndDisplayPiece(nameSplit[0], coord, nameSplit[1], pieceTypes,
          pixiContainers, sprites);
      });
    });
    buttonContainer.appendChild(loadButton);
  })

  let saveButton = document.createElement("DIV");
  saveButton.setAttribute("id", "save_button");
  saveButton.setAttribute("class", "button");
  saveButton.appendChild(document.createTextNode('Save'));
  saveButton.addEventListener("click", () => {
    let expObj = {
      "gridWidth": map.gridWidth,
      "gridHeight": map.gridHeight,
      "pieceMap": map.pieceMap,
      "cropMap": map.cropMap
    };
    let aEle = document.createElement("a");
    let file = new Blob([JSON.stringify(expObj)], {type : 'application/json'});
    aEle.href = URL.createObjectURL(file);
    aEle.download = 'scene.json';
    aEle.click();
    URL.revokeObjectURL(aEle.href);
  });
  buttonContainer.appendChild(saveButton);

  ele.appendChild(buttonContainer);
}
