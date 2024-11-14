import winston from 'winston';
import { numPadStart } from '../config/formatter';

const date = new Date();
const year = date.getFullYear();
const month = numPadStart(date.getMonth() + 1);
const day = numPadStart(date.getDate());
const fullDate = date.toLocaleString('en-us', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });

const dir = `src/logs`;
const file = `${year}_${month}_${day}.txt`;

const logger = winston.createLogger({
  level: 'error',
  transports: [new winston.transports.File({ filename: `${dir}/${file}` })],
  format: winston.format.combine(winston.format.printf(({ message }) => `${message}`))
});

/** Save Error Log files */
const writeErrorLog = (fileName: string, functionName: string, message: string, context: object, request: object) => {
  try {
    const logObj = {
      date: fullDate,
      file: fileName,
      function: functionName,
      message: message,
      context: JSON.stringify(context),
      trace: new Error('context'),
      request: request
    };

    console.error(logObj);
    logger.error(JSON.stringify(logObj, null, 2));

  } catch (error) {
    logger.error(error);
  }
};

export default writeErrorLog;