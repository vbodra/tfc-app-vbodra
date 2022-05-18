import { Router } from 'express';

import AuthService from '../services/AuthenticationService';
import LoginService from '../services/LoginServices';
import LoginController from '../controllers/LoginController';
import UserOnSequelize from '../database/models/abstractions/Users';

const loginRouter = Router();

const model = new UserOnSequelize();
const authService = new AuthService();
const service = new LoginService(model);
const controller = new LoginController(service, authService);

loginRouter.post(
  '/',
  (req, res, next) => controller.verifyEmailAndPassword(req, res, next),
  (req, res, next) => controller.verifyCredentials(req, res, next),
  (req, res, next) => controller.login(req, res, next),
);

loginRouter.get(
  '/validate',
  (req, res, next) => controller.getRoleFromValidatedUser(req, res, next),
);

export default loginRouter;
