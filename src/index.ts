import express from "express";

import { CONFIG } from "./config";
import { routes } from "./routes";

const app = express();

app.use(routes);

app.listen(CONFIG.SERVER_PORT, () => {
  console.log(`server listening on ${CONFIG.SERVER_PORT}`);
});
