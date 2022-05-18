import { Router } from 'express';

import AuthenticationService from '../services/AuthenticationService';
import Validation from '../middlewares/Validation';
import MatchesService from '../services/MatchesServices';
import MatchesController from '../controllers/MatchesController';
import MatchesOnSequelize from '../database/models/abstractions/Matches';
import SequelizeTeamModel from '../database/models/abstractions/Teams';
import TeamsServices from '../services/TeamsServices';

const matchesRouter = Router();

const auth = new AuthenticationService();
const validation = new Validation(auth);
const matchesModel = new MatchesOnSequelize();
const teamsModel = new SequelizeTeamModel();
const matchesService = new MatchesService(matchesModel);
const teamsServices = new TeamsServices(teamsModel);
const controller = new MatchesController(matchesService, teamsServices);

matchesRouter.get(
  '/',
  (req, res, next) => controller.getAll(req, res, next),
);

matchesRouter.post(
  '/',
  (req, res, next) => validation.verifyToken(req, res, next),
  (req, res, next) => controller.create(req, res, next),
);

matchesRouter.patch(
  '/:id/finish',
  (req, res, next) => controller.update(req, res, next),
);

export default matchesRouter;
