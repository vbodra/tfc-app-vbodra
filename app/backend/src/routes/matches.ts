import { Router } from 'express';

import MatchesService from '../services/MatchesServices';
import MatchesController from '../controllers/MatchesController';
import MatchesOnSequelize from '../database/models/abstractions/Matches';

const matchesRouter = Router();

const model = new MatchesOnSequelize();
const service = new MatchesService(model);
const controller = new MatchesController(service);

matchesRouter.get(
  '/',
  (req, res, next) => controller.getAll(req, res, next),
);

export default matchesRouter;
