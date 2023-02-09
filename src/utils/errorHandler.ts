import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  if (err instanceof Error) {
    console.error(err);
    const { name, message } = err;
    res.status(500).send({ error: { name, message } });
  }
};
