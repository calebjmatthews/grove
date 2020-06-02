import { map } from '../../instances/map';
import { pieceTypes } from '../../instances/piece_types';
import { pixiState } from '../../instances/pixi_state';
import { pixiContainers } from '../../instances/pixi_containers';
import { sprites } from '../../instances/sprites';
import play from '../play/play';

let scenes = [
  require("../../editing/scene1.json"),
  require("../../editing/scene2.json")
];

export function createSceneButtons() {
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
      map.showViewportTiles(sprites);
      pixiState.s = play;
    });
    buttonContainer.appendChild(loadButton);
  });

  ele.appendChild(buttonContainer);
}
