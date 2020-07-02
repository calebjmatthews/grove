import { player } from '../../instances/player';
import { itemTypes } from '../../instances/item_types';

class ItemNote {
  imageURL: string;
  itemName: string;
  quantity: number;
  delay: NodeJS.Timer;

  constructor(itemNote: ItemNote) {
    Object.assign(this, itemNote);
  }
}

let itemNotes: { [itemName: string] : ItemNote } = {};

export function createItemNoteContainer() {
  let foot = document.getElementById('foot');
  let div = document.createElement("DIV");
  div.setAttribute("class", "item-note-container");
  foot.appendChild(div);
}

export function noteItemPickup(itemName: string, quantity: number) {
  if (itemNotes[itemName] == undefined) {
    createItemNote(itemName, quantity);
  }
  else {
    addToItemNote(itemName, quantity);
  }
}

function createItemNote(itemName: string, quantity: number) {
  let newItemNote = new ItemNote({
    imageURL: itemTypes[itemName].menuSprite,
    itemName: itemName,
    quantity: quantity,
    delay: setTimeout(() => { fadeItemNote(itemName) }, 4000)
  });
  itemNotes[itemName] = newItemNote;

  let div = document.createElement("DIV");
  div.setAttribute("id", itemName);
  div.setAttribute("class", "item-note");
  let img = document.createElement("IMG");
  img.setAttribute("src", (newItemNote.imageURL));
  let spanName = document.createElement("SPAN");
  let spanNameText = document.createTextNode(itemName);
  spanName.appendChild(spanNameText);
  let spanQuantity = document.createElement("SPAN");
  spanQuantity.setAttribute("id", (itemName + '-quantity'));
  let spanQuantityText = document.createTextNode('x' + quantity.toString());
  spanQuantity.appendChild(spanQuantityText);
  div.appendChild(img);
  div.appendChild(spanName);
  div.appendChild(spanQuantity);
  div.addEventListener("click", () => {
    destroyItemNote(itemName)
  });
  let incEle = document.getElementsByClassName('item-note-container')[0];
  incEle.appendChild(div);
}

function addToItemNote(itemName: string, quantity: number) {
  let itemNote = itemNotes[itemName];
  itemNote.quantity += quantity;
  clearTimeout(itemNote.delay);
  itemNote.delay = setTimeout(() => { fadeItemNote(itemName) }, 4000);

  let itemNoteEle = document.getElementById(itemName);
  itemNoteEle.setAttribute("class", "item-note");

  let spanQuantity = document.getElementById(itemName + '-quantity');
  spanQuantity.remove();
  let newSpanQuantity = document.createElement("SPAN");
  newSpanQuantity.setAttribute("id", (itemName + '-quantity'));
  let spanQuantityText = document.createTextNode('x' + itemNote.quantity.toString());
  newSpanQuantity.appendChild(spanQuantityText);
  let div = document.getElementById(itemName);
  div.appendChild(newSpanQuantity);
}

function fadeItemNote(itemName: string) {
  let itemNote = itemNotes[itemName];
  clearTimeout(itemNote.delay);
  itemNote.delay = setTimeout(() => { destroyItemNote(itemName) }, 1000);

  let itemNoteEle = document.getElementById(itemName);
  itemNoteEle.setAttribute("class", ('item-note fading'));
}

function destroyItemNote(itemName: string) {
  let itemNoteEle = document.getElementById(itemName);
  itemNoteEle.remove();
  delete itemNotes[itemName];
}
