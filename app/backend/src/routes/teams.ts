import { Router } from 'express';

// import Validation from '../middlewares/Validation';
// import AuthService from '../services/AuthenticationService';
import TeamsService from '../services/TeamsServices';
import TeamsController from '../controllers/TeamsController';
import TeamsOnSequelize from '../database/models/abstractions/Teams';

const teamsRouter = Router();

const model = new TeamsOnSequelize();
// const authService = new AuthService(model);
const service = new TeamsService(model);
// const validation = new Validation(service);
const controller = new TeamsController(service);

// teamsRouter.post(
//   '/',

// );

teamsRouter.get(
  '/',
  (req, res, next) => controller.getAll(req, res, next),
);

teamsRouter.get(
  '/:id',
  (req, res, next) => controller.getById(req, res, next),
);

export default teamsRouter;
