import { Router } from 'express';

import AuthenticationService from '../services/AuthenticationService';
import Validation from '../middlewares/Validation';
import MatchesService from '../services/MatchesServices';
import MatchesController from '../controllers/MatchesController';
import MatchesOnSequelize from '../database/models/abstractions/Matches';

const matchesRouter = Router();

const auth = new AuthenticationService();
const validation = new Validation(auth);
const model = new MatchesOnSequelize();
const service = new MatchesService(model);
const controller = new MatchesController(service);

matchesRouter.get(
  '/',
  (req, res, next) => controller.getAll(req, res, next),
);

matchesRouter.post(
  '/',
  (req, res, next) => validation.verifyToken(req, res, next),
  (req, res, next) => controller.create(req, res, next),
);

export default matchesRouter;
