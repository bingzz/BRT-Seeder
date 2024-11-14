import path from 'path';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import loggerHandler from './src/middleware/logger.handler';
import errorHandler from './src/middleware/error.handler';
import writeErrorLog from './src/utils/writeErrorLog';
import apiRouter from './src/routes/api.routes';
import notFoundHandler from './src/middleware/not_found';

const file = path.basename(__filename);

const { PORT, URL } = process.env;

if (!PORT) {
  writeErrorLog(file, '', 'NO PORT', {}, {});
  process.exit(1);
}

const app = express();

app.use(express.json());

app.use(loggerHandler);
app.use(apiRouter);
app.use(notFoundHandler)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on: ${URL}:${PORT}`);
});