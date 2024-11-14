import path from 'path';
import express from 'express';

const file = path.basename(__filename);

const loggerHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    console.log('logged', req.url);

    next();
  } catch (error) {
    next(error);
  }
};

export default loggerHandler;