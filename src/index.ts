import express from "express";

import { CONFIG } from "./config";

const app = express();

app.listen(CONFIG.SERVER_PORT, () => {
  console.log(`server listening on ${CONFIG.SERVER_PORT}`);
});
