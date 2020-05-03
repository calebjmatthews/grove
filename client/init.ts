import * as PIXI from 'pixi.js';

const jplayer1 = require('./assets/jplayer1.png');

let loader: PIXI.Loader;
let app: PIXI.Application;

export default function init() {
  let type = "WebGL";
  if (!PIXI.utils.isWebGLSupported()){
    type = "canvas";
  }
  PIXI.utils.sayHello(type);

  app = new PIXI.Application({
    antialias: true,
    transparent: false,
    resolution: 1
  });
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.resize(window.innerWidth, window.innerHeight);
  document.body.appendChild(app.view);
  loadTextures();
}

function loadTextures() {
  loader = new PIXI.Loader();
  loader.add(jplayer1.default)
  .load(createSprites);
}

function createSprites() {
  let player = new PIXI.Sprite(loader.resources[jplayer1.default].texture);

  //Add the cat to the stage
  app.stage.addChild(player);
  player.scale.x = 4;
  player.scale.y = 4;
}
