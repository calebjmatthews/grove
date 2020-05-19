import { map } from '../../instances/map';
import { pieceTypes } from '../../instances/piece_types';

const sceneNames = ["../../editing/scene1.json"];
let scenes = {};
import("../../editing/scene1.json").then((json) => {
  scenes["../../editing/scene1.json"] = json;
});;

export function createMapButtons() {
  let ele = document.getElementById('foot');
  let buttonContainer = document.createElement("DIV");
  buttonContainer.setAttribute("class", "button-container");

  sceneNames.map((sceneName) => {
    let loadButton = document.createElement("DIV");
    loadButton.setAttribute("id", sceneName);
    loadButton.setAttribute("class", "button");
    loadButton.appendChild(document.createTextNode('Load ' + sceneName));
    loadButton.addEventListener("click", () => {
      console.log('scenes');
      console.log(scenes);
      console.log('sceneName');
      console.log(sceneName);
    });
    buttonContainer.appendChild(loadButton);
  })

  let saveButton = document.createElement("DIV");
  saveButton.setAttribute("id", "save_button");
  saveButton.setAttribute("class", "button");
  saveButton.appendChild(document.createTextNode('Save'));
  saveButton.addEventListener("click", () => {
    let expObj = {
      "pieceMap": map.pieceMap
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
