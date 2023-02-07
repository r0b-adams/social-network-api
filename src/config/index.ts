import * as dotenv from "dotenv";
import path from "path";

const config_path = path.join(__dirname, "/.env");
dotenv.config({ path: config_path });

export const CONFIG = {
  SERVER_PORT: process.env.PORT || 3050,
  ENV: process.env.ENVIRONMENT,
};
