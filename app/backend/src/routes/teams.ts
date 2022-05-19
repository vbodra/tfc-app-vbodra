import { Router } from 'express';

import TeamsService from '../services/TeamsServices';
import TeamsController from '../controllers/TeamsController';
import TeamsOnSequelize from '../database/models/abstractions/Teams';

const teamsRouter = Router();

const model = new TeamsOnSequelize();
const service = new TeamsService(model);
const controller = new TeamsController(service);

teamsRouter.get(
  '/',
  (req, res, next) => controller.getAll(req, res, next),
);

teamsRouter.get(
  '/:id',
  (req, res, next) => controller.getById(req, res, next),
);

export default teamsRouter;
