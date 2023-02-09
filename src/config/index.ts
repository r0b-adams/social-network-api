import * as dotenv from 'dotenv';
import path from 'path';

const config_path = path.join(__dirname, '/.env');
dotenv.config({ path: config_path });

export const CONFIG = {
  ENV: process.env.ENVIRONMENT || 'development',
  SERVER_PORT: process.env.PORT || 3001,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/social-network-api-db',
};
