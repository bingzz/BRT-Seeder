import express from 'express';

const responseHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    res.end('Response received')
  } catch (error) {
    next(error);
  }
};

export default responseHandler;