import init from './init';
import initGameLoop from './game_loop';

init()
.then(() => {
  initGameLoop();
});
