import Offset from '../../models/offset';
import { map } from '../../instances/map';
import { pieceTypes } from '../../instances/piece_types';
import { pixiState } from '../../instances/pixi_state';
import { pixiContainers } from '../../instances/pixi_containers';
import { sprites } from '../../instances/sprites';
import play from '../play/play';
import { TILE_SIZE } from '../../constants';

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
      map.gridWidth = scene.gridWidth;
      map.gridHeight = scene.gridHeight;
      map.offset = new Offset({ x: 0, vx: 0, y: 0, vy: 0 });
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
      map.createPieceMap();
      map.piecePlayer.box.x = (map.gridWidth * TILE_SIZE)/2;
      map.piecePlayer.box.y = (map.gridHeight * TILE_SIZE)/2;
      pixiState.s = play;
    });
    buttonContainer.appendChild(loadButton);
  });

  ele.appendChild(buttonContainer);
}
