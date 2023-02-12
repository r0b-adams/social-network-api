import fs from 'fs';
import mongoose from 'mongoose';
import colorize from 'json-colorizer';
import { CONFIG } from '../config';
import { FORMAT, TEXT, HEX } from '../utils';

// create root logs dir if none exists
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const mongooseStream = fs.createWriteStream(
  'logs/mongoose.log',
  // { flags: 'a' }
);

export const connectDatabase = async () => {
  mongoose.set({
    debug: logger,
    strictQuery: false, // hide DeprecationWarning
  });
  const db = await mongoose.connect(CONFIG.MONGODB_URI);
  const msg = [
    FORMAT.RESET,
    TEXT.MONGOOSE,
    '[mongoose] ',
    FORMAT.RESET,
    `connected to database ${db.connection.name}`,
  ].join('');
  console.log(msg);
};

const logger = (collectionName: string, methodName: string, methodArgs: string) => {
  try {
    const json = JSON.stringify(methodArgs);
    const args = colorize(methodArgs, {
      pretty: true,
      colors: {
        STRING_KEY: '#81d4fa',
        STRING_LITERAL: '#ffab40',
        NUMBER_LITERAL: HEX.LIME,
        NULL_LITERAL: HEX.BLUE,
      },
    });
    const msg = `${collectionName}.${methodName}(${json})`;
    const colorized_msg = [
      FORMAT.RESET,
      TEXT.MONGOOSE,
      '[mongoose] ',
      TEXT.GREEN,
      collectionName,
      FORMAT.RESET,
      `.`,
      TEXT.YELLOW,
      methodName,
      FORMAT.RESET,
      `(${args})`,
    ].join('');
    const date = new Date().toLocaleString();
    mongooseStream.write(`${date}\n${msg}\n`, (error) => {
      if (error) {
        throw error;
      }
    });
    console.log(colorized_msg);
  } catch (error) {
    console.log(error);
  }
};
