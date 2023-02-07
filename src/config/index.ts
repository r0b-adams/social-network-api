import * as dotenv from "dotenv";
import path from "path";

const config_path = path.join(__dirname, "/.env");
dotenv.config({ path: config_path });

export const CONFIG = {
  ENV: process.env.ENVIRONMENT,
  TEST: process.env.TEST,
};
