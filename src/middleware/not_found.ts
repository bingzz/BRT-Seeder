import path from 'path';
import express from 'express';
import HTTP_CODES from '../constants/http_codes';

const notFoundHandler = (req: express.Request, res: express.Response) => {
  res.status(HTTP_CODES.NOT_FOUND);
  throw `Cannot ${req.method}: ${req.url}`;
};

export default notFoundHandler;