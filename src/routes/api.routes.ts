import express from 'express';
import SeedController from '../controllers/seed.controller';

const seedController = new SeedController();
const apiRouter = express.Router();

apiRouter.get('/seed', seedController.seedData);

export default apiRouter;