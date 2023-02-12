import { COLOR_HEXES, FORMAT } from './enums';

type ColorProxy = typeof COLOR_HEXES & { [key: string | symbol]: string };
type HexadecimalArray = RegExpMatchArray | string[] | null;

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

const VALIDATE = /(^#?[0-9A-F]{3}$)|(^#?[0-9A-F]{6}$)/gim;
const validHex = (hex: string) => VALIDATE.test(hex);

export const TEXT = new Proxy<ColorProxy>(COLOR_HEXES, {
  // trap getters and return ANSI color escape codes
  get: (target, key: string): string => {
    if (!Reflect.has(target, key)) {
      return FORMAT.RESET;
    }
    const hex = target[key];
    const [R, G, B] = getRGB(hex);
    const code = '\x1b[38;2;' + R + ';' + G + ';' + B + 'm';
    return code;
  },
  set: (target, key, value) => {
    console.log(target[key]);
    return Reflect.set(target, key, value);
  },
});

TEXT.HOT_PINK = '#ff69b4';
console.log(TEXT.HOT_PINK, 'pink');

export { COLOR_HEXES as HEX, FORMAT };
