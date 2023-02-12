import { COLOR_HEXES, FORMAT } from './enums';

type ColorProxy = typeof COLOR_HEXES & { [key: string | symbol]: string };
type HexadecimalArray = RegExpMatchArray | string[] | null;

// YYY, #YYY, YYYYYY, #YYYYYY
const VALID_HEX = /(^#?[0-9A-F]{3}$)|(^#?[0-9A-F]{6}$)/gim;
const validHex = (hex: string) => VALID_HEX.test(hex);

// get array of RGB ints from a hexadecimal color
const getRGB = (hexStr: string): number[] => {
  let hexadecimals: HexadecimalArray = null;
  hexStr = hexStr[0] === '#' ? hexStr.substring(1) : hexStr;

  switch (hexStr.length) {
    case 3: // short form -> double up on hex ints
      const short = hexStr.match(/[0-9a-fA-F]{1}/g);
      if (short) {
        hexadecimals = short.map((hex) => hex + hex);
      }
      break;
    case 6: // long form
      hexadecimals = hexStr.match(/[0-9a-fA-F]{2}/g);
      break;
  }
  if (hexadecimals?.length === 3) {
    // transform to 0-255 RGB values
    return hexadecimals.map((hex) => parseInt(hex, 16));
  }
  throw new Error('invalid hex string format');
};

export const TEXT = new Proxy<ColorProxy>(COLOR_HEXES, {
  // intercept getters to return ANSI color escape codes
  get: (target, key: string): string | void => {
    if (!Reflect.has(target, key)) {
      return;
    }
    const hex = target[key];
    const [R, G, B] = getRGB(hex);
    const code = '\x1b[38;2;' + R + ';' + G + ';' + B + 'm';
    return code;
  },
  // save a hexadecimal color value at given key
  // if key exists, overwrites value
  set: (target, key, value) => {
    if (validHex(value)) {
      return Reflect.set(target, key, value);
    }
    // if invalid hex, return false
    return false;
  },
});

console.log(TEXT.HOT_PINK);
TEXT.HOT_PINK = '#ff69b4';
const { HOT_PINK } = TEXT;
console.log({ HOT_PINK });

export { COLOR_HEXES as HEX, FORMAT };
