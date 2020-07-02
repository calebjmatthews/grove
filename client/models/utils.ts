export default class Utils {
  seed: number;
  rand: Function;

  constructor() {
    this.seed = 2330 ^ 0xDEADBEEF; // 32-bit seed with optional XOR value
    // Pad seed with Phi, Pi and E.
    // https://en.wikipedia.org/wiki/Nothing-up-my-sleeve_number
    this.rand = this.sfc32(0x9E3779B9, 0x243F6A88, 0xB7E15162, this.seed);
  }

  // Returns an array of numbers like range(3, 2) -> [2, 3, 4]
  range(size: number, startAt: number = 0) {
    return [...Array(size).keys()].map((integer) => integer + startAt);
  }

  // Returns an array with its members randomly reordered
  shuffle(array: any[]) {
    let currentIndex: number = array.length;
    let temporaryValue: any;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(this.rand() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // Returns a maximum of two units of time, e.g. '1d 4h ' or '3m 45s ', with
  //  seconds being the smallest unit
  formatDuration(milliseconds: number, units: number = 0, long: boolean = false):
    string {
    if (units < 2) {
      if (milliseconds > (1000 * 60 * 60 * 24)) {
        let days: number = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
        units++;
        return ((days + (long ? ' days ' : 'd ') +
          this.formatDuration(milliseconds % (1000 * 60 * 60 * 24), units, long)));
      }
      if (milliseconds > (1000 * 60 * 60)) {
        let days: number  = Math.floor(milliseconds / (1000 * 60 * 60));
        units++;
        return ((days + (long ? ' hours ' : 'h ') +
          this.formatDuration(milliseconds % (1000 * 60 * 60), units, long)));
      }
      if (milliseconds > (1000 * 60)) {
        let days: number  = Math.floor(milliseconds / (1000 * 60));
        units++;
        return ((days + (long ? ' minutes ' : 'm ') +
          this.formatDuration(milliseconds % (1000 * 60), units, long)));
      }
      else if (milliseconds > (1000)) {
        let days: number  = Math.floor(milliseconds / (1000));
        units++;
        return ((days + (long ? ' seconds ' : 's ') +
          this.formatDuration(milliseconds % (1000), units, long)));
      }
      if (units == 0) {
        return (long ? '0 seconds ' : '0s ');
      }
    }
    return '';
  }

  // Returns an object with the same properties, as long as none of the properties
  //  are themselves an object
  shallowClone(anObj: any): any {
    let newObj: any = {};
    Object.keys(anObj).map((prop) => {
      if (!Array.isArray(anObj[prop])) {
        newObj[prop] = anObj[prop];
      }
      else {
        newObj[prop] = anObj[prop].slice();
      }
    });
    return newObj;
  }

  formatMoney(dollars: number, long: boolean = false): string {
    let sign = '';
    if (dollars < 0) { sign = '-'; }
    dollars = Math.abs(dollars);
    if (dollars < 100) {
      return (sign + '$' + dollars.toFixed(2));
    }
    if (long) {
      return (sign + '$' + this.formatNumberLong(dollars));
    }
    return (sign + '$' + this.formatNumberShort(dollars));
  }

  // 1234567890 -> 1,234,567,890
  formatNumberLong(number: number): string {
    let strNumber = Math.round(number).toString();
    let commaNumber = '';
    let digitCount = 0;
    for (let iii = (strNumber.length-1); iii >= 0; iii--) {
      digitCount++;
      if (digitCount % 3 == 0) {
        commaNumber = (',' + strNumber[iii] + commaNumber);
      }
      else {
        commaNumber = (strNumber[iii] + commaNumber);
      }
    }
    if (commaNumber.slice(0, 1) == ',') {
      return commaNumber.slice(1);
    }
    return commaNumber;
  }

  // 1234567890 -> 1.23B
  formatNumberShort(number: number): string {
    const exponents = {
      3: 'K',
      6: 'M',
      9: 'B',
      12: 'T',
      15: 'Qa',
      18: 'Qi',
      21: 'Sx',
      23: 'Sp',
      25: 'Oc',
      28: 'No',
      30: 'De'
    };
    if (number < 1000) {
      return Math.round(number).toString();
    }
    let powers = Object.keys(exponents);
    let strNumber = '';
    for (let iii = 0; iii < (powers.length-2); iii++) {
      let power = parseInt(powers[iii]);
      if (number >= Math.pow(10, power)) {
        strNumber = (number / Math.pow(10, power)).toFixed(2) + exponents[power];
      }
    }
    return strNumber;
  }

  numberToRoman(num: number): string {
    let roman = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
    let str = '';

    for (var i of Object.keys(roman)) {
      var q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      str += i.repeat(q);
    }

    return str;
  }

  romanToNumber (romanNumeral: string): number {
    var DIGIT_VALUES = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000
    };

    let result = 0;
    let input = romanNumeral.split('');

    for (var i = 0; i < input.length; i++) {
      var currentLetter = DIGIT_VALUES[input[i]];
      var nextLetter = DIGIT_VALUES[input[i + 1]];
      if (currentLetter === undefined) {
        return null;
      }
      else {
        if (currentLetter < nextLetter) {
          result += nextLetter - currentLetter;
          i++;
        } else {
          result += currentLetter;
        }
      }
    };

    return result;
  }

  parseDeepValue(object: any, propsSought: any[]) {
    let objectLayer = object[propsSought[0]];
    propsSought.slice(1).map((propSought) => {
      if (propSought.includes('(')) {
        let functionName = propSought.split('(')[0];
        let paramSplit = propSought.split('(')[1].replace(')', '');
        let params = paramSplit.split(',');
        objectLayer[functionName] = objectLayer[functionName].bind(objectLayer);
        if (params[0].length > 0) {
          objectLayer = objectLayer[functionName].call(objectLayer, ...params);
        }
        else {
          objectLayer = objectLayer[functionName].call();
        }
      }
      else {
        objectLayer = objectLayer[propSought];
      }
    });
    return objectLayer;
  }

  sfc32(a: number, b: number, c: number, d: number) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
  }
}
