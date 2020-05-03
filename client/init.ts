import * as PIXI from 'pixi.js';

export default function init() {
  let type = "WebGL"
  if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
  }

  PIXI.utils.sayHello(type)
}
