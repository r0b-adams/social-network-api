import express from 'express';
import { CONFIG } from './config';
import { connectDatabase } from './database';
import { routesLogger } from './middleware';
import { routes } from './routes';
import { errorHandler, FORMAT, TEXT } from './utils';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routesLogger);
app.use(routes);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(CONFIG.SERVER_PORT, () => {
      const msg = [TEXT.LIGHT_BLUE, '[server] ', FORMAT.RESET, `listening on ${CONFIG.SERVER_PORT}`, '\n'].join('');
      console.log(msg);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
