import ItemType from '../../models/item_type';
import { player } from '../../instances/player';
import { itemTypes} from '../../instances/item_types';
import { pixiState } from '../../instances/pixi_state';
import play from '../play/play';

export function showEndResults() {
  createEndResultsContainer();
  let grandTotal = 0;
  Object.keys(player.inventory).map((typeName, index) => {
    createResultLine(itemTypes[typeName], player.inventory[typeName], index);
    grandTotal += (itemTypes[typeName].value * player.inventory[typeName]);
  });
  createGrandTotalLine(grandTotal);
  createOkButton();
}

function createEndResultsContainer() {
  let container = document.createElement("DIV");
  container.setAttribute("class", "end-results-container");
  let title = document.createElement("H2");
  let titleText = document.createTextNode('- Gathered -');
  title.appendChild(titleText);
  container.appendChild(title);
  let grid = document.createElement("DIV");
  grid.setAttribute("class", "end-results-grid");
  container.appendChild(grid);
  let footer = document.createElement("DIV");
  footer.setAttribute("class", "end-results-footer");
  container.appendChild(footer);
  let center = document.getElementById('center');
  center.appendChild(container);
}

function createResultLine(itemType: ItemType, quantity: number, row: number) {
  let grid = document.getElementsByClassName('end-results-grid')[0];

  let iconWrapper = document.createElement("DIV");
  iconWrapper.setAttribute("class", "grid-item");
  iconWrapper.setAttribute("style", ("grid-row: " + (row+1)));
  let icon = document.createElement("IMG");
  icon.setAttribute("src", (itemType.menuSprite));
  iconWrapper.appendChild(icon);
  grid.appendChild(iconWrapper);

  let nameEle = document.createElement("DIV");
  nameEle.setAttribute("class", "grid-item");
  nameEle.setAttribute("style", ("grid-row: " + (row+1)));
  let nameText = document.createTextNode(itemType.name);
  nameEle.appendChild(nameText);
  grid.appendChild(nameEle);

  let valueEle = document.createElement("DIV");
  valueEle.setAttribute("class", "grid-item");
  valueEle.setAttribute("style", ("grid-row: " + (row+1)));
  let valueText = document.createTextNode('$' + itemType.value);
  valueEle.appendChild(valueText);
  grid.appendChild(valueEle);

  let quantityEle = document.createElement("DIV");
  quantityEle.setAttribute("class", "grid-item");
  quantityEle.setAttribute("style", ("grid-row: " + (row+1)));
  let quantityText = document.createTextNode('x' + quantity);
  quantityEle.appendChild(quantityText);
  grid.appendChild(quantityEle);

  let totalEle = document.createElement("DIV");
  totalEle.setAttribute("class", "grid-item");
  totalEle.setAttribute("style", ("grid-row: " + (row+1)));
  let totalText = document.createTextNode('$' + (itemType.value * quantity));
  totalEle.appendChild(totalText);
  grid.appendChild(totalEle);
}

function createGrandTotalLine(grandTotal: number) {
  let gtEle = document.createElement("H3");
  let totalText = document.createTextNode('Total: $' + grandTotal);
  gtEle.appendChild(totalText);
  let footer = document.getElementsByClassName('end-results-footer')[0];
  footer.appendChild(gtEle);
}

function createOkButton() {
  let button = document.createElement("BUTTON");
  let buttonText = document.createTextNode('OK');
  button.appendChild(buttonText);
  button.setAttribute("class", "button");
  button.addEventListener("click", () => {
    returnToPlay();
  });
  let footer = document.getElementsByClassName('end-results-footer')[0];
  footer.appendChild(button);
}

function returnToPlay() {
  let center = document.getElementById('center');
  let container = document.getElementsByClassName('end-results-container')[0];
  center.removeChild(container);
  player.inventory = {};
  player.fullness = 100;
  pixiState.s = play;
}
