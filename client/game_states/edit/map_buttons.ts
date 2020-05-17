import { map } from '../../instances/map';

export function createMapButtons() {
  let ele = document.getElementById('foot');
  let buttonContainer = document.createElement("DIV");
  buttonContainer.setAttribute("class", "button-container");

  let loadButton = document.createElement("DIV");
  loadButton.setAttribute("class", "button");
  loadButton.appendChild(document.createTextNode('Load'));
  loadButton.addEventListener("click", () => {
    console.log('map');
    console.log(map);
  });
  buttonContainer.appendChild(loadButton);

  let saveButton = document.createElement("DIV");
  saveButton.setAttribute("class", "button");
  saveButton.appendChild(document.createTextNode('Save'));
  saveButton.addEventListener("click", () => {
    console.log('save!');
  });
  buttonContainer.appendChild(saveButton);

  ele.appendChild(buttonContainer);
}
