import path from 'path';
import express from 'express';
import writeErrorLog from '../utils/writeErrorLog';
import HTTP_CODES from '../constants/http_codes';

const file = path.basename(__filename);

const isEmptyObject = (obj: object): any => {
  if (!obj) return null;

  return Object.keys(obj).length ? obj : null;
};

const errorHandler = (error: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const httpCode = res.statusCode === HTTP_CODES.SUCCESS ? HTTP_CODES.BAD_REQUEST : res.statusCode;

    const controllerNewErr = error.toString(); // throw new Error from controller
    const controllerErr = isEmptyObject(JSON.parse(JSON.stringify(error))); // throw <error>
    const utilNewErr = isEmptyObject((error as any))?.error?.toString() || null; // throw new Error from utils

    const utilErr = isEmptyObject(JSON.parse(JSON.stringify(error))); // throw <error> from utils
    const utilErrStr = typeof utilErr === 'object' ? utilErr?.error : null;

    const errMsg = isEmptyObject(utilErrStr) || utilNewErr || controllerErr || controllerNewErr;

    const errObj = {
      status: httpCode,
      fileName: res.locals.file,
      functionName: res.locals.function,
      message: errMsg,
      context: error
    };

    writeErrorLog(res.locals.file, res.locals.function, errMsg, errObj, { ...req.body, ...req.query });
    res.status(httpCode).send(errObj);
  } catch (error) {
    writeErrorLog(file, '', (error as any)?.message, error as object, {});
  }
};

export default errorHandler;