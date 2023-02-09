import express from 'express';
import mongoose from 'mongoose';

import { CONFIG } from './config';
import { routes } from './routes';
import { errorHandler } from './utils';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', false); // hide DeprecationWarning
    await mongoose.connect(CONFIG.MONGODB_URI);
  } catch (error) {
    console.error(error);
  }
};

const startServer = async () => {
  await connectDatabase();

  app.listen(CONFIG.SERVER_PORT, () => {
    console.log(`server listening on ${CONFIG.SERVER_PORT}`);
  });
};

startServer();
