import { Router } from 'express';

import LeaderBoardServices from '../services/LeaderBoardService';
import LeaderBoardController from '../controllers/LeaderBoardController';
import TeamsOnSequelize from '../database/models/abstractions/Teams';

const leaderboardRouter = Router();

const model = new TeamsOnSequelize();
const leaderboardServices = new LeaderBoardServices(model);
const controller = new LeaderBoardController(leaderboardServices);

leaderboardRouter.get(
  '/home',
  (req, res, next) => controller.findAll(req, res, next),
);

leaderboardRouter.get(
  '/away',
  (req, res, next) => controller.findAll(req, res, next),
);

leaderboardRouter.get(
  '/',
  (req, res, next) => controller.findAll(req, res, next),
);

export default leaderboardRouter;
