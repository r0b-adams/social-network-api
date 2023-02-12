import { COLOR_HEXES, FORMAT } from './enums';

type ColorProxy = typeof COLOR_HEXES & { [key: string | symbol]: string };
type HexTuple = [string, string, string];
type RgbTuple = [number, number, number];

// YYY, #YYY, YYYYYY, #YYYYYY
const VALID_HEX = /(^#?[0-9A-F]{3}$)|(^#?[0-9A-F]{6}$)/im;
const validHex = (hex: string) => VALID_HEX.test(hex);

// returns tuple of RGB ints from a hexadecimal color
const getRGB = (hexes: HexTuple): RgbTuple => {
  const [R, G, B] = hexes.map((hex) => parseInt(hex, 16));
  return [R, G, B];
};

// returns tuple of 2 digit hexadecimal values
const getHexadecimal = (hexStr: string): HexTuple => {
  let R, G, B;
  const parsed = hexStr[0] === '#' ? hexStr.substring(1) : hexStr;
  switch (parsed.length) {
    case 3:
      const short = hexStr.match(/[0-9a-fA-F]{1}/g)!;
      [R, G, B] = short.map((hex) => hex + hex);
      return [R, G, B];

    case 6:
      [R, G, B] = hexStr.match(/[0-9a-fA-F]{2}/g)!;
      return [R, G, B];

    default:
      throw new Error(`unable to parse "${hexStr}"`);
  }
};

// the TEXT proxy keeps a reference to the map of color hexadecimal values
// accessing a COLOR_HEXES key with it will return an ANSI escape code to color text in the terminal
// it can be used to save hex color values to the COLOR_HEXES map
export const TEXT = new Proxy<ColorProxy>(COLOR_HEXES, {
  // intercept getters to return ANSI color escape codes
  get: (target, key: string) => {
    if (Reflect.has(target, key)) {
      const hexStr = target[key];
      const rgbHex = getHexadecimal(hexStr);
      const [R, G, B] = getRGB(rgbHex);
      const code = '\x1b[38;2;' + R + ';' + G + ';' + B + 'm';
      return code;
    }
    return '';
  },
  // add new colors via dot notation e.g. TEST.CHARTREUSE = '#7fff00'
  set: (target, key, value, receiver) => {
    if (validHex(value)) {
      return Reflect.set(target, key, value, receiver);
    }
    throw new Error('invalid hex value');
  },
});

export { COLOR_HEXES as HEX, FORMAT };
