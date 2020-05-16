import Key from '../../models/key';
import { map } from '../../instances/map';
import { Directions } from '../../enums/directions';

export function createKeyboardEdit() {
  let a = new Key("a");
  a.press = () => {
    map.offset.vx = 5;
  };
  a.release = () => {
    if (!d.isDown) {
      map.offset.vx = 0;
    }
  };

  let w = new Key("w");
  w.press = () => {
    map.offset.vy = 5;
  };
  w.release = () => {
    if (!s.isDown) {
      map.offset.vy = 0;
    }
  };

  let d = new Key("d");
  d.press = () => {
    map.offset.vx = -5;
  };
  d.release = () => {
    if (!a.isDown) {
      map.offset.vx = 0;
    }
  };

  let s = new Key("s");
  s.press = () => {
    map.offset.vy = -5;
  };
  s.release = () => {
    if (!w.isDown) {
      map.offset.vy = 0;
    }
  };
}
